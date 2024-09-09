import React from "react";
import { useGlobalAuth } from "../AuthContext";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonGrid,
  IonImg,
  IonRow,
} from "@ionic/react";
import { GSCEvent } from "../interfaces";

const EventManager = () => {
  const { GSCEvents } = useGlobalAuth() ?? {};

  const getRecurringValue = (startDate: string, event: GSCEvent): string => {
    const start = new Date(startDate);
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      day: "numeric",
      month: "long",
    };

    switch (event.frequency) {
      case "weekly": {
        const dayOfWeek = start.toLocaleDateString("en-US", {
          weekday: "long",
        });
        return `Every ${dayOfWeek}`;
      }
      case "monthly": {
        const dayOfMonth = start.toLocaleDateString("en-US", {
          day: "numeric",
        });
        const ordinalIndicator = getOrdinalIndicator(parseInt(dayOfMonth));
        const dayOfWeek = start.toLocaleDateString("en-US", {
          weekday: "long",
        });
        return `Every ${ordinalIndicator} ${dayOfWeek}`;
      }
      case "yearly": {
        const monthOfYear = start.toLocaleDateString("en-US", {
          month: "long",
        });
        return `Every ${monthOfYear}`;
      }
      default:
        return "Not recurring";
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

  return (
    <div>
      <h1>EventManager</h1>
      <IonButton shape="round" color={"light"} routerLink="/event-composer/new">
        Add New Event
      </IonButton>
      <IonGrid>
        <IonRow>
          {GSCEvents &&
            GSCEvents.map((event) => (
              <IonCol
                key={event.title}
                sizeMd="4"
                sizeSm="6"
                sizeXs="12"
                className="ion-padding"
              >
                <IonCard
                  color={"light"}
                  routerLink={`/event-composer/${event.eventId}`}
                >
                  <IonImg src={event.imgUrl}></IonImg>
                  <IonCardHeader>
                    <IonCardTitle>{event.title}</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <p>
                      {event.recurring
                        ? `Recurring: ${getRecurringValue(event.start, event)}`
                        : getEventTimeData(event)}
                    </p>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            ))}
        </IonRow>
      </IonGrid>
    </div>
  );
};

export default EventManager;
