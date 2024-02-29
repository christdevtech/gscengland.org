import { IonButton, IonContent, IonPage } from "@ionic/react";
import React from "react";
import Container from "../../components/Container";
import TopMenu from "../../components/TopMenu";

const EditArticles = () => {
  return (
    <IonPage>
      <IonContent>
        <TopMenu />
        <Container>
          <div className="admin-articles">
            <h1>Manage Articles</h1>
            <IonButton>Add Articles</IonButton>
          </div>
        </Container>
      </IonContent>
    </IonPage>
  );
};

export default EditArticles;
