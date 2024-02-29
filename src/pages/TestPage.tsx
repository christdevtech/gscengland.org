import { IonContent, IonPage } from "@ionic/react";
import React from "react";
import TopMenu from "../components/TopMenu";
import Footer from "../components/Footer";

const TestPage = () => {
  return (
    <IonPage>
      <IonContent>
        <TopMenu />
        TestPage
        <Footer />
      </IonContent>
    </IonPage>
  );
};

export default TestPage;
