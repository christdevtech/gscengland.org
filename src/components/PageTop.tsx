import { IonButton } from "@ionic/react";
import React from "react";
import { useHistory } from "react-router";
import Container from "./Container";

interface PageTopProps {
  pageHeader: string;
  pageSubText: string;
  button?: { text: string; url: string; color?: string };
  backgroundImage?: string;
}

const PageTop: React.FC<PageTopProps> = ({
  pageHeader,
  pageSubText,
  button,
  backgroundImage,
}) => {
  const history = useHistory();

  const openPage = (location: string) => {
    history.push(location);
  };
  return (
    <div className="pageHeaderContainer">
      <Container>
        <div>
          <h1 className="w-800 pageHeader">{pageHeader}</h1>
          <p className="pageSubheader w-500">{pageSubText}</p>
          {button && (
            <IonButton
              onClick={() => openPage(button.url)}
              color={button.color ? button.color : "primary"}>
              {button.text}
            </IonButton>
          )} 
        </div>
      </Container>
    </div>
  );
};

export default PageTop;
