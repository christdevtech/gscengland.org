import { IonButton, IonContent, IonPage } from "@ionic/react";
import React from "react";
import TopMenu from "../../components/TopMenu";
import { useGlobalAuth } from "../../AuthContext";

const Admin = () => {
  const { user, signOut } = useGlobalAuth() ?? {};

  return (
    <IonPage>
      <IonContent>
        <TopMenu />
        <h1>Admin</h1>

        <p>{user && user.email}</p>
        <IonButton onClick={signOut}>Sign Out</IonButton>
        <IonButton>Add Event</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Admin;
