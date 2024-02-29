import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { collection, doc, setDoc } from "firebase/firestore";
import { useGlobalAuth } from "../AuthContext";
import { db } from "../firebase";
import {
  IonButton,
  IonCol,
  IonDatetime,
  IonGrid,
  IonItem,
  IonList,
  IonRow,
  IonTextarea,
} from "@ionic/react";

const MonthDataUpdater = () => {
  // Converts `<br />` tags to new line characters
  const convertBrTagsToNewLines = (str: string): string => {
    return str.replace(/<br\s?\/?>/g, "\n");
  };

  // Converts new line characters to `<br />` tags
  const convertNewLinesToBrTags = (str: string): string => {
    return str.replace(/\n/g, "<br />");
  };

  const { user, signOut, toastMessage, sitelinks } = useGlobalAuth() ?? {};

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [selectedMonth, setSelectedMonth] = useState(
    new Date().toISOString().slice(0, 7)
  );
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [imgUrl, setImgUrl] = useState<string | undefined>();
  const [uploading, setUploading] = useState(false);

  const [uploadedNewsletter, setUploadedNewsletter] = useState<
    File | undefined
  >();
  const [newsletterUrl, setNewsletterUrl] = useState<string | undefined>();
  const [uploadingNewsletter, setUploadingNewsletter] = useState(false);
  const [firedb, setFiredb] = useState(false);

  const formatYearMonth = (dateString: string): string => {
    const [year, month] = dateString.split("-");
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return year && month
      ? `${monthNames[parseInt(month) - 1]} ${year}`
      : "Invalid Date";
  };

  const onDrop = (acceptedFiles: File[]) => {
    setUploadedFiles(acceptedFiles);
  };

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({
      onDrop,
      accept: {
        "image/jpeg": [],
        "image/jpg": [],
        "image/png": [],
        "image/gif": [],
      },
    });

  const uploadMonthImage = async () => {
    setUploading(true);
    if (uploadedFiles) {
      const formData = new FormData();
      formData.append("file", uploadedFiles[0]);
      formData.append("filename", selectedMonth); // Replace with the desired filename

      try {
        const response = await axios.post(
          "https://gscengland.org/uploads/imgUploader.php",
          formData
        );
        console.log("File uploaded successfully. URL:", response.data);
        if (toastMessage) toastMessage("File uploaded successfully");
        setImgUrl(response.data);
      } catch (error) {
        console.log("Error uploading image:", error);
        if (toastMessage)
          toastMessage("Error uploading image: Check the console for details");
      }
    }
    setUploading(false);
  };

  const uploadNewsletter = async () => {
    setUploadingNewsletter(true);
    if (uploadedNewsletter) {
      const formData = new FormData();
      formData.append("file", uploadedNewsletter);
      formData.append("filename", selectedMonth);

      try {
        const response = await axios.post(
          "https://gscengland.org/uploads/uploadNewsletter.php", // Replace with the actual URL to your PHP script
          formData
        );

        console.log("Newsletter uploaded successfully. URL:", response.data);
        if (toastMessage) toastMessage("Newsletter uploaded successfully.");
        setNewsletterUrl(response.data);
      } catch (error) {
        console.log("Error Uploading Newsletter", error);
        if (toastMessage) {
          toastMessage(
            "Error uploading newsletter: Check the console for details"
          );
          setUploadingNewsletter(false);
        }
      }
    }
    setUploadingNewsletter(false);
  };

  const updateMonthData = async (data: any) => {
    setFiredb(true);
    data.month = selectedMonth;
    data.imgUrl = imgUrl;
    data.newsletter = newsletterUrl;
    data.bible = convertNewLinesToBrTags(data.bible);
    data.monthWriteup = convertNewLinesToBrTags(data.monthWriteup);
    console.log(data);

    if (user) {
      try {
        const monthDataCollection = collection(db, "monthData");
        const monthDocument = doc(monthDataCollection, selectedMonth);

        await setDoc(monthDocument, data);
        if (toastMessage) toastMessage("Month Data set Successfully");
      } catch (error) {
        if (toastMessage)
          toastMessage("Error setting the Message: Check console for details");
        console.log("Error setting MonthData in Database");
      }
    }
    setFiredb(false);
  };

  const resetForm = () => {
    // console.log("function to reset running");
    setUploadedFiles([]);
    setImgUrl(undefined);
    setUploadedFiles([]);
    setNewsletterUrl(undefined);
    setUploadedNewsletter(undefined);
  };

  useEffect(() => {
    // console.log(`Selected month is ${selectedMonth}`);
    resetForm();
  }, [selectedMonth]);

  return (
    <div>
      <form
        onSubmit={handleSubmit(updateMonthData)}
        className="month-details-form">
        <IonGrid>
          <IonRow>
            <IonCol className="ion-text-center">
              <h2>Manage Details for the Month</h2>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <h3>Select the Month and Year</h3>
              <IonDatetime
                presentation="month-year"
                value={selectedMonth}
                max={new Date(
                  new Date().getFullYear() + 2,
                  new Date().getMonth() + 1
                )
                  .toISOString()
                  .slice(0, 7)}
                onIonChange={(e) => {
                  if (typeof e.detail.value === "string") {
                    setSelectedMonth(e.detail.value);
                  }
                }}></IonDatetime>
            </IonCol>
            <IonCol>
              <IonList>
                <IonItem
                  color={"light"}
                  lines="none"
                  className="ion-margin-bottom">
                  <IonTextarea
                    label="Bible Verse"
                    rows={4}
                    labelPlacement="floating"
                    {...register("bible", {
                      required: true,
                    })}></IonTextarea>
                </IonItem>
                {errors.monthWriteup && (
                  <span>The Month's Bible Verse(s) is required</span>
                )}
                <IonItem
                  color={"light"}
                  lines="none"
                  className="ion-margin-bottom">
                  <IonTextarea
                    label="Writeup of the Month"
                    rows={4}
                    labelPlacement="floating"
                    {...register("monthWriteup", {
                      required: true,
                    })}></IonTextarea>
                </IonItem>
                {errors.monthWriteup && (
                  <span>The Month's Writeup is required</span>
                )}
              </IonList>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonGrid className="ion-text-center">
                <IonRow>
                  <IonCol>
                    <h3>Upload the Image</h3>
                    <div
                      {...getRootProps()}
                      className={`dropzone ${isDragActive ? "active" : ""}`}>
                      <input {...getInputProps()} />
                      {isDragActive ? (
                        <p>Drop the Month's image here...</p>
                      ) : (
                        <p>
                          {uploadedFiles.length > 0 ? (
                            <span>
                              To replace current Selected picture with another,
                              Drag & drop the Month's image here, or click to
                              select it
                            </span>
                          ) : (
                            <span>
                              Drag & drop the Month's image here, or click to
                              select it
                            </span>
                          )}
                        </p>
                      )}
                    </div>
                    {uploadedFiles.map((file, index) => (
                      <div key={index}>
                        {file.type.startsWith("image/") ? (
                          <>
                            <img
                              src={URL.createObjectURL(file)}
                              alt="Uploaded"
                              style={{ width: "30%", height: "auto" }}
                            />
                            {imgUrl && (
                              <p>Image uploaded Successfully to {imgUrl}</p>
                            )}
                          </>
                        ) : (
                          <p>{file.name}</p>
                        )}
                      </div>
                    ))}
                    {uploadedFiles.length > 0 && (
                      <div>
                        {!imgUrl ? (
                          <IonButton
                            onClick={() => uploadMonthImage()}
                            disabled={uploading}>
                            Upload Image
                          </IonButton>
                        ) : (
                          <span>
                            You have already uploaded the image and the url is
                            ready to be saved in the database.
                          </span>
                        )}
                      </div>
                    )}
                  </IonCol>
                  <IonCol>
                    <h3>Upload the NewsLeter</h3>
                    <IonItem color={"light"} lines="none">
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={(e) => {
                          if (e.target.files) {
                            const file = e.target.files[0];
                            setUploadedNewsletter(file);
                          }
                        }}
                      />
                    </IonItem>
                    {uploadedNewsletter && (
                      <div>
                        {newsletterUrl ? (
                          <p>Newsletter uploaded to {newsletterUrl}</p>
                        ) : (
                          <IonButton
                            disabled={uploadingNewsletter}
                            onClick={() => uploadNewsletter()}
                            className="ion-margin-top">
                            Upload Newsletter
                          </IonButton>
                        )}
                      </div>
                    )}
                  </IonCol>
                </IonRow>
              </IonGrid>

              <div className="ion-text-center ion-padding">
                <IonButton
                  color={"dark"}
                  shape="round"
                  type="submit"
                  disabled={!imgUrl || !newsletterUrl || firedb}>
                  Submit {formatYearMonth(selectedMonth)} DATA
                </IonButton>
              </div>
            </IonCol>
          </IonRow>
        </IonGrid>
      </form>
    </div>
  );
};

export default MonthDataUpdater;
