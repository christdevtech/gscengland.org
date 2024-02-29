import { IonPage, IonContent } from "@ionic/react";
import React from "react";
import Footer from "../../components/Footer";
import TopMenu from "../../components/TopMenu";

const Vision = () => {
  return (
    <IonPage>
      <IonContent>
        <TopMenu />
        <h1>Our Vision</h1>
        <Footer />
      </IonContent>
    </IonPage>
  );
};

export default Vision;
