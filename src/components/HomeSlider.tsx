import React from "react";
import { register } from "swiper/element/bundle";
import { sliderData } from "../assets/data/Slide";
import { IonButton, IonCol, IonGrid, IonRow } from "@ionic/react";
import { useHistory } from "react-router";

register();

const HomeSlider = () => {
  const history = useHistory();

  const navigateToPage = (url: string) => {
    history.push(url);
  };

  return (
    <div className="home-slider">
      <swiper-container
        speed="1000"
        loop="true"
        navigation
        pagination="true"
        onSlideChange={() => console.log("slide change")}
        autoPlay={true}
        effect="flip"
        // flipEffect={{ slideShadow: true }}
        // direction="horizontal"
      >
        {sliderData.map((slideData, index) => (
          <swiper-slide
            key={index + 1}
            style={
              slideData.backgroundUrl && {
                backgroundImage: `url("${slideData.backgroundUrl}")`,
              }
            }>
            <IonGrid>
              <IonRow>
                <IonCol sizeSm="6" sizeMd="8" sizeXl="6" className="m-auto">
                  <h3>{slideData.headline}</h3>
                  {slideData.buttons && (
                    <IonGrid>
                      <IonRow className="">
                        <IonCol className="ion-hide-md-down"></IonCol>
                        <IonCol>
                          <IonButton
                            shape="round"
                            onClick={() => navigateToPage("/about")}
                            color={"dark"}>
                            About Us
                          </IonButton>
                        </IonCol>
                        <IonCol>
                          <IonButton
                            shape="round"
                            onClick={() => navigateToPage("/contact")}
                            color={"danger"}>
                            Contact Us
                          </IonButton>
                        </IonCol>
                        <IonCol className="ion-hide-md-down"></IonCol>
                      </IonRow>
                    </IonGrid>
                  )}
                </IonCol>
              </IonRow>
            </IonGrid>
          </swiper-slide>
        ))}
      </swiper-container>
    </div>
  );
};

export default HomeSlider;
