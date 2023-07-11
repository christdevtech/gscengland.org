import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonPage,
  IonRow,
} from "@ionic/react";
import React from "react";
import TopMenu from "../components/TopMenu";
import HomeSlider from "../components/HomeSlider";
import { cardData } from "../assets/data/Slide";
import { useHistory } from "react-router";

const Home = () => {
  const history = useHistory();
  const openPage = (url: string) => {
    history.push(url);
  };
  return (
    <IonPage>
      <IonContent>
        <TopMenu />
        <HomeSlider />
        <IonGrid className="welcome">
          <IonRow>
            <IonCol
              sizeXs="12"
              sizeLg="10"
              sizeMd="11"
              sizeSm="12"
              sizeXl="9"
              className="m-auto "
            >
              <div>
                <h2>Welcome to Gateway Salvation Church, Dartford.</h2>
                <p>Evangelism, Discipleship, Holy Living</p>
              </div>
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonGrid className="cards">
          <IonRow>
            <IonCol
              sizeXs="12"
              sizeLg="10"
              sizeMd="11"
              sizeSm="12"
              sizeXl="9"
              className="m-auto"
            >
              <IonGrid>
                <IonRow>
                  {cardData.map((card, index) => (
                    <IonCol key={index} sizeXl="4" sizeMd="4" sizeXs="12">
                      <div className="card ion-padding">
                        <IonIcon icon={card.icon}></IonIcon>
                        <h3>{card.headline}</h3>
                        <p>{card.smallText}</p>
                        <IonButton onClick={() => openPage(card.button.url)}>
                          {card.button.text}
                        </IonButton>
                      </div>
                    </IonCol>
                  ))}
                </IonRow>
              </IonGrid>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Home;
