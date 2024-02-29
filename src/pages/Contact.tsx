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
  IonTextarea,
} from "@ionic/react";
import React, { useState } from "react";
import TopMenu from "../components/TopMenu";
import { useForm } from "react-hook-form";
import Container from "../components/Container";
import PageTop from "../components/PageTop";
import {
  checkmarkCircle,
  homeOutline,
  logoWhatsapp,
  mailOutline,
  phonePortrait,
} from "ionicons/icons";
import Footer from "../components/Footer";
import PageHeader, { PageHeroHeaderProps } from "../components/PageHeader";
import bgImage from "../assets/img/prayer1.jpg";
import ContactForm from "../components/ContactForm";
import { useGlobalAuth } from "../AuthContext";

const Contact = () => {
  const contact = (link: string) => {
    window.open(link, "_blank", "noreferrer");
  };

  const contactHeroProps: PageHeroHeaderProps = {
    title: ["Reach Out", "Contact Us"],
    subText: "Connect to everything God has for your life",
    bgImg: bgImage,
  };

  const { sitelinks } = useGlobalAuth() ?? {};

  return (
    <IonPage className="contact-page">
      <IonContent>
        <TopMenu />
        <PageHeader {...contactHeroProps} />
        <Container className="contact-form">
          <div>
            {sitelinks && (
              <IonGrid>
                <IonRow className="items ion-text-center">
                  <IonCol>
                    <div className="item">
                      <IonIcon icon={homeOutline}></IonIcon>
                      <h2>Sunday at Church</h2>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: sitelinks.address,
                        }}></p>
                    </div>
                  </IonCol>
                  <IonCol>
                    <div className="item">
                      <IonIcon icon={phonePortrait}></IonIcon>
                      <h2>Phone</h2>
                      <IonChip
                        onClick={() => contact(`tel:${sitelinks.phone}`)}>
                        {sitelinks.phone}
                      </IonChip>
                    </div>
                  </IonCol>
                  <IonCol>
                    <div className="item">
                      <IonIcon icon={mailOutline}></IonIcon>
                      <h2>Email</h2>
                      <IonChip
                        onClick={() => contact(`mailto:${sitelinks.email}`)}>
                        {sitelinks.email}
                      </IonChip>
                    </div>
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol style={{ padding: "0", margin: "0" }}>
                    <ContactForm title="Contact Us" />
                  </IonCol>
                </IonRow>
              </IonGrid>
            )}
          </div>
        </Container>
        <Footer />
      </IonContent>
    </IonPage>
  );
};

export default Contact;
