import { IonContent, IonPage } from "@ionic/react";
import React from "react";
import TopMenu from "../components/TopMenu";

const About = () => {
  return (
    <IonPage>
      <IonContent>
        <TopMenu /> About
      </IonContent>
    </IonPage>
  );
};

export default About;
