import {
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { AppPage, GSCEvent, MonthData, SiteLinks } from "./interfaces";
import {
  homeOutline,
  peopleOutline,
  giftOutline,
  heartOutline,
  callOutline,
  lockOpenOutline,
  logoWhatsapp,
  mailOutline,
  personAddOutline,
  calendarOutline,
} from "ionicons/icons";
import mImg from "./assets/img/october.jpg";
import newsletter from "./assets/SEP NEWSLETTER.pdf";
import { collection, doc, getDocs, onSnapshot } from "firebase/firestore";

interface AuthContextValue {
  appPages: AppPage[];
  quickContact: AppPage[];
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  monthImg: string;
  newsletter: string;
  homeSlides: { h1: string; bgImg: string }[];
  currentMessage: string;
  toastMessage: (text: string) => void;
  sitelinks: SiteLinks | undefined;
  monthData: MonthData | undefined;
  GSCEvents: GSCEvent[];
  getGSCEvents: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);
const commonPages = [
  {
    title: "Home",
    url: "/home",
    icon: homeOutline,
  },

  {
    title: "About",
    url: "/about",
    icon: peopleOutline,
    dropdown: [
      { title: "About GSC", url: "/about" },
      { title: "Our Leadership", url: "/about/leader" },
    ],
  },
  {
    title: "Events",
    url: "/events",
    icon: calendarOutline,
  },

  {
    title: "New Members",
    url: "/new-members",
    icon: personAddOutline,
  },

  {
    title: "Contact Us",
    url: "/contact",
    icon: callOutline,
  },
];

export const AuthContextProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}: React.PropsWithChildren<{}>) => {
  const [appVersion, setAppVersion] = useState("1.0.0");
  const [user, setUser] = useState<User | null>(null);
  const [appPages, setAppPages] = useState<AppPage[]>([]);
  const [monthImg, setMonthImg] = useState(mImg);
  const [currentMessage, setCurrentMessage] = useState(
    "Welcome to GSC England"
  );
  const [monthData, setMonthData] = useState<MonthData>();
  const [sitelinks, setSiteinks] = useState<SiteLinks>();
  const quickContact: AppPage[] = [
    {
      title: "Call Now",
      url: "tel:+447448847020",
      icon: callOutline,
    },
    {
      title: "WhatsApp",
      url: "https://wa.me/447448847020",
      icon: logoWhatsapp,
    },
    {
      title: "Email",
      url: "mailto:admin@gscengland.org",
      icon: mailOutline,
    },
  ];
  const [GSCEvents, setGSCEvents] = useState<GSCEvent[]>([]);

  const homeSlides = [{ h1: "Peace", bgImg: "" }];

  const signIn = async (email: string, password: string) => {
    console.log("signing in");
    try {
      const userCredentialData = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const currentUser = userCredentialData.user;
      setUser(currentUser);
      // return currentUser;
    } catch (error) {
      alert(error);
    }
  };

  const getGSCEvents = async () => {
    const querySnapshot = await getDocs(collection(db, "events"));
    let GSCEventTemp: GSCEvent[] = [];
    querySnapshot.forEach((doc) => {
      const event: GSCEvent = doc.data() as GSCEvent;
      GSCEventTemp.push(event);
    });
    setGSCEvents(GSCEventTemp);
  };

  const getSitelinks = async () => {
    const sitelinksColRef = collection(db, "data");
    const sitelinksDocRef = doc(sitelinksColRef, "sitelinks");

    onSnapshot(sitelinksDocRef, (sitelinksdoc) => {
      const sitelinksdata = sitelinksdoc.data() as SiteLinks;
      setSiteinks(sitelinksdata);
    });
  };

  const getMonthData = async () => {
    const monthDataColRef = collection(db, "monthData");
    const currentMonth = new Date().toISOString().slice(0, 7);
    const monthDocRef = doc(monthDataColRef, currentMonth);

    onSnapshot(monthDocRef, (monthdoc) => {
      const monthdata = monthdoc.data() as MonthData;
      setMonthData(monthdata);
      console.log(monthdata);
    });
  };

  const modifyAppPages = () => {
    if (user?.email === "admin@gscengland.org") {
      commonPages.unshift({
        title: "Admin",
        url: "/admin",
        icon: lockOpenOutline,
      });
    } else {
      const adminPageIndex = commonPages.findIndex(
        (page) => page.title === "Admin"
      );
      if (adminPageIndex !== -1) {
        commonPages.splice(adminPageIndex, 1);
      }
    }

    setAppPages(commonPages);
  };

  const signOut = () => {
    auth.signOut();
  };

  const toastMessage = (text: string) => {
    setCurrentMessage(text);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      // console.log(currentUser);
      setUser(currentUser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    getSitelinks();
    getMonthData();
    getGSCEvents();
  }, []);

  useEffect(() => {
    modifyAppPages();
    getSitelinks();
    getMonthData();
    getGSCEvents();
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        appPages,
        signIn,
        signOut,
        quickContact,
        monthImg,
        newsletter,
        homeSlides,
        currentMessage,
        toastMessage,
        sitelinks,
        monthData,
        GSCEvents,
        getGSCEvents,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useGlobalAuth = () => useContext(AuthContext);
