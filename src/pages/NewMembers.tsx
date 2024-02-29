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
import bgImage from "../assets/img/new.jpg";
import Container from "../components/Container";
import {
  homeOutline,
  timeOutline,
  phonePortrait,
  logoWhatsapp,
} from "ionicons/icons";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import ContactForm from "../components/ContactForm";
import { useGlobalAuth } from "../AuthContext";

const pageHeroData: PageHeroHeaderProps = {
  title: ["New Members"],
  subText: "Become a part of God's Family in GSC",
  bgImg: bgImage,
};

const NewMembers = () => {
  const { sitelinks } = useGlobalAuth() ?? {};
  const history = useHistory();

  const contact = (link: string) => {
    window.open(link, "_blank", "noreferrer");
  };

  return (
    <IonPage className="contact-page">
      <IonContent>
        <TopMenu></TopMenu> <PageHeader {...pageHeroData} />
        <Container className="contact-form">
          <IonGrid>
            <IonRow>
              <IonCol size="12" className="ion-padding contactDetails">
                <div
                  style={{ width: "min(95%,900px)" }}
                  className="m-auto ion-text-center">
                  <h2>
                    Gateway Salvation Church welcomes everyone with{" "}
                    <u>arms wide open </u>.
                  </h2>
                  <p>
                    We offer a variety of programs and services to help you
                    connect with God, learn more about the Bible, and grow in
                    your faith.
                  </p>
                  <p>
                    If you are interested in becoming a member of Winners Way,
                    please complete the form below. We also offer a new
                    membership class for those who want to learn more about our
                    church and the Redeemed Christian Church of God. To learn
                    more about membership, please contact us{" "}
                    <u onClick={() => history.push("/contact")}>here</u>.
                  </p>
                </div>
                <ContactForm title="New Members Form" />
                {sitelinks && (
                  <IonList>
                    <IonGrid>
                      <IonRow>
                        <IonCol size="6">
                          <IonItem
                            onClick={() => contact(sitelinks.map)}
                            detail
                            lines="none"
                            color={"light"}>
                            <IonIcon slot="start" icon={homeOutline}></IonIcon>
                            <div className="detail">
                              <h3>Location</h3>
                              <p
                                dangerouslySetInnerHTML={{
                                  __html: sitelinks.address,
                                }}></p>
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
                            onClick={() => contact(`tel:${sitelinks.phone}`)}
                            detail
                            lines="none"
                            color={"light"}>
                            <IonIcon
                              slot="start"
                              icon={phonePortrait}></IonIcon>
                            <div className="detail">
                              <h3>Call Us</h3>
                              <p>{sitelinks.phone}</p>
                            </div>
                            <IonLabel></IonLabel>
                          </IonItem>
                        </IonCol>
                        <IonCol size="6">
                          <IonItem
                            color={"light"}
                            onClick={() => contact(sitelinks.waMe)}
                            detail
                            lines="none">
                            <IonIcon slot="start" icon={logoWhatsapp}></IonIcon>
                            <div className="detail">
                              <h3>WhatsApp</h3>
                              <p>Start a WhatsApp chat</p>
                            </div>
                          </IonItem>
                        </IonCol>
                      </IonRow>
                    </IonGrid>
                  </IonList>
                )}
              </IonCol>
            </IonRow>
          </IonGrid>
        </Container>
        <Footer />
      </IonContent>
    </IonPage>
  );
};

export default NewMembers;
