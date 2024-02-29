import {
  IonAccordion,
  IonAccordionGroup,
  IonCol,
  IonContent,
  IonGrid,
  IonImg,
  IonItem,
  IonPage,
  IonRow,
} from "@ionic/react";
import React from "react";
import TopMenu from "../../components/TopMenu";
import Footer from "../../components/Footer";
import PageHeader, { PageHeroHeaderProps } from "../../components/PageHeader";
import bgImage from "../../assets/img/group.jpg";
import Container from "../../components/Container";
import { beliefs } from "../../assets/data/Beliefs";

const About = () => {
  const heroProps: PageHeroHeaderProps = {
    title: ["About Us"],
    subText: "You May Come In As A Stranger But You’ll Leave As Family",
    bgImg: bgImage,
  };
  return (
    <IonPage className="aboutPage">
      <IonContent>
        <TopMenu />
        <PageHeader {...heroProps} />
        <Container className="aboutText">
          <IonGrid>
            <IonRow>
              <IonCol
                size="5"
                sizeSm="12"
                sizeXs="12"
                sizeMd="7"
                className="m-auto ion-text-center ">
                <h2>Our Vision</h2>
                <p>
                  At GSC, we have a mandate from God to evangelize, bring men,
                  and equip them with word of God, by the power of the Holy
                  Spirit.
                </p>
                <p>
                  We are committed to reach out to souls, develop and disciple
                  them for the coming King. We are persuaded that practicing and
                  living a holy life is the only way for a disciple to see the
                  face of God. Hence we evangelize and engage in discipleship
                </p>
              </IonCol>
            </IonRow>
          </IonGrid>
        </Container>
        <Container className="belief">
          <IonGrid>
            <IonRow>
              <IonCol
                sizeSm="12"
                sizeXs="12"
                sizeMd="12"
                className=" ion-text-start ">
                <h2>What We Believe</h2>
                <IonAccordionGroup
                  style={{ borderRadius: "1em", overflow: "clip" }}>
                  {beliefs.map((belief, index) => (
                    <IonAccordion key={index}>
                      <IonItem slot="header">
                        <h3 className="ion-padding-start">{belief.title} </h3>
                      </IonItem>
                      <div
                        slot="content"
                        className="ion-padding-start"
                        style={{ color: "var(--ion-color-dark)" }}>
                        <p
                          className="ion-padding-start ion-padding-end"
                          dangerouslySetInnerHTML={{
                            __html: belief.content,
                          }}></p>
                      </div>
                    </IonAccordion>
                  ))}
                </IonAccordionGroup>
              </IonCol>
            </IonRow>
          </IonGrid>
        </Container>

        <Footer />
      </IonContent>
    </IonPage>
  );
};

export default About;
