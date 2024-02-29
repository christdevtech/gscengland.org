import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonRow,
  IonTextarea,
} from "@ionic/react";
import React from "react";
import TopMenu from "../components/TopMenu";
import Footer from "../components/Footer";
import PageHeader, { PageHeroHeaderProps } from "../components/PageHeader";
import salvation from "../assets/img/PHOTO-2023-04-01-11-44-15_1-1.jpg";
import Container from "../components/Container";
import { useHistory } from "react-router";
import { useForm } from "react-hook-form";
import {
  homeOutline,
  timeOutline,
  phonePortrait,
  logoWhatsapp,
} from "ionicons/icons";
import { useGlobalAuth } from "../AuthContext";
const Salvation = () => {
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const contact = (link: string) => {
    window.open(link, "_blank", "noreferrer");
  };

  const { sitelinks } = useGlobalAuth() ?? {};
  const heroData: PageHeroHeaderProps = {
    title: ["Salvation", "Get Saved Now!"],
    bgImg: salvation,
    subText:
      "If you have never asked Jesus Christ to be your personal Saviour, you can do that right now!",
  };
  const onContactFormSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <IonPage className="contact-page">
      <IonContent>
        <TopMenu />
        <PageHeader {...heroData} />
        <Container className="contact-form">
          <IonGrid>
            <IonRow>
              <IonCol className="ion-padding contactDetails">
                <div>
                  <h2>
                    Congratulations on making the decision to follow Jesus
                    Christ!
                  </h2>
                  <p>
                    Pray this Prayer: <br />
                    Lord Jesus, I believe that You are God, that You died for my
                    sin, and that You rose again from the dead. I know that I am
                    a sinner, and I ask You now to be my personal Savior. I’m
                    placing my full trust in You alone, and I now accept Your
                    gift of eternal life. Thank you for keeping Your promise!
                    Amen.
                  </p>
                  <p>
                    You’ll never regret that decision! If you have just trusted
                    Christ, we would love to know about your decision and give
                    you a Bible and some other materials to help you learn more
                    about your new relationship with Jesus Christ! Give us a
                    call, complete the form or{" "}
                    <u onClick={() => history.push("/contact")}> contact us</u>{" "}
                    and let us know of your decision today!
                  </p>
                </div>
              </IonCol>
              <IonCol size="12" sizeMd="7">
                <form onSubmit={handleSubmit(onContactFormSubmit)}>
                  <IonList className="form">
                    <IonGrid style={{ padding: "0", margin: "0" }}>
                      <IonRow>
                        <IonCol className="ion-text-center">
                          <h2>I want to follow Jesus!</h2>
                        </IonCol>
                      </IonRow>
                      <IonRow>
                        <IonCol>
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
                        <IonCol>
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
                        <IonCol>
                          <IonItem color={"light"} lines="none">
                            <IonInput
                              type="tel"
                              label="Phone Number"
                              labelPlacement="floating"
                              placeholder="Enter Phone Number"
                              {...register("phone", {
                                required: false,
                              })}></IonInput>
                          </IonItem>
                        </IonCol>
                        <IonCol>
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
                          {errors.email ? (
                            <span>Your Email is required</span>
                          ) : null}
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
                        </IonCol>
                      </IonRow>
                      <IonRow>
                        <IonCol className="ion-text-center">
                          <IonButton
                            type="submit"
                            className="ion-margin-top"
                            mode="ios"
                            shape="round"
                            color={"primary"}>
                            Contact us
                          </IonButton>
                        </IonCol>
                      </IonRow>
                    </IonGrid>
                  </IonList>
                </form>
              </IonCol>
            </IonRow>
            <IonRow className="contactDetails ion-padding-start ion-padding-end">
              <IonCol size="6">
                <IonItem
                  onClick={() =>
                    contact("https://goo.gl/maps/kf9bMnBTz3k5ScnJA")
                  }
                  detail
                  lines="none"
                  color={"light"}>
                  <IonIcon slot="start" icon={homeOutline}></IonIcon>
                  <div className="detail">
                    <h3>Location</h3>
                    <p>
                      16, The Grove, <br /> Swanscombe Council Hall, DA10 0AD
                    </p>
                  </div>
                </IonItem>
              </IonCol>
              <IonCol size="6">
                <IonItem lines="none" color={"light"}>
                  <IonIcon slot="start" icon={timeOutline}></IonIcon>
                  <div className="detail">
                    <h3>Service Times</h3>
                    <p>
                      Sunday - Service: 1PM
                      <br />
                      Thursday: 7PM,via Zoom
                    </p>
                  </div>
                  <IonLabel></IonLabel>
                </IonItem>
              </IonCol>
              <IonCol size="6">
                <IonItem
                  onClick={() => contact("tel:+44(0)1322632375")}
                  detail
                  lines="none"
                  color={"light"}>
                  <IonIcon slot="start" icon={phonePortrait}></IonIcon>
                  <div className="detail">
                    <h3>Call Us</h3>
                    <p>+44 (0) 1322632375</p>
                  </div>
                  <IonLabel></IonLabel>
                </IonItem>
              </IonCol>
              <IonCol size="6">
                <IonItem
                  color={"light"}
                  onClick={() => contact("https://wa.me/447448847020")}
                  detail
                  lines="none">
                  <IonIcon slot="start" icon={logoWhatsapp}></IonIcon>
                  <div className="detail">
                    <h3>WhatsApp</h3>
                    <p>wa.me/447448847020</p>
                  </div>
                </IonItem>
              </IonCol>
            </IonRow>
          </IonGrid>
        </Container>
        <Footer />
      </IonContent>
    </IonPage>
  );
};

export default Salvation;
