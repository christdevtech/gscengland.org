import React from "react";
import { useGlobalAuth } from "../AuthContext";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonGrid,
  IonImg,
  IonRow,
} from "@ionic/react";

const EventManager = () => {
  const { GSCEvents } = useGlobalAuth() ?? {};
  return (
    <div>
      <h1>EventManager</h1>
      <IonButton shape="round" color={"light"} routerLink="/event-composer/new">
        Add New Event
      </IonButton>
      <IonGrid>
        <IonRow>
          {GSCEvents &&
            GSCEvents.map((event) => (
              <IonCol key={event.title} sizeMd="4" className="ion-padding">
                <IonCard
                  color={"light"}
                  routerLink={`/event-composer/${event.eventId}`}
                >
                  <IonImg src={event.imgUrl}></IonImg>
                  <IonCardHeader>
                    <IonCardTitle>{event.title}</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <p>{event.description}</p>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            ))}
        </IonRow>
      </IonGrid>
    </div>
  );
};

export default EventManager;
