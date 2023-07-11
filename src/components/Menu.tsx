import {
  IonContent,
  IonFooter,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from "@ionic/react";

import { useHistory, useLocation } from "react-router-dom";
import "./Menu.css";
import logo from "../assets/img/logo.png";
import { useGlobalAuth } from "../AuthContext";

const labels = ["Family", "Friends"];

const Menu: React.FC = () => {
  const location = useLocation();
  const history = useHistory();

  const { appPages, quickContact } = useGlobalAuth() ?? {};

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <img src={logo} alt="" onClick={() => history.push("/")} />

        <IonList id="inbox-list">
          {appPages?.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem
                  className={
                    location.pathname === appPage.url ? "selected" : ""
                  }
                  routerLink={appPage.url}
                  routerDirection="none"
                  lines="none"
                  detail={false}
                >
                  <IonIcon
                    aria-hidden="true"
                    slot="start"
                    icon={appPage.icon}
                  />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>
      </IonContent>
      <IonFooter>
        <IonList id="labels-list">
          <IonListHeader>Quick Actions</IonListHeader>
          {quickContact?.map((quick, index) => (
            <a href={quick.url} target="_blank" key={index}>
              <IonItem lines="none">
                <IonIcon aria-hidden="true" slot="start" icon={quick.icon} />
                <IonLabel>{quick.title}</IonLabel>
              </IonItem>
            </a>
          ))}
        </IonList>
      </IonFooter>
    </IonMenu>
  );
};

export default Menu;
