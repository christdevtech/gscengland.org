import { IonCol, IonGrid, IonRow } from "@ionic/react";
import React from "react";

interface Props {
  children: JSX.Element;
  className?: string;
  color?: string;
}

const Container = ({ children, className, color }: Props) => {
  return (
    <IonGrid
      className={className ? className : ""}
      color={color ? color : "light"}>
      <IonRow>
        <IonCol
          sizeXs="12"
          sizeSm="12"
          sizeMd="11"
          sizeLg="10"
          sizeXl="9"
          className="m-auto">
          {children}
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

export default Container;
