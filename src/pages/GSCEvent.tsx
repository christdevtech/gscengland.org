import { IonContent, IonPage } from "@ionic/react";
import React from "react";
import { useParams } from "react-router";
import TopMenu from "../components/TopMenu";

const GSCEvent = () => {
  const { eventId } = useParams<{ eventId: string }>();
  return (
    <IonPage>
      <IonContent>
        <TopMenu /> Event Id: {eventId}
      </IonContent>
    </IonPage>
  );
};

export default GSCEvent;
