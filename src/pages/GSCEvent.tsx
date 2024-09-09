import {
  IonChip,
  IonCol,
  IonContent,
  IonGrid,
  IonImg,
  IonItem,
  IonPage,
  IonRow,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import TopMenu from "../components/TopMenu";
import Container from "../components/Container";
import PageHeader, { PageHeroHeaderProps } from "../components/PageHeader";
import headerImg from "../assets/img/james-barr-lf8nwCdrx00-unsplash-scaled.jpg";
import { GSCEvent } from "../interfaces";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import GSCEventImageSlider from "../components/GSCEventImageSlider";

const GSCSingleEvent = () => {
  const { eventId } = useParams<{ eventId: string }>();

  const [GSCEventData, setGSCEventData] = useState<GSCEvent>();
  const [pastEvent, setPastEvent] = useState<boolean>(false);

  const getRecurringInfo = (startDateTime: string, event: GSCEvent): string => {
    const startDate = new Date(startDateTime);
    const endDate = new Date(event.end);

    // Helper function to get the day of the week
    const getDayOfWeek = (date: Date): string => {
      const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      return days[date.getDay()];
    };

    // Helper function to format time in 12-hour format
    const formatTime = (date: Date): string => {
      const hours = date.getHours() % 12 || 12;
      const minutes = date.getMinutes().toString().padStart(2, "0");
      const ampm = date.getHours() >= 12 ? "pm" : "am";
      return `${hours}:${minutes} ${ampm}`;
    };

    // Get day of the week for the start date
    const dayOfWeek = getDayOfWeek(startDate);
    const day = startDate.getDate();
    const ordinalSuffix =
      day % 10 === 1 && day !== 11
        ? "st"
        : day % 10 === 2 && day !== 12
        ? "nd"
        : day % 10 === 3 && day !== 13
        ? "rd"
        : "th";

    switch (event.frequency) {
      case "weekly":
        return `Every ${dayOfWeek} from ${formatTime(
          startDate
        )} to ${formatTime(endDate)}`;
      case "monthly":
        // Determine the ordinal suffix for the day
        return `Every ${ordinalSuffix} ${dayOfWeek} of the month from ${formatTime(
          startDate
        )} to ${formatTime(endDate)}`;
      case "yearly":
        const month = startDate.toLocaleString("en-US", { month: "long" });
        return `Every ${ordinalSuffix} ${dayOfWeek} of ${month} from ${formatTime(
          startDate
        )} to ${formatTime(endDate)}`;
      default:
        return "";
    }
  };

  const getOrdinalIndicator = (day: number): string => {
    if (day > 3 && day < 21) return "th";
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };
  const getEventTimeData = (event: GSCEvent): string => {
    const startDate = new Date(event.start);
    const endDate = new Date(event.end);

    const startDay = startDate.getDate();
    const startMonth = startDate.toLocaleString("en-US", { month: "long" });
    const startYear = startDate.getFullYear();
    const startTime = startDate.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });

    const endDay = endDate.getDate();
    const endMonth = endDate.toLocaleString("en-US", { month: "long" });
    const endYear = endDate.getFullYear();
    const endTime = endDate.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });

    if (startDate.toDateString() === endDate.toDateString()) {
      return `On ${startDay}${getOrdinalIndicator(
        startDay
      )}, ${startMonth} ${startYear} from ${startTime} to ${endTime}`;
    } else if (startDate.getMonth() === endDate.getMonth()) {
      return `From ${startDay}${getOrdinalIndicator(
        startDay
      )} to ${endDay}${getOrdinalIndicator(
        endDay
      )} of ${startMonth}, ${startYear}`;
    } else {
      return `From ${startDay}${getOrdinalIndicator(
        startDay
      )} ${startMonth} ${startYear} to ${endDay}${getOrdinalIndicator(
        endDay
      )} ${endMonth} ${endYear}`;
    }
  };
  const homeHead: PageHeroHeaderProps = {
    title: [GSCEventData ? GSCEventData.title : ""],
    subText:
      GSCEventData && GSCEventData?.recurring
        ? `${getRecurringInfo(GSCEventData.start, GSCEventData)}`
        : GSCEventData && getEventTimeData(GSCEventData),
    button: { text: "Make Inquiries", url: "/contact" },
    bgImg: headerImg,
  };

  const isEventPast = (dateTimeString: string): boolean => {
    if (dateTimeString === "") {
      return false;
    }
    const today = new Date();
    const inputDateTime = new Date(dateTimeString);

    // Compare the input date and time with today's date and time
    return inputDateTime.getTime() < today.getTime();
  };

  useEffect(() => {
    const eventRef = doc(db, "events", eventId);
    onSnapshot(eventRef, (doc) => {
      if (doc.exists()) {
        const data = doc.data() as GSCEvent;
        setGSCEventData(data);
      }
    });
  }, [eventId]);
  useEffect(() => {
    if (GSCEventData) setPastEvent(isEventPast(GSCEventData?.end));
  }, [GSCEventData]);

  return (
    <IonPage>
      <IonContent>
        <TopMenu />
        <PageHeader {...homeHead} />
        <Container className="event-pageData">
          <div>
            <IonGrid>
              <IonRow className="ion-justify-content-between ion-align-items-start">
                <IonCol sizeLg="5" sizeSm="8" sizeXs="11" className="m-auto">
                  <img src={GSCEventData?.imgUrl} />
                </IonCol>
                <IonCol
                  sizeSm="9"
                  sizeLg="6"
                  className="m-auto ion-text-center-sm-down"
                >
                  {pastEvent && <IonChip color={"danger"}>Past Event</IonChip>}
                  <h2>Event Details </h2>
                  <p className="ion-text-justify event-description">
                    {GSCEventData?.description}
                  </p>
                  <h4>Event Venue: </h4>
                  <p className="event-description">{GSCEventData?.venue}</p>
                  {GSCEventData?.recurring && (
                    <>
                      <h4>Event Day(s) and Time: </h4>
                      <p className="event-description">
                        {getRecurringInfo(GSCEventData.start, GSCEventData)}
                      </p>
                    </>
                  )}
                </IonCol>
              </IonRow>
              <IonRow className="ion-padding-top"></IonRow>
            </IonGrid>
          </div>
        </Container>

        {GSCEventData?.pictures && (
          <Container>
            <IonGrid>
              <IonRow>
                <IonCol>
                  <GSCEventImageSlider urls={GSCEventData.pictures} />
                </IonCol>
              </IonRow>
            </IonGrid>
          </Container>
        )}
      </IonContent>
    </IonPage>
  );
};

export default GSCSingleEvent;
