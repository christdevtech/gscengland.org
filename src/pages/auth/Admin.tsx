import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import React from "react";
import {
  calendarNumberOutline,
  lockOpenOutline,
  newspaperOutline,
} from "ionicons/icons";
import { Redirect, Route } from "react-router";
import Dashboard from "./Dashboard";
import { IonReactRouter } from "@ionic/react-router";
import EditEvents from "./EventComposer";
import EditArticles from "./EditArticles";

const Admin = () => {
  return (
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Redirect exact path="/admin" to={"/admin/dashboard"} />

          <Route exact path={"/admin/dashboard"}>
            <Dashboard />
          </Route>

          <Route exact path={"/admin/events"}>
            <EditEvents />
          </Route>

          <Route exact path={"/admin/articles"}>
            <EditArticles />
          </Route>
        </IonRouterOutlet>

        <IonTabBar slot="bottom">
          <IonTabButton tab="dashboard" href="/admin/dashboard">
            <IonIcon icon={lockOpenOutline}></IonIcon>
            <IonLabel>Dashboard</IonLabel>
          </IonTabButton>

          <IonTabButton tab="events" href="/admin/events">
            <IonIcon icon={calendarNumberOutline}></IonIcon>
            <IonLabel>Events</IonLabel>
          </IonTabButton>

          <IonTabButton tab="articles" href="/admin/articles">
            <IonIcon icon={newspaperOutline}></IonIcon>
            <IonLabel>Articles</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  );
};

export default Admin;
