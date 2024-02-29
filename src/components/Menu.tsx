import {
  IonAccordion,
  IonAccordionGroup,
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
  IonToast,
} from "@ionic/react";

import { useHistory, useLocation } from "react-router-dom";
import "./Menu.css";
import logo from "../assets/img/logo.png";
import { useGlobalAuth } from "../AuthContext";
import { heartOutline } from "ionicons/icons";
import { useEffect, useState } from "react";

const labels = ["Family", "Friends"];

const Menu: React.FC = () => {
  const location = useLocation();
  const history = useHistory();

  const { appPages, quickContact, currentMessage, toastMessage } =
    useGlobalAuth() ?? {};

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true);
  }, [currentMessage]);

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonAccordionGroup>
            {appPages?.map((websitePage, index) =>
              websitePage.dropdown ? (
                <IonAccordion key={index}>
                  <IonItem
                    className={
                      location.pathname.includes(websitePage.url)
                        ? "selected"
                        : ""
                    }
                    slot="header"
                    lines="none">
                    <IonIcon
                      aria-hidden="true"
                      slot="start"
                      icon={websitePage.icon}
                    />
                    <IonLabel> {websitePage.title}</IonLabel>
                  </IonItem>

                  <div slot="content" className="ion-padding-start">
                    <IonList className="dropdown">
                      {websitePage.dropdown.map((dropdownItem, index) => (
                        <IonMenuToggle autoHide={false} key={index}>
                          <IonItem
                            className={
                              location.pathname === dropdownItem.url
                                ? "selected"
                                : ""
                            }
                            routerLink={dropdownItem.url}
                            lines="full"
                            detail={false}>
                            {dropdownItem.title}
                          </IonItem>
                        </IonMenuToggle>
                      ))}
                    </IonList>
                  </div>
                </IonAccordion>
              ) : (
                <IonMenuToggle key={index} autoHide={false}>
                  <IonItem
                    className={
                      location.pathname === websitePage.url ? "selected" : ""
                    }
                    routerLink={websitePage.url}
                    routerDirection="none"
                    lines="none"
                    detail={false}>
                    <IonIcon
                      aria-hidden="true"
                      slot="start"
                      icon={websitePage.icon}
                    />
                    <IonLabel>{websitePage.title}</IonLabel>
                  </IonItem>
                </IonMenuToggle>
              )
            )}

            <IonMenuToggle>
              <IonItem
                lines="none"
                className={location.pathname === "/give" ? "selected" : ""}
                routerLink="/give">
                <IonIcon icon={heartOutline} slot="start"></IonIcon>
                Give Now
              </IonItem>
            </IonMenuToggle>
          </IonAccordionGroup>
        </IonList>
        <IonToast
          isOpen={isOpen}
          duration={5000}
          onDidDismiss={() => setIsOpen(false)}
          message={currentMessage}></IonToast>
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
