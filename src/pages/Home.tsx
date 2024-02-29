import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonRow,
} from "@ionic/react";
import React from "react";
import TopMenu from "../components/TopMenu";
import { cardData, cardData1 } from "../assets/data/Slide";
import { useHistory } from "react-router";
import { useGlobalAuth } from "../AuthContext";
import Container from "../components/Container";
import Footer from "../components/Footer";
import headerImg from "../assets/img/hero1.jpg";
import PageHeader, { PageHeroHeaderProps } from "../components/PageHeader";
import oneImg from "../assets/img/community.jpg";
import {
  homeOutline,
  timeOutline,
  phonePortrait,
  logoWhatsapp,
} from "ionicons/icons";

const homeHead: PageHeroHeaderProps = {
  title: ["Peace", "Joy"],
  button: { text: "Visit Us", url: "/contact" },
  bgImg: headerImg,
  home: true,
};

const Home = () => {
  const history = useHistory();
  const openPage = (url: string) => {
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

  const { sitelinks, monthData } = useGlobalAuth() ?? {
    appVersion: "Error",
    newsletter: "",
  };

  const contact = (link: string) => {
    window.open(link, "_blank", "noreferrer");
  };

  //download newsletter
  const downloadNewsLetter = (url: string, name: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.target = "_blank";
    link.download = name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getMonthInUppercase = (dateString: string): string => {
    const monthNumber = new Date(dateString).getMonth();
    const months = [
      "JANUARY",
      "FEBRUARY",
      "MARCH",
      "APRIL",
      "MAY",
      "JUNE",
      "JULY",
      "AUGUST",
      "SEPTEMBER",
      "OCTOBER",
      "NOVEMBER",
      "DECEMBER",
    ];
    return months[monthNumber];
  };

  return (
    <IonPage>
      <IonContent>
        <TopMenu />
        <PageHeader {...homeHead} />
        <Container className="welcome copyable">
          <IonGrid>
            <IonRow className="ion-align-items-center">
              <IonCol size="6" sizeXs="12" sizeSm="12" sizeMd="12" sizeLg="6">
                <h2>Gateway Salvation Church.</h2>
                <p>
                  We are glad you are here. We pray that your visit to our
                  church will be a meaningful one, and that you will experience
                  the love and fellowship of our community. We hope you will
                  enjoy our worship services, where we encounter God through His
                  Word, praise, and prayer.
                </p>
                <p>
                  We would love to get to know you better. Please feel free to
                  introduce yourself to one of our ushers or pastors. We would
                  also be happy to answer any questions you have about our
                  church or our faith.
                </p>
                <p>We hope to see you again soon!</p>
                <IonButton
                  color={"dark"}
                  size="large"
                  onClick={() => history.push("/about")}
                >
                  KNOW MORE
                </IonButton>
              </IonCol>
              <IonCol size="6" sizeXs="12" sizeSm="12" sizeMd="12" sizeLg="6">
                <IonImg src={oneImg}></IonImg>
              </IonCol>
            </IonRow>
          </IonGrid>
        </Container>

        <Container className="cards">
          <IonGrid>
            <IonRow>
              {cardData.map((card, index) => (
                <IonCol
                  key={index}
                  sizeXl="3"
                  sizeMd="6"
                  sizeXs="12"
                  onClick={() => openPage(card.url)}
                >
                  <div
                    className="card ion-padding ion-margin animate__animated animate__fadeInUp"
                    style={{
                      background: `url("${card.bg}")`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    <h3>{card.headline}</h3>
                  </div>
                </IonCol>
              ))}
            </IonRow>
          </IonGrid>
        </Container>

        {monthData && (
          <Container className="month">
            <IonGrid>
              <IonRow>
                <IonCol
                  size="6"
                  sizeXs="12"
                  sizeSm="12"
                  sizeMd="12"
                  sizeLg="6"
                  sizeXl="6"
                >
                  <img src={monthData.imgUrl} width={"100%"} />
                </IonCol>
                <IonCol
                  size="6"
                  sizeXs="12"
                  sizeSm="12"
                  sizeMd="12"
                  sizeLg="6"
                  sizeXl="6"
                >
                  <div className="monthContent">
                    <h2>{getMonthInUppercase(monthData.month)}</h2>
                    <bible>
                      <span
                        dangerouslySetInnerHTML={{
                          __html: monthData.bible,
                        }}
                      ></span>
                    </bible>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: monthData.monthWriteup,
                      }}
                    ></p>
                    {monthData.newsletter && (
                      <IonButton
                        onClick={() =>
                          downloadNewsLetter(
                            monthData.newsletter,
                            `The ${monthData.month} newsletter`
                          )
                        }
                      >
                        Read the {getMonthInUppercase(monthData.month)}{" "}
                        NewsLetter
                      </IonButton>
                    )}
                  </div>
                </IonCol>
              </IonRow>
            </IonGrid>
          </Container>
        )}

        <Container className="cards">
          <IonGrid>
            <IonRow>
              {cardData1.map((card, index) => (
                <IonCol
                  key={index}
                  sizeXl="3"
                  sizeMd="6"
                  sizeXs="12"
                  onClick={() => openPage(card.url)}
                >
                  <div
                    className="card ion-padding ion-margin animate__animated animate__fadeInUp"
                    style={{
                      background: `url("${card.bg}")`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    <h3>{card.headline}</h3>
                  </div>
                </IonCol>
              ))}
            </IonRow>
          </IonGrid>
        </Container>

        <Container className="month">
          <IonGrid className="contact-page">
            <IonRow>
              <IonCol
                className="ion-padding contactDetails"
                sizeXs="12"
                sizeSm="12"
                sizeMd="6"
                size="6"
              >
                <div>
                  <h2 style={{ fontSize: "4em", fontWeight: "900" }}>
                    Find Us
                  </h2>

                  <p>
                    Our aspiration is for Gateway Salvation Church to serve as a
                    secure and inviting space where you can freely pose
                    difficult inquiries and discover a community that stands by
                    you through life's most testing periods.
                  </p>
                </div>
                {sitelinks && (
                  <IonList>
                    <IonItem
                      onClick={() =>
                        contact("https://goo.gl/maps/kf9bMnBTz3k5ScnJA")
                      }
                      detail
                      lines="none"
                      color={"light"}
                    >
                      <IonIcon slot="start" icon={homeOutline}></IonIcon>
                      <div className="detail">
                        <h3>Location</h3>
                        <p
                          dangerouslySetInnerHTML={{
                            __html: sitelinks.address,
                          }}
                        ></p>
                      </div>
                    </IonItem>
                    <IonItem lines="none" color={"light"}>
                      <IonIcon slot="start" icon={timeOutline}></IonIcon>
                      <div className="detail">
                        <h3>Service Times</h3>
                        <p>
                          Sunday: {sitelinks.serviceTime}
                          <br />
                          Thursday: {sitelinks.thursdayService}
                        </p>
                      </div>
                      <IonLabel></IonLabel>
                    </IonItem>
                    <IonItem
                      onClick={() => contact(`tel:${sitelinks.phone}`)}
                      detail
                      lines="none"
                      color={"light"}
                    >
                      <IonIcon slot="start" icon={phonePortrait}></IonIcon>
                      <div className="detail">
                        <h3>Call Us</h3>
                        <p
                          dangerouslySetInnerHTML={{
                            __html: sitelinks.phone,
                          }}
                        ></p>
                      </div>
                      <IonLabel></IonLabel>
                    </IonItem>

                    <IonItem
                      color={"light"}
                      onClick={() => contact(sitelinks.waMe)}
                      detail
                      lines="none"
                    >
                      <IonIcon slot="start" icon={logoWhatsapp}></IonIcon>
                      <div className="detail">
                        <h3>WhatsApp</h3>
                        <p>Click to start WhatsApp Chat</p>
                      </div>
                    </IonItem>
                  </IonList>
                )}
              </IonCol>
              <IonCol className="map">
                <iframe
                  src={sitelinks?.mapEmbed}
                  width="100%"
                  height={"100%"}
                  style={{ border: "none" }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </IonCol>
            </IonRow>
            <IonRow className="ion-padding-top ion-margin-top">
              <IonCol>
                <div
                  className="homeVideo"
                  style={{
                    position: "relative",
                    borderRadius: "1em",
                    paddingBottom: "56.25%",
                    overflow: "hidden",
                    aspectRatio: "315 / 560",
                    background: "var(--ion-color-light)",
                  }}
                >
                  <iframe
                    src="https://www.youtube.com/embed/Ba23BvSRM60?showinfo=0&autoplay=0&mute=1&vq=hd720&rel=0&loop=1"
                    frameBorder={0}
                    style={{
                      position: "absolute",
                      top: "0",
                      left: "0",
                      width: "100%",
                      height: "100%",
                    }}
                    allowFullScreen
                    allow="encrypted-media"
                  ></iframe>
                </div>
              </IonCol>
              <IonCol>
                {" "}
                <div
                  className="homeVideo"
                  style={{
                    position: "relative",
                    borderRadius: "1em",
                    paddingBottom: "56.25%",
                    overflow: "hidden",
                    aspectRatio: "315 / 560",
                    background: "var(--ion-color-light)",
                  }}
                >
                  <iframe
                    src="https://www.youtube.com/embed/2J93tmVy0ow?showinfo=0&autoplay=0&mute=1&vq=hd720&rel=0&loop=1"
                    frameBorder={0}
                    style={{
                      position: "absolute",
                      top: "0",
                      left: "0",
                      width: "100%",
                      height: "100%",
                    }}
                    allowFullScreen
                    allow="encrypted-media"
                  ></iframe>
                </div>
              </IonCol>
              <IonCol>
                {" "}
                <div
                  className="homeVideo"
                  style={{
                    position: "relative",
                    borderRadius: "1em",
                    paddingBottom: "56.25%",
                    overflow: "hidden",
                    aspectRatio: "315 / 560",
                    background: "var(--ion-color-light)",
                  }}
                >
                  <iframe
                    src="https://www.youtube.com/embed/Xm0BtO5kEWE?showinfo=0&autoplay=0&mute=1&vq=hd720&rel=0&loop=1"
                    frameBorder={0}
                    style={{
                      position: "absolute",
                      top: "0",
                      left: "0",
                      width: "100%",
                      height: "100%",
                    }}
                    allowFullScreen
                    allow="encrypted-media"
                  ></iframe>
                </div>
              </IonCol>
            </IonRow>
          </IonGrid>
        </Container>
        <Footer />
      </IonContent>
    </IonPage>
  );
};

export default Home;
