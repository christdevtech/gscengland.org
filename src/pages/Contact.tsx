import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonInput,
  IonItem,
  IonList,
  IonPage,
  IonRow,
  IonTextarea,
} from "@ionic/react";
import React from "react";
import TopMenu from "../components/TopMenu";
import { useForm } from "react-hook-form";

const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onContactFormSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <IonPage className="contact-page">
      <IonContent>
        <TopMenu />
        <IonGrid className="">
          <IonRow>
            <IonCol
              sizeXs="12"
              sizeLg="10"
              sizeMd="11"
              sizeSm="12"
              sizeXl="9"
              className="m-auto "
            >
              {" "}
              Contact Us{" "}
              <form onSubmit={handleSubmit(onContactFormSubmit)}>
                <IonList>
                  <IonItem>
                    <IonInput
                      label="Name"
                      labelPlacement="floating"
                      placeholder="Enter Name"
                      {...register("name", { required: true })}
                    ></IonInput>
                  </IonItem>
                  {errors.name ? <span>Name is required</span> : null}

                  <IonItem>
                    <IonInput
                      type="email"
                      label="Email"
                      labelPlacement="floating"
                      placeholder="Enter Email Address"
                      {...register("email", { required: true })}
                    ></IonInput>
                  </IonItem>
                  {errors.email ? <span>Your Email is required</span> : null}

                  <IonItem>
                    <IonInput
                      type="tel"
                      label="Phone Number"
                      labelPlacement="floating"
                      placeholder="Enter Phone Number"
                      {...register("phone", { required: true })}
                    ></IonInput>
                  </IonItem>
                  {errors.phone ? (
                    <span>Your Phone Number is required</span>
                  ) : null}

                  <IonItem>
                    <IonTextarea
                      label="Your Message"
                      labelPlacement="floating"
                      placeholder="Enter your message"
                      rows={5}
                      {...register("message", { required: true })}
                    ></IonTextarea>
                  </IonItem>
                  <IonButton
                    type="submit"
                    className="ion-margin-start ion-margin-top"
                    shape="round"
                  >
                    Send
                  </IonButton>
                </IonList>
              </form>
            </IonCol>{" "}
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Contact;
