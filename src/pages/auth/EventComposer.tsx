import {
  IonAlert,
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
import { useHistory, useParams } from "react-router";
import { IonDatetime } from "@ionic/react";
import { useDropzone } from "react-dropzone";
import { cloudUpload, trashBinOutline } from "ionicons/icons";
import axios from "axios";
import { useGlobalAuth } from "../../AuthContext";
import { useForm } from "react-hook-form";
import { GSCEvent } from "../../interfaces";
import {
  doc,
  setDoc,
  updateDoc,
  onSnapshot,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../firebase";

const EventComposer = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const { toastMessage, getGSCEvents } = useGlobalAuth() ?? {};

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
  const [GSCEventData, setGSCEventData] = useState<GSCEvent>();
  const [deleteEvent, setDeleteEvent] = useState<boolean>(false);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    setSelectedFile(file);
  };

  const isEventPast = (dateTimeString: string): boolean => {
    if (dateTimeString === "") {
      return false;
    }
    const today = new Date();
    const inputDateTime = new Date(dateTimeString);

    // Compare the input date and time with today's date and time
    return inputDateTime.getTime() < today.getTime();
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
  const history = useHistory();

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm();

  const generateEventId = (title: string): string => {
    // Remove spaces and special characters, convert to lowercase
    let eventId = title.replace(/[^\w\s]/gi, "").toLowerCase();

    // Replace spaces with dashes
    eventId = eventId.replace(/\s+/g, "-");

    // Truncate if necessary (adjust the desired length as needed)
    const maxLength = 20; // Adjust as needed
    eventId = eventId.substring(0, maxLength);

    const today = new Date().toISOString().substring(0, 19);
    // Append a unique identifier (e.g., timestamp) for uniqueness
    eventId += `-${today}`;

    return eventId;
  };

  const createGSCEvent = (GSCEvent: GSCEvent) => {
    console.log("Creating event with data:", GSCEvent);

    const docRef = doc(db, "events", GSCEvent.eventId);
    setDoc(docRef, GSCEvent)
      .then(() => {
        if (toastMessage) toastMessage("Document successfully written!");
        getGSCEvents;
        history.push(`/event-composer/${GSCEvent.eventId}`);
      })
      .catch((error) => {
        if (toastMessage)
          toastMessage("Error Creating Event: Check Console for Details ");
        console.log(error);
      });
  };

  const updateGSCEvent = (GSCEvent: GSCEvent) => {
    console.log("Updating event with data:", GSCEvent);

    const docRef = doc(db, "events", GSCEvent.eventId);
    updateDoc(docRef, { ...GSCEvent })
      .then(() => {
        if (toastMessage) toastMessage("Event successfully Updated!");
        getGSCEvents;
      })
      .catch((error) => {
        if (toastMessage)
          toastMessage("Error Updating Event: Check Console for Details ");
        console.log(error);
      });
  };

  const onEventSubmit = async (data: any) => {
    data.recurring = isRepeatingEvent;
    data.start = startDate;
    data.end = endDate;
    data.imgUrl = eventFeaturedImage;
    data.pictures = uploadedUrls;
    if (eventId === "new") {
      data.eventId = generateEventId(data.title);
      createGSCEvent(data as GSCEvent);
    } else {
      data.eventId = eventId;
      updateGSCEvent(data as GSCEvent);
    }
  };

  useEffect(() => {
    if (eventId !== "new") {
      const eventRef = doc(db, "events", eventId);
      onSnapshot(eventRef, (doc) => {
        if (doc.exists()) {
          const data = doc.data() as GSCEvent;
          setGSCEventData(data);
        }
      });
    }
  }, [eventId]);

  const onDeleteEvent = (eventId: string) => {
    const eventRef = doc(db, "events", eventId);

    deleteDoc(eventRef)
      .then(() => {
        if (toastMessage) toastMessage("Event successfully Deleted!");
        getGSCEvents && getGSCEvents();
        history.push("/admin");
      })
      .catch((error) => {
        if (toastMessage)
          toastMessage("Error Deleting Event: Check Console for Details ");
        console.log(error);
      });
  };

  //Update Form default values with GSCEventData when snapshot is successful
  useEffect(() => {
    if (GSCEventData) {
      const { title, start, end, recurring, imgUrl, pictures, eventId } =
        GSCEventData;
      setIsRepeatingEvent(recurring);
      setStartDate(start);
      setEndDate(end);
      setSelectedFile(null);
      setSelectedImages([]);
      setEventFeaturedImage(imgUrl);
      setUploadedUrls(pictures);
    }
  }, [GSCEventData]);
  return (
    <IonPage>
      <IonContent>
        <TopMenu />
        <Container>
          <div className="top">
            {eventId === "new" ? (
              <h1>Composing New Event</h1>
            ) : (
              <h1>Editing {GSCEventData?.title} </h1>
            )}
            {GSCEventData && (
              <IonFab vertical="top" horizontal="end">
                <IonFabButton
                  color="danger"
                  onClick={() => {
                    setDeleteEvent(true);
                  }}
                >
                  <IonIcon icon={trashBinOutline}></IonIcon>
                </IonFabButton>
              </IonFab>
            )}
            <form onSubmit={handleSubmit(onEventSubmit)}>
              <IonList>
                <IonGrid>
                  <IonRow>
                    <IonCol>
                      <IonItem lines="none" color={"light"}>
                        <IonInput
                          disabled={isEventPast(endDate)}
                          label="Event title"
                          value={GSCEventData?.title}
                          // labelPlacement="floating"
                          {...register("title", {
                            required: true,
                          })}
                        ></IonInput>
                      </IonItem>
                      {errors.title && (
                        <p className="form-error">The Title is required</p>
                      )}
                      {isEventPast(endDate) && (
                        <p className="form-error">
                          The End Date of the Event has past. Change the dates
                          to edit the event
                        </p>
                      )}
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol>
                      <IonItem color={"light"} lines="none">
                        <IonLabel>Event Featured Image</IonLabel>
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
                      <IonCol sizeSm="3">
                        <IonImg src={eventFeaturedImage}></IonImg>
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
                          value={startDate ? startDate : null}
                          onIonChange={(e) => {
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
                          value={endDate ? endDate : null}
                          min={startDate ? startDate : new Date().toISOString()}
                          onIonChange={(e) => {
                            if (typeof e.detail.value == "string")
                              setEndDate(e.detail.value);
                          }}
                        ></IonDatetime>
                      </IonItem>
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol>
                      <IonItem color={"light"} lines="none">
                        <IonInput
                          disabled={isEventPast(endDate)}
                          label="Venue"
                          value={GSCEventData?.venue}
                          // labelPlacement="floating"
                          {...register("venue", { required: true })}
                        ></IonInput>
                      </IonItem>
                      {errors.venue && (
                        <p className="form-error">
                          A Venue is required for an event to be submitted
                        </p>
                      )}
                      {isEventPast(endDate) && (
                        <p className="form-error">
                          The End Date of the Event has past. Change the dates
                          to edit the event
                        </p>
                      )}
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol>
                      <IonItem lines="none" color={"light"}>
                        <IonTextarea
                          disabled={isEventPast(endDate)}
                          rows={6}
                          label="Description"
                          value={GSCEventData?.description}
                          // labelPlacement="floating"
                          {...register("description", { required: true })}
                        ></IonTextarea>
                      </IonItem>
                      {errors.description && (
                        <p className="form-error">
                          A Venue is required for an event to be submitted
                        </p>
                      )}
                      {isEventPast(endDate) && (
                        <p className="form-error">
                          The End Date of the Event has past. Change the dates
                          to edit the event
                        </p>
                      )}
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
                        )}
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
                          disabled={isEventPast(endDate)}
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
                            value={GSCEventData?.frequency}
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
                  <IonRow>
                    <IonCol>
                      <IonButton type="submit">
                        {eventId === "new" ? "Add Event" : "Update Event"}{" "}
                      </IonButton>
                    </IonCol>
                  </IonRow>
                </IonGrid>
              </IonList>
            </form>
            <IonAlert
              mode="ios"
              header="Delete Event?"
              message={"Are you sure you want to delete this event?"}
              isOpen={deleteEvent}
              buttons={[
                {
                  text: "Cancel",
                  role: "cancel",
                },
                {
                  text: "Delete",
                  role: "confirm",
                  handler: () => {
                    GSCEventData && onDeleteEvent(GSCEventData.eventId);
                  },
                },
              ]}
              onDidDismiss={() => {
                setDeleteEvent(false);
              }}
            ></IonAlert>
          </div>
        </Container>
      </IonContent>
    </IonPage>
  );
};

export default EventComposer;
