import React from "react";
import Container from "./Container";
import { IonCol, IonGrid, IonIcon, IonImg, IonRow } from "@ionic/react";
import Logo from "../assets/img/logo-white.png";
import { logoFacebook, logoInstagram, logoYoutube } from "ionicons/icons";
import { useHistory } from "react-router";
import { useGlobalAuth } from "../AuthContext";

const Footer = () => {
  const history = useHistory();

  const { sitelinks } = useGlobalAuth() ?? {};

  const openSocial = (link: string) => {
    window.open(link, "_blank");
  };
  return (
    <Container className="footer ion-padding-top" color="danger">
      <IonGrid>
        {sitelinks && (
          <IonRow>
            <IonCol size="12" sizeMd="6" className="m-auto">
              <IonImg
                src={Logo}
                alt="Gateway Salvation Church Logo"
                className="footer-logo"></IonImg>
              <div className="socialIcons ion-margin-top ion-padding-top">
                <IonIcon
                  icon={logoFacebook}
                  onClick={() => openSocial(sitelinks.facebook)}></IonIcon>
                <IonIcon
                  icon={logoInstagram}
                  onClick={() => openSocial(sitelinks.instagram)}></IonIcon>
                <IonIcon
                  icon={logoYoutube}
                  onClick={() => openSocial(sitelinks.youtube)}></IonIcon>
              </div>
              <p>
                Gateway Salvation Church is a charity registered in England &
                Wales no. 1203676 <br />© {new Date().toISOString().slice(0, 4)}{" "}
                Gateway Salvation Church, England. All Rights Reserved.
              </p>
            </IonCol>
          </IonRow>
        )}
      </IonGrid>
    </Container>
  );
};

export default Footer;
