import React, { useState } from "react";
import {
  IonButton,
  IonButtons,
  IonCol,
  IonGrid,
  IonIcon,
  IonMenuButton,
  IonRow,
} from "@ionic/react";
import { useHistory, useLocation } from "react-router";
import logo from "../assets/img/logo.png";
import { useGlobalAuth } from "../AuthContext";
import { caretDown } from "ionicons/icons";

const TopMenu = () => {
  const history = useHistory();
  const location = useLocation();
  const { appPages } = useGlobalAuth() ?? {};
  const [openDropdown, setOpenDropdown] = useState("");

  return (
    <div className="header">
      <IonGrid>
        <IonRow>
          <IonCol
            size="12"
            sizeMd="12"
            sizeLg="10"
            sizeXl="10"
            className="m-auto">
            <IonGrid>
              <IonRow className="ion-align-items-center">
                <IonCol sizeXs="1.5" className="ion-hide-md-up ">
                  <IonButtons>
                    <IonMenuButton></IonMenuButton>
                  </IonButtons>
                </IonCol>
                <IonCol className="logo" sizeMd="1.5" sizeLg="3">
                  <img
                    src={logo}
                    alt="GSC England Logo"
                    onClick={() => history.push("/")}
                  />
                </IonCol>

                <IonCol
                  className="menu-container ion-hide-md-down"
                  size="10"
                  sizeMd="9"
                  sizeLg="8">
                  <ul className="menu">
                    {appPages?.map((appPage, index) => (
                      <li
                        onMouseEnter={() => setOpenDropdown(appPage.title)}
                        onMouseLeave={() => setOpenDropdown("")}
                        key={index}
                        className={`${
                          location.pathname.includes(appPage.url)
                            ? "active"
                            : ""
                        } ${appPage.dropdown ? "has-dropdown" : ""}`}>
                        <span onClick={() => history.push(appPage.url)}>
                          {appPage.title}
                        </span>
                        {appPage.dropdown && (
                          <IonIcon
                            icon={caretDown}
                            style={{
                              marginLeft: "10px",
                              marginBottom: "-4px",
                            }}></IonIcon>
                        )}
                        {appPage.dropdown && (
                          <ul
                            className={
                              openDropdown === appPage.title
                                ? "dropdown-menu open"
                                : "dropdown-menu"
                            }>
                            {appPage.dropdown.map((dropdownItem, index) => (
                              <li
                                key={index}
                                onClick={() => {
                                  console.log(dropdownItem.url);
                                  history.push(dropdownItem.url);
                                }}
                                className={
                                  location.pathname === dropdownItem.url
                                    ? "dropdown-item selected"
                                    : "dropdown-item"
                                }>
                                {dropdownItem.title}
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                </IonCol>
                <IonCol
                  sizeXs="5"
                  sizeMd="1.5"
                  sizeLg="1"
                  className="ion-text-end">
                  <IonButton onClick={() => history.push("/give")}>
                    Give Now
                  </IonButton>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonCol>
        </IonRow>
      </IonGrid>
    </div>
  );
};

export default TopMenu;
