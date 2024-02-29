import {
  IonCard,
  IonCol,
  IonContent,
  IonGrid,
  IonImg,
  IonPage,
  IonRow,
} from "@ionic/react";
import React from "react";
import TopMenu from "../../components/TopMenu";
import Footer from "../../components/Footer";
import PageHeader, { PageHeroHeaderProps } from "../../components/PageHeader";
import bgImage from "../../assets/img/vintage-photo-hand-with-bible-praying-scaled.jpg";
import pastor from "../../assets/img/pastors.jpg";
import Container from "../../components/Container";
import { trustees } from "../../assets/data/Staff";

const OurLeader = () => {
  const heroProps: PageHeroHeaderProps = {
    title: ["Our Leadership"],
    subText: "Meet Our Pastor",
    bgImg: bgImage,
  };
  return (
    <IonPage>
      <IonContent>
        <TopMenu />
        <PageHeader {...heroProps} />
        <Container className="ourLeader">
          <IonGrid>
            <IonRow>
              <IonCol sizeXs="12" sizeSm="12" sizeMd="12" sizeLg="5">
                <img
                  src={pastor}
                  className="pastor"
                  style={{
                    width: "100%",
                    boxShadow: "inset 0 0 20px var(--ion-color-dark)",
                  }}
                />
              </IonCol>
              <IonCol
                className="ion-padding"
                sizeXs="12"
                sizeSm="12"
                sizeMd="12"
                sizeLg="6">
                <h2>Pastor Ola & Grace Olaiya</h2>
                <p>
                  Pastor Ola as he is popularly called, grew up in Nigeria and
                  accepted the life of Christ in the year 2000. He has been in
                  the ministry since then by serving in a local church, as an
                  evangelism leader, missions leader, part of the publicity
                  team, preacher, youth Leader and then Senior Pastor. Ola loves
                  to pray and engage in different types of evangelism (House to
                  House, face to face, street evangelism etc). His passion is to
                  see Jesus being preached to every man and for them to get to
                  know Him as their personal Lord. Ola is a trained Architect
                  and UK/EU Customs Compliance Professional.
                </p>
                <p>
                  Grace is Pastor Ola’s lovely wife and they both serve God
                  together with all their hearts. She grew up in Lagos, Nigeria,
                  after her parents relocated from Cameroon when she was just 3
                  years of age. Grace loves to study the word of God and enjoys
                  sharing her passion about the bible! She loves praying and
                  listening to spiritual sermons. Grace is a trained Geographer
                  and an Analytics Consultant by profession.
                </p>
                <p>They are blessed with a dear son.</p>
                <p>
                  Working alongside Ola & Grace is a growing core team of
                  volunteers who together carry the weight and practicalities of
                  the Church vision.
                </p>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol size="12">
                <h2 className="ion-text-center" style={{ display: "block " }}>
                  Our Trustees
                </h2>
              </IonCol>

              {trustees.map((trustee, index) => (
                <IonCol key={index} sizeXs="12" sizeSm="6" sizeMd="4">
                  <div className="ion-padding">
                    <img
                      src={trustee.imgUrl}
                      alt={trustee.name}
                      style={{
                        width: "100%",
                        aspectRatio: "1 / 1.1",
                        objectFit: "cover",
                        borderRadius: "1em",
                        boxShadow: "0 0 14px #00000019",
                      }}
                    />
                    <h3 className="ion-text-center">{trustee.name} </h3>
                  </div>
                </IonCol>
              ))}
            </IonRow>
          </IonGrid>
        </Container>
        <Footer />
      </IonContent>
    </IonPage>
  );
};

export default OurLeader;
