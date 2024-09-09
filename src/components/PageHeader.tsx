import { IonButton, IonCol, IonGrid, IonRow } from "@ionic/react";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "animate.css";
import "swiper/css/autoplay";
import "swiper/css";
import { useHistory } from "react-router";
import prayer1 from "../assets/img/prayer1.jpg";
import { Autoplay } from "swiper";

export interface PageHeroHeaderProps {
  title: string[];
  button?: { text: string; url: string };
  subText?: string;
  home?: true;
  bgImg: string;
}

const PageHeader: React.FC<PageHeroHeaderProps> = ({
  title,
  bgImg,
  button,
  subText,
  home,
}) => {
  const [activeTextIndex, setActiveTextIndex] = useState(0);

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

  const rotateText = () => {
    const length = title.length;
    // console.log(`currentIndex: ${activeTextIndex}`);
    if (activeTextIndex === length - 1) {
      // console.log("condition true");
      setActiveTextIndex(0);
    } else {
      setActiveTextIndex(activeTextIndex + 1);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => rotateText(), 5000);

    return () => {
      clearInterval(interval);
    };
  }, [activeTextIndex]);

  return (
    <div>
      {home ? (
        <IonGrid className="ion-no-padding">
          <IonRow>
            <IonCol>
              <Swiper modules={[Autoplay]} autoplay={true} loop>
                <SwiperSlide
                  className="homeSlider"
                  style={{
                    background: `url('${bgImg}')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <h1>Peace</h1>
                </SwiperSlide>
                <SwiperSlide
                  className="homeSlider"
                  style={{
                    background: `url('${prayer1}')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <h1>Joy</h1>
                </SwiperSlide>
              </Swiper>
            </IonCol>
          </IonRow>
        </IonGrid>
      ) : (
        <IonGrid
          className="hero ion-text-center"
          style={{
            background: `url("${bgImg}")`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        >
          <IonRow>
            <IonCol>
              {title.map((title, index) => (
                <h1
                  className="animate__animated  animate__flipInY"
                  style={{
                    display: index === activeTextIndex ? "block" : "none",
                  }}
                  key={index}
                >
                  {title}
                </h1>
              ))}
              {subText && (
                <p
                  className="subText m-auto ion-padding-bottom"
                  style={{ width: "min(95%,900px)" }}
                >
                  {subText}
                </p>
              )}
              {button && (
                <IonButton
                  color={"light"}
                  size="large"
                  onClick={() => handleLink(button.url)}
                >
                  {button.text}
                </IonButton>
              )}
            </IonCol>
          </IonRow>
        </IonGrid>
      )}
    </div>
  );
};

export default PageHeader;
