import {
  IonButton,
  IonChip,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonInput,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  IonPage,
  IonRow,
  IonSpinner,
  IonTextarea,
} from "@ionic/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { checkmarkCircle } from "ionicons/icons";
import axios from "axios";

export interface ContactDetails {
  title: string;
}

const ContactForm: React.FC<ContactDetails> = ({ title }) => {
  const [formStatus, setFormStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onContactFormSubmit = async (data: any) => {
    data.title = title;
    setSubmitting(true);
    try {
      const response = await axios.post(
        "https://gscengland.org/contact.php",
        data,
        {
          withCredentials: true, // Add this line
          headers: {
            "Content-Type": "application/json", // Set content type to JSON
          },
        }
      );
      if (response.status === 200) {
        setFormStatus("success");
        setSubmitting(false);
      } else {
        setFormStatus("error");
        setSubmitting(false);
      }
    } catch (error) {
      console.error(error);
      setFormStatus("error");
      setSubmitting(false);
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onContactFormSubmit)}
      className="contactDetails">
      <IonList className="form">
        <IonGrid style={{ padding: "0", margin: "0" }}>
          <IonRow>
            <IonCol className="ion-text-center">
              <h2>{title}</h2>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol sizeXs="12" sizeSm="6">
              <IonItem color={"light"} lines="none">
                <IonInput
                  label="First Name"
                  labelPlacement="floating"
                  placeholder="First Name"
                  {...register("fname", {
                    required: true,
                  })}></IonInput>
              </IonItem>
              {errors.fname ? <span>Field is required</span> : null}
            </IonCol>
            <IonCol sizeXs="12" sizeSm="6">
              <IonItem color={"light"} lines="none">
                <IonInput
                  label="Last Name"
                  labelPlacement="floating"
                  placeholder="Last Name"
                  {...register("lname", {
                    required: true,
                  })}></IonInput>
              </IonItem>
              {errors.lname ? <span>Field is required</span> : null}
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol sizeXs="12" sizeSm="6">
              <IonItem color={"light"} lines="none">
                <IonInput
                  type="tel"
                  label="Phone Number"
                  labelPlacement="floating"
                  placeholder="Enter Phone Number"
                  {...register("phone", {
                    required: true,
                  })}></IonInput>
              </IonItem>
              {errors.phone ? <span>Your Phone Number is required</span> : null}
            </IonCol>
            <IonCol sizeXs="12" sizeSm="6">
              <IonItem color={"light"} lines="none">
                <IonInput
                  type="email"
                  label="Email"
                  labelPlacement="floating"
                  placeholder="Enter Email Address"
                  {...register("email", {
                    required: true,
                  })}></IonInput>
              </IonItem>
              {errors.email ? <span>Your Email is required</span> : null}
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonItem color={"light"} lines="none">
                <IonTextarea
                  label="Your Message"
                  labelPlacement="floating"
                  placeholder="Enter your message"
                  rows={8}
                  {...register("message", {
                    required: true,
                  })}></IonTextarea>
              </IonItem>
              {errors.message ? <span>Your Message is required</span> : null}
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol
              className="ion-text-center m-auto"
              sizeXl="6"
              sizeXs="12"
              sizeSm="6"
              sizeMd="6"
              sizeLg="6">
              <IonItemSliding>
                <IonItem className="ion-text-center">
                  <IonLabel>Slide Left to Submit Form</IonLabel>
                </IonItem>

                <IonItemOptions>
                  {submitting ? (
                    <IonItemOption
                      disabled={formStatus === "success"}
                      color={"light"}
                      type="submit">
                      <IonSpinner name="circular" color={"dark"}></IonSpinner>
                    </IonItemOption>
                  ) : (
                    <IonItemOption
                      disabled={formStatus === "success"}
                      color={"dark"}
                      type="submit"
                      onClick={handleSubmit(onContactFormSubmit)}>
                      <IonIcon slot="start" icon={checkmarkCircle}></IonIcon>
                      Send Form
                    </IonItemOption>
                  )}
                </IonItemOptions>
              </IonItemSliding>
              {formStatus && formStatus === "success" && (
                <p style={{ color: "var(--ion-color-success)" }}>
                  Form Successfully Sent
                </p>
              )}
              {formStatus && formStatus === "error" && (
                <p style={{ color: "var(--ion-color-danger)" }}>
                  There was a problem. Try again
                </p>
              )}
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonList>
    </form>
  );
};

export default ContactForm;
