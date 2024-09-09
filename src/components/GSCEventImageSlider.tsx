import {
  IonCol,
  IonFab,
  IonFabButton,
  IonGrid,
  IonIcon,
  IonRow,
} from "@ionic/react";
import { arrowBackOutline, arrowForwardOutline } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import "animate.css";

interface sliderProps {
  urls: string[];
}

const GSCEventImageSlider = ({ urls }: sliderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [animationActive, setAnimationActive] = useState(false);

  const openLightbox = (index: number) => {
    setSelectedImageIndex(index);
    setIsOpen(true);
  };

  const closeLightbox = () => {
    setIsOpen(false);
  };

  const goToPreviousImage = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex === 0 ? urls.length - 1 : prevIndex - 1
    );
  };

  const goToNextImage = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex === urls.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    if (isOpen) {
      setAnimationActive(true);
      setTimeout(() => {
        setAnimationActive(false);
      }, 700);
    }
  }, [selectedImageIndex]);
  return (
    <IonGrid className="event-image-gallery">
      {urls.length > 0 && <h2>Event Gallery</h2>}
      <IonRow className="image-grid">
        {urls.map((url, index) => (
          <IonCol
            key={index}
            sizeXs="12"
            sizeSm="6"
            sizeMd="4"
            sizeLg="3"
            sizeXl="3"
            onClick={() => openLightbox(index)} // Open lightbox on click
          >
            <img src={url} alt={`image-${url}`} />
          </IonCol>
        ))}
      </IonRow>

      {isOpen && (
        <div className="lightbox">
          <div
            className="lightbox-overlay"
            onClick={closeLightbox} // Close lightbox on overlay click
          />
          <div className="lightbox-content">
            <img
              src={urls[selectedImageIndex]}
              alt="lightbox"
              className={
                animationActive
                  ? "animate__animated animate__rubberBand animate__faster"
                  : ""
              }
            />
            <IonFab
              className="prev-btn ion-margin-start"
              onClick={goToPreviousImage}
              horizontal="start"
              vertical="center"
            >
              <IonFabButton color={"dark"}>
                <IonIcon icon={arrowBackOutline}></IonIcon>
              </IonFabButton>
            </IonFab>
            <IonFab
              className="next-btn ion-margin-end"
              onClick={goToNextImage}
              horizontal="end"
              vertical="center"
            >
              <IonFabButton color={"dark"}>
                <IonIcon icon={arrowForwardOutline}></IonIcon>
              </IonFabButton>
            </IonFab>
          </div>
        </div>
      )}
    </IonGrid>
  );
};

export default GSCEventImageSlider;
