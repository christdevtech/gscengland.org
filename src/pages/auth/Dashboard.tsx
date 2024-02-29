import {
  IonButton,
  IonContent,
  IonLabel,
  IonPage,
  IonSegment,
  IonSegmentButton,
  IonTabs,
} from "@ionic/react";
import React, { useState } from "react";
import TopMenu from "../../components/TopMenu";
import { useGlobalAuth } from "../../AuthContext";
import Container from "../../components/Container";
import SiteLinksUpdater from "../../components/SiteLinksUpdater";
import MonthDataUpdater from "../../components/MonthDataUpdater";
import EventManager from "../../components/EventManager";

const Dashboard = () => {
  const { user, signOut, toastMessage } = useGlobalAuth() ?? {};
  const [activePage, setActivePage] = useState("monthDataUpdater");

  const handleToggleActivePage = (page: string) => {
    toastMessage?.(page);
    setActivePage(page);
  };

  return (
    <IonPage>
      <IonContent>
        <TopMenu />
        <Container>
          <div className="admin-tabs">
            <IonSegment
              value={activePage}
              mode="ios"
              onIonChange={(e) => {
                if (e.target.value) handleToggleActivePage(e.target.value);
              }}
            >
              <IonSegmentButton value="monthDataUpdater">
                <IonLabel>Month Data Updater</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="siteLinksUpdater">
                <IonLabel>SiteLinks Updater</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="eventsManager">
                <IonLabel>Events Manager</IonLabel>
              </IonSegmentButton>
            </IonSegment>
          </div>
        </Container>
        <Container>
          <div className="main-admin-element">
            {activePage === "siteLinksUpdater" && <SiteLinksUpdater />}
            {activePage === "monthDataUpdater" && <MonthDataUpdater />}
            {activePage === "eventsManager" && <EventManager />}
            <div>
              <h1>Admin</h1>
              <p>{user && user.email}</p>
              <IonButton onClick={signOut}>Sign Out</IonButton>
            </div>
          </div>
        </Container>
      </IonContent>
    </IonPage>
  );
};

export default Dashboard;
