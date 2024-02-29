import {
  IonButton,
  IonCol,
  IonContent,
  IonFab,
  IonFabButton,
  IonGrid,
  IonIcon,
  IonImg,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonToggle,
} from "@ionic/react";
import React, { useEffect, useState, useCallback } from "react";
import TopMenu from "../../components/TopMenu";
import Container from "../../components/Container";
import { useParams } from "react-router";
import { IonDatetime } from "@ionic/react";
import { useDropzone } from "react-dropzone";
import { cloudUpload, trashBinOutline } from "ionicons/icons";
import axios from "axios";
import { useGlobalAuth } from "../../AuthContext";
import { useForm } from "react-hook-form";

const EventComposer = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const { toastMessage } = useGlobalAuth() ?? {};

  interface ImageUploadResponse {
    success: boolean;
    message?: string;
    urls?: string[];
  }

  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);
  const [eventFeaturedImage, setEventFeaturedImage] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isRepeatingEvent, setIsRepeatingEvent] = useState(false);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    setSelectedFile(file);
  };

  const handleIconClick = async () => {
    // Do something with the selected file
    if (selectedFile) {
      // Handle the selected file
      console.log("Selected file:", selectedFile);
      const uploadedUrl = (await uploadImages([selectedFile])).urls;
      if (uploadedUrl && uploadedUrl.length > 0) {
        // console.log("Event Image path is:", uploadedUrl[0]);
        setEventFeaturedImage(uploadedUrl[0]);
      }
    }
  };

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setSelectedImages([...selectedImages, ...acceptedFiles]);
    },
    [selectedImages]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [],
      "image/jpg": [],
      "image/png": [],
      "image/gif": [],
    },
    multiple: true,
  });

  const handleRemoveImage = (index: number) => {
    const updatedImages = [...selectedImages];
    updatedImages.splice(index, 1);
    setSelectedImages(updatedImages);
  };

  const handleRemoveUploadedUrl = (index: number) => {
    const updatedUrls = [...uploadedUrls];
    updatedUrls.splice(index, 1);
    setUploadedUrls(updatedUrls);
  };

  const handleUpload = async () => {
    // Logic to upload images
    console.log("Uploading images:", selectedImages);
    const response = await uploadImages(selectedImages);
    if (response.urls) {
      setUploadedUrls(
        response.urls ? [...uploadedUrls, ...response.urls] : [...uploadedUrls]
      );
      setSelectedImages([]);
    } else {
      toastMessage?.("There was an error uploading");
    }
  };

  const uploadImages = async (images: File[]): Promise<ImageUploadResponse> => {
    try {
      const formData = new FormData();
      const today = new Date().toISOString().substring(0, 10);
      console.log(today);
      formData.append("today", today);
      images.forEach((image, index) => {
        formData.append(`image${index}`, image);
      });

      const response = await axios.post<ImageUploadResponse>(
        "https://gscengland.org/uploadEventImg.php",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
      return response.data;
    } catch (error) {
      console.error("Error uploading images:", error);
      return { success: false, message: "Error uploading images" };
    }
  };

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm();

  const onEventSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <IonPage>
      <IonContent>
        <TopMenu />
        <Container>
          <div className="top">
            {eventId === "new" ? (
              <h1>Composing New Event</h1>
            ) : (
              <h1>Composing {eventId} event </h1>
            )}

            <IonButton>Add Event</IonButton>
            <form>
              <IonList>
                <IonGrid>
                  <IonRow>
                    <IonCol>
                      <IonItem lines="none" color={"light"}>
                        <IonInput
                          label="Event title"
                          labelPlacement="floating"
                          {...register("title", {
                            required: true,
                          })}
                        ></IonInput>
                      </IonItem>
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol>
                      <IonItem color={"light"} lines="none">
                        <IonLabel>Event Image</IonLabel>
                        <input
                          type="file"
                          accept={"image/jpeg, image/jpg, image/png, image/gif"}
                          onSelect={(e) => {}}
                          onChange={handleFileSelect}
                        />
                        {selectedFile && (
                          <IonIcon
                            onClick={handleIconClick}
                            slot="end"
                            icon={cloudUpload}
                          ></IonIcon>
                        )}
                      </IonItem>
                    </IonCol>
                    {eventFeaturedImage && (
                      <IonCol>
                        <IonImg src={eventFeaturedImage}></IonImg>{" "}
                      </IonCol>
                    )}
                  </IonRow>
                  <IonRow>
                    <IonCol>
                      <IonLabel position="floating">
                        Set Start Date & time
                      </IonLabel>
                      <IonItem lines="none">
                        <IonDatetime
                          onIonChange={(e) => {
                            // console.log(e.detail.value);
                            if (typeof e.detail.value == "string")
                              setStartDate(e.detail.value);
                          }}
                        ></IonDatetime>
                      </IonItem>
                    </IonCol>
                    <IonCol>
                      <IonLabel position="floating">
                        Set End Date & Time
                      </IonLabel>
                      <IonItem lines="none">
                        <IonDatetime
                          onIonChange={(e) => {
                            console.log(e.detail.value);
                          }}
                        ></IonDatetime>
                      </IonItem>
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol>
                      <IonItem color={"light"} lines="none">
                        <IonInput
                          label="Venue"
                          labelPlacement="floating"
                        ></IonInput>
                      </IonItem>
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol>
                      <IonItem lines="none" color={"light"}>
                        <IonTextarea
                          rows={6}
                          label="Description"
                          labelPlacement="floating"
                        ></IonTextarea>
                      </IonItem>
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol>
                      <div>
                        <h2>Add Event Image Gallery</h2>
                        <div
                          {...getRootProps()}
                          style={{
                            border: "2px dashed #eee",
                            padding: "20px",
                            textAlign: "center",
                          }}
                        >
                          <input {...getInputProps()} />
                          <p>
                            Drag & drop images here, or click to select images
                          </p>
                        </div>
                        <div className="selected-images">
                          {selectedImages.map((image, index) => (
                            <div
                              key={index}
                              style={{
                                position: "relative",
                                marginTop: "20px",
                              }}
                              className="item"
                            >
                              <img
                                src={URL.createObjectURL(image)}
                                alt={`Selected Image ${index}`}
                              />
                              <IonFab
                                style={{
                                  position: "absolute",
                                  top: "10px",
                                  right: "10px",
                                }}
                              >
                                <IonFabButton
                                  color="danger"
                                  onClick={() => handleRemoveImage(index)}
                                >
                                  <IonIcon icon={trashBinOutline}></IonIcon>
                                </IonFabButton>
                              </IonFab>
                            </div>
                          ))}
                        </div>
                        {selectedImages.length > 0 && (
                          <IonButton onClick={handleUpload}>
                            Upload Images
                          </IonButton>
                        )}{" "}
                        {uploadedUrls.length > 0 && (
                          <h2>Successfully Uploaded Pictures</h2>
                        )}
                        <div className="existing-urls">
                          {uploadedUrls.map((url, index) => (
                            <div
                              key={index}
                              style={{
                                position: "relative",
                                marginTop: "20px",
                              }}
                              className="item"
                            >
                              <img src={url} alt={url} />
                              <IonFab
                                style={{
                                  position: "absolute",
                                  bottom: "10px",
                                  right: "10px",
                                }}
                              >
                                <IonFabButton
                                  color="danger"
                                  onClick={() => handleRemoveUploadedUrl(index)}
                                >
                                  <IonIcon icon={trashBinOutline}></IonIcon>
                                </IonFabButton>
                              </IonFab>
                            </div>
                          ))}
                        </div>
                      </div>
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol>
                      <IonItem lines="none" color={"light"}>
                        <IonToggle
                          enableOnOffLabels={true}
                          mode="ios"
                          color={"dark"}
                          checked={isRepeatingEvent}
                          onIonChange={(e) =>
                            setIsRepeatingEvent(e.detail.checked)
                          }
                        >
                          Repeating Event?
                        </IonToggle>
                      </IonItem>
                    </IonCol>{" "}
                    {isRepeatingEvent && (
                      <IonCol>
                        <IonItem lines="none" color="light">
                          <IonSelect
                            label="Select Frequency"
                            labelPlacement="floating"
                            {...register("frequency", { required: true })}
                          >
                            <IonSelectOption value={"weekly"}>
                              Weekly
                            </IonSelectOption>
                            <IonSelectOption value={"monthly"}>
                              Monthly
                            </IonSelectOption>
                            <IonSelectOption value={"yearly"}>
                              Yearly
                            </IonSelectOption>
                          </IonSelect>
                        </IonItem>
                      </IonCol>
                    )}
                  </IonRow>
                </IonGrid>
              </IonList>
            </form>
          </div>
        </Container>
      </IonContent>
    </IonPage>
  );
};

export default EventComposer;
