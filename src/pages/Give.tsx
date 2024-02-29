import {
  IonPage,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
} from "@ionic/react";
import React from "react";
import TopMenu from "../components/TopMenu";
import Footer from "../components/Footer";
import PageHeader, { PageHeroHeaderProps } from "../components/PageHeader";
import give from "../assets/img/photo_2023-06-19_21-22-05.jpg";
import Container from "../components/Container";
import { useHistory } from "react-router";

const Give = () => {
  const pageHeaderProps: PageHeroHeaderProps = {
    title: ["Partner", "Give Now"],
    bgImg: give,
    button: {
      url: "https://tithe.ly/give?c=7605352",
      text: "Donate Now",
    },
  };

  const history = useHistory();

  const handleLink = (url: string) => {
    if (url.startsWith("https")) {
      // If the URL starts with 'https', open it in a new tab/window
      window.open(url, "_blank");
    } else if (url.startsWith("mailto:")) {
      // If the URL starts with 'mailto:', initiate email
      window.location.href = url;
    } else if (url.startsWith("tel:")) {
      // If the URL starts with 'tel:', initiate phone call
      window.location.href = url;
    } else {
      // For all other URLs, use history.push
      history.push(url);
    }
  };
  return (
    <IonPage>
      <IonContent>
        <TopMenu />

        <PageHeader {...pageHeaderProps} />

        <Container>
          <IonGrid className="ion-padding ion-margin">
            <IonRow>
              <IonCol
                className="ion-text-center m-auto ion-padding ion-margin"
                sizeXs="12"
                sizeSm="10"
                sizeMd="8">
                <h2 className="w-900 h2 ">Your Gift is Changing Lives</h2>
                <p style={{ fontSize: "larger" }}>
                  Your kindness is bringing about a positive transformation in
                  the lives of individuals within our church, community, and
                  across the globe.
                </p>
              </IonCol>
            </IonRow>
          </IonGrid>
        </Container>

        <IonGrid style={{ background: "var(--ion-color-light)" }}>
          <IonRow>
            <IonCol>
              <Container>
                <div>
                  <h2 className="h2 ion-text-center w-900">Ways to Give</h2>
                </div>
              </Container>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol
              className="m-auto"
              sizeXs="12"
              sizeSm="10"
              sizeMd="8"
              sizeLg="8"
              sizeXl="8">
              <IonGrid className="copyable">
                <IonRow>
                  <IonCol sizeXs="12" sizeSm="6">
                    <div className="giveBox  ion-text-center">
                      <h3 className="ion-text-center w-700">Bank Transfer</h3>
                      <p>
                        Gateway Salvation Church <br />
                        LLOYDS BANK <br />
                        ACCOUNT NUMBER: 78006360 <br />
                        SORT CODE: 309950 <br />
                        IBAN: GB71LOYD30995078006360 <br />
                        BIC: LOYDGB21287
                      </p>
                    </div>
                  </IonCol>
                  <IonCol sizeXs="12" sizeSm="6">
                    <div className="giveBox ion-text-center">
                      {/* <h3 className="ion-text-center w-700">Bank Transfer</h3> */}
                      <h3 className=" w-700 ion-margin-bottom">
                        Online Payment
                      </h3>
                      <IonButton
                        className="ion-margin-top"
                        onClick={() =>
                          handleLink("https://tithe.ly/give?c=7605352")
                        }>
                        Pay Online with Tithely
                      </IonButton>
                    </div>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonCol>
          </IonRow>
        </IonGrid>
        <Footer />
      </IonContent>
    </IonPage>
  );
};

export default Give;
