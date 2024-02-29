import {
  IonButton,
  IonChip,
  IonCol,
  IonGrid,
  IonInput,
  IonItem,
  IonList,
  IonRow,
  IonTextarea,
} from "@ionic/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useGlobalAuth } from "../AuthContext";
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

const SiteLinksUpdater = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { user, toastMessage, sitelinks } = useGlobalAuth() ?? {};

  const [firedb, setFiredb] = useState(false);

  // Converts `<br />` tags to new line characters
  const convertBrTagsToNewLines = (str: string): string => {
    return str.replace(/<br\s?\/?>/g, "\n");
  };

  // Converts new line characters to `<br />` tags
  const convertNewLinesToBrTags = (str: string): string => {
    return str.replace(/\n/g, "<br />");
  };

  const updateSiteLinks = async (data: any) => {
    setFiredb(true);
    // console.log("sitelinks function logging");
    data.address = convertNewLinesToBrTags(data.address);
    // console.log("The new Sitelinks", data);
    const collectionref = collection(db, "data");
    const docref = doc(collectionref, "sitelinks");
    await setDoc(docref, data);
    setFiredb(false);
  };

  return (
    <div>
      <form className="sitelinks-form" onSubmit={handleSubmit(updateSiteLinks)}>
        <IonGrid>
          <IonRow>
            <IonCol
              className="m-auto ion-text-center"
              size="12"
              sizeSm="12"
              sizeMd="10"
              sizeLg="8"
            >
              <h2>Manage Website Links</h2>
              <IonList>
                <IonItem
                  color={"light"}
                  lines="none"
                  className="ion-margin-bottom"
                >
                  <IonTextarea
                    label="Address"
                    labelPlacement="floating"
                    rows={4}
                    value={
                      sitelinks
                        ? convertBrTagsToNewLines(sitelinks.address)
                        : ""
                    }
                    {...register("address")}
                  ></IonTextarea>
                </IonItem>

                {errors.address && (
                  <IonChip color={"danger"}>The Address is required</IonChip>
                )}

                <IonItem
                  color={"light"}
                  lines="none"
                  className="ion-margin-bottom"
                >
                  <IonInput
                    label="Contact Email"
                    labelPlacement="floating"
                    value={
                      sitelinks ? convertBrTagsToNewLines(sitelinks.email) : ""
                    }
                    {...register("email")}
                  ></IonInput>
                </IonItem>

                <IonItem
                  color={"light"}
                  lines="none"
                  className="ion-margin-bottom"
                >
                  <IonInput
                    label="Facebook Page Link"
                    labelPlacement="floating"
                    value={
                      sitelinks
                        ? convertBrTagsToNewLines(sitelinks.facebook)
                        : ""
                    }
                    {...register("facebook")}
                  ></IonInput>
                </IonItem>

                <IonItem
                  color={"light"}
                  lines="none"
                  className="ion-margin-bottom"
                >
                  <IonInput
                    label="Instagram Account Link"
                    labelPlacement="floating"
                    value={
                      sitelinks
                        ? convertBrTagsToNewLines(sitelinks.instagram)
                        : ""
                    }
                    {...register("instagram")}
                  ></IonInput>
                </IonItem>

                <IonItem
                  color={"light"}
                  lines="none"
                  className="ion-margin-bottom"
                >
                  <IonInput
                    label="Google Map Share Link"
                    labelPlacement="floating"
                    value={
                      sitelinks ? convertBrTagsToNewLines(sitelinks.map) : ""
                    }
                    {...register("map")}
                  ></IonInput>
                </IonItem>

                <IonItem
                  color={"light"}
                  lines="none"
                  className="ion-margin-bottom"
                >
                  <IonInput
                    label="Google Map Embed URL"
                    labelPlacement="floating"
                    value={
                      sitelinks
                        ? convertBrTagsToNewLines(sitelinks.mapEmbed)
                        : ""
                    }
                    {...register("mapEmbed")}
                  ></IonInput>
                </IonItem>

                <IonItem
                  color={"light"}
                  lines="none"
                  className="ion-margin-bottom"
                >
                  <IonInput
                    label="Phone Number"
                    labelPlacement="floating"
                    value={
                      sitelinks ? convertBrTagsToNewLines(sitelinks.phone) : ""
                    }
                    {...register("phone")}
                  ></IonInput>
                </IonItem>

                <IonItem
                  color={"light"}
                  lines="none"
                  className="ion-margin-bottom"
                >
                  <IonInput
                    label="WhatsApp Link"
                    labelPlacement="floating"
                    value={
                      sitelinks ? convertBrTagsToNewLines(sitelinks.waMe) : ""
                    }
                    {...register("waMe")}
                  ></IonInput>
                </IonItem>

                <IonItem
                  color={"light"}
                  lines="none"
                  className="ion-margin-bottom"
                >
                  <IonInput
                    label="Youtube Channel Link"
                    labelPlacement="floating"
                    value={
                      sitelinks
                        ? convertBrTagsToNewLines(sitelinks.youtube)
                        : ""
                    }
                    {...register("youtube")}
                  ></IonInput>
                </IonItem>

                <IonItem
                  color={"light"}
                  lines="none"
                  className="ion-margin-bottom"
                >
                  <IonInput
                    label="Sunday Service Time"
                    labelPlacement="floating"
                    value={sitelinks ? sitelinks.serviceTime : ""}
                    {...register("serviceTime")}
                  ></IonInput>
                </IonItem>

                <IonItem
                  color={"light"}
                  lines="none"
                  className="ion-margin-bottom"
                >
                  <IonInput
                    label="Thursday Service Time"
                    labelPlacement="floating"
                    value={sitelinks ? sitelinks.thursdayService : ""}
                    {...register("thursdayService")}
                  ></IonInput>
                </IonItem>
              </IonList>
              <IonButton
                type="submit"
                disabled={firedb}
                color={"dark"}
                shape="round"
              >
                Save Changes
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </form>
    </div>
  );
};

export default SiteLinksUpdater;
