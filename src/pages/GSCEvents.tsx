import {
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
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
import { calendarOutline } from "ionicons/icons";
import { useGlobalAuth } from "../AuthContext";
import { GSCEvent } from "../interfaces";

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

  const { GSCEvents } = useGlobalAuth() ?? {};

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

  const isEventPast = (dateTimeString: string): boolean => {
    if (dateTimeString === "") {
      return false;
    }
    const today = new Date();
    const inputDateTime = new Date(dateTimeString);

    // Compare the input date and time with today's date and time
    return inputDateTime.getTime() < today.getTime();
  };

  const filterUpcomingEvents = (events: GSCEvent[]): GSCEvent[] => {
    return events.filter((event) => {
      // Check if the event is recurring or passes the reverse condition
      return event.recurring || !isEventPast(event.end);
    });
  };

  const pastEventsFilter = (events: GSCEvent[]): GSCEvent[] => {
    return events.filter((event) => {
      // Check if the event is not recurring and is in the past
      return !event.recurring && isEventPast(event.end);
    });
  };

  return (
    <IonPage>
      <IonContent>
        <TopMenu />
        <PageHeader {...homeHead} />
        <Container className="eventsgrid">
          <IonGrid>
            {GSCEvents && (
              <IonRow>
                {filterUpcomingEvents(GSCEvents).length > 0 && (
                  <IonCol size="12" className="ion-padding-start">
                    <h2> Upcoming Events</h2>
                  </IonCol>
                )}
                {filterUpcomingEvents(GSCEvents).length > 0 &&
                  filterUpcomingEvents(GSCEvents).map((GSCEvent, index) => (
                    <IonCol
                      key={index}
                      sizeXl="4"
                      sizeMd="6"
                      sizeSm="6"
                      sizeXs="12"
                      onClick={() => history.push(`events/${GSCEvent.eventId}`)}
                    >
                      <IonCard>
                        <img
                          src={GSCEvent.imgUrl}
                          alt={`image-${GSCEvent.title}`}
                        />
                        <IonCardHeader>
                          <IonCardSubtitle>
                            {GSCEvent.recurring
                              ? `${getRecurringInfo(GSCEvent.start, GSCEvent)}`
                              : getEventTimeData(GSCEvent)}
                          </IonCardSubtitle>
                          <IonCardTitle>{GSCEvent.title}</IonCardTitle>
                        </IonCardHeader>
                      </IonCard>
                    </IonCol>
                  ))}
                {pastEventsFilter(GSCEvents).length > 0 && (
                  <IonCol size="12" className="ion-padding-start">
                    <h2> Past Events</h2>
                  </IonCol>
                )}
                {pastEventsFilter(GSCEvents).length > 0 &&
                  pastEventsFilter(GSCEvents).map((GSCEvent, index) => (
                    <IonCol
                      key={index}
                      sizeXl="4"
                      sizeMd="6"
                      sizeSm="6"
                      sizeXs="12"
                      onClick={() => history.push(`events/${GSCEvent.eventId}`)}
                    >
                      <IonCard>
                        <img
                          src={GSCEvent.imgUrl}
                          alt={`image-${GSCEvent.title}`}
                        />
                        <IonCardHeader>
                          <IonCardSubtitle>
                            {GSCEvent.recurring
                              ? `${getRecurringInfo(GSCEvent.start, GSCEvent)}`
                              : getEventTimeData(GSCEvent)}
                          </IonCardSubtitle>
                          <IonCardTitle>{GSCEvent.title}</IonCardTitle>
                        </IonCardHeader>
                      </IonCard>
                    </IonCol>
                  ))}
              </IonRow>
            )}
          </IonGrid>
        </Container>
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
                  onClick={() => history.push("/about")}
                >
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
                    key={index}
                  ></IonImg>
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
