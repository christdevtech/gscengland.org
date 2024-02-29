import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonImg,
  IonItem,
  IonList,
  IonPage,
  IonRow,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import TopMenu from "../components/TopMenu";
import Footer from "../components/Footer";
import PageHeader, { PageHeroHeaderProps } from "../components/PageHeader";
import headerImg from "../assets/img/james-barr-lf8nwCdrx00-unsplash-scaled.jpg";
import newHere from "../assets/img/newHere.jpg";
import thursdayZoom from "../assets/img/hourofCross.jpg";
import prayersFor from "../assets/img/PHOTO-2023-04-01-11-44-15_1-1.jpg";
import Container from "../components/Container";
import { useHistory } from "react-router";
import {
  calendarOutline,
  documentsOutline,
  documentsSharp,
  mapOutline,
  peopleCircleOutline,
} from "ionicons/icons";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper";

const homeHead: PageHeroHeaderProps = {
  title: ["GSC Events"],
  subText: "View our Upcoming Events",
  button: { text: "Visit Us", url: "/contact" },
  bgImg: headerImg,
};

const GSCEvents = () => {
  const history = useHistory();
  const [activeIndex, setActiveIndex] = useState(0);
  const eventImages = [newHere, thursdayZoom, prayersFor];

  const rotateImages = () => {
    const length = eventImages.length;
    // console.log(`currentIndex: ${activeIndex}`);
    if (activeIndex === length - 1) {
      // console.log("condition true");
      setActiveIndex(0);
    } else {
      setActiveIndex(activeIndex + 1);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => rotateImages(), 5000);

    return () => {
      clearInterval(interval);
    };
  }, [activeIndex]);

  return (
    <IonPage>
      <IonContent>
        <TopMenu />
        <PageHeader {...homeHead} />
        <Container className="newIntro">
          <IonGrid>
            <IonRow className="ion-align-items-center">
              <IonCol size="6" sizeXs="12" sizeSm="12" sizeMd="12" sizeLg="6">
                <h2>Our Service List</h2>{" "}
                <IonList>
                  <IonItem lines="none">
                    <IonIcon icon={calendarOutline} slot="start"></IonIcon>
                    <span>
                      Join us for in-person services on Sundays at 10am
                    </span>
                  </IonItem>
                  <IonItem lines="none">
                    <IonIcon icon={calendarOutline} slot="start"></IonIcon>
                    <span>
                      Hour of the Cross (weekly Bible study) Every Thursday
                    </span>
                  </IonItem>
                  <IonItem lines="none">
                    <IonIcon icon={calendarOutline} slot="start"></IonIcon>
                    <span>
                      Night of Prayer (monthly vigil) Every last Friday
                    </span>
                  </IonItem>
                  <IonItem lines="none">
                    <IonIcon icon={calendarOutline} slot="start"></IonIcon>
                    <span>Prayer Rain Conference (every December)</span>
                  </IonItem>
                </IonList>
                <p>
                  We would love to get to know you better. Please feel free to
                  introduce yourself to one of our ushers or pastors. We would
                  also be happy to answer any questions you have about our
                  church or our faith.
                </p>
                <IonButton
                  color={"dark"}
                  size="large"
                  onClick={() => history.push("/about")}>
                  KNOW MORE
                </IonButton>
              </IonCol>
              <IonCol size="6" sizeXs="12" sizeSm="12" sizeMd="12" sizeLg="6">
                {eventImages.map((image, index) => (
                  <IonImg
                    className="animate__animated  animate__fadeInUp"
                    style={{
                      display: index === activeIndex ? "block" : "none",
                    }}
                    src={image}
                    key={index}></IonImg>
                ))}
              </IonCol>
            </IonRow>
          </IonGrid>
        </Container>
        <Footer />
      </IonContent>
    </IonPage>
  );
};

export default GSCEvents;
