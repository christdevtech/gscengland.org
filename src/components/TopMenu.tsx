import React from "react";
import {
  IonButton,
  IonButtons,
  IonCol,
  IonGrid,
  IonMenuButton,
  IonRow,
} from "@ionic/react";
import { useHistory, useLocation } from "react-router";
import logo from "../assets/img/logo.png";
import { useGlobalAuth } from "../AuthContext";

const TopMenu = () => {
  const history = useHistory();
  const location = useLocation();
  const { appPages } = useGlobalAuth() ?? {};
  return (
    <header>
      <IonGrid>
        <IonRow>
          <IonCol size="12" sizeMd="10" className="m-auto">
            <IonGrid>
              <IonRow className="ion-align-items-center">
                <IonCol sizeXs="1.5" className="ion-hide-sm-up ">
                  <IonButtons>
                    <IonMenuButton></IonMenuButton>
                  </IonButtons>
                </IonCol>
                <IonCol className="logo">
                  <img
                    src={logo}
                    alt="GSC England Logo"
                    onClick={() => history.push("/")}
                  />
                </IonCol>
                <IonCol sizeXs="5" className="ion-hide-sm-up ">
                  <IonButton
                    shape="round"
                    onClick={() => history.push("/give")}
                  >
                    Give now
                  </IonButton>
                </IonCol>
                <IonCol className="menu-container ion-hide-sm-down" size="10">
                  <ul className="menu">
                    {appPages?.map((appPage, index) => (
                      <li
                        onClick={() => history.push(appPage.url)}
                        key={index}
                        className={
                          location.pathname === appPage.url ? "active" : ""
                        }
                      >
                        {appPage.title}
                      </li>
                    ))}
                  </ul>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonCol>
        </IonRow>
      </IonGrid>
    </header>
  );
};

export default TopMenu;
