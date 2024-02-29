import { IonContent, IonPage } from "@ionic/react";
import React from "react";
import TopMenu from "../../components/TopMenu";
import Footer from "../../components/Footer";

const Beliefs = () => {
  return (
    <IonPage>
      <IonContent>
        <TopMenu />
        <h1>Beliefs</h1>
        <Footer />
      </IonContent>
    </IonPage>
  );
};

export default Beliefs;
