import {
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "./firebase";
import { AppPage } from "./interfaces";
import {
  homeOutline,
  peopleOutline,
  giftOutline,
  heartOutline,
  callOutline,
  lockOpenOutline,
  logoWhatsapp,
  mailOutline,
} from "ionicons/icons";
interface AuthContextValue {
  appPages: AppPage[];
  quickContact: AppPage[];
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthContextProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}: React.PropsWithChildren<{}>) => {
  const [user, setUser] = useState<User | null>(null);
  const [appPages, setAppPages] = useState<AppPage[]>([
    {
      title: "Home",
      url: "/",
      icon: homeOutline,
    },

    {
      title: "About",
      url: "/about",
      icon: peopleOutline,
    },
    {
      title: "Give",
      url: "/give",
      icon: giftOutline,
    },
    {
      title: "Our Leader",
      url: "/leader",
      icon: heartOutline,
    },
    {
      title: "Contact Us",
      url: "/contact",
      icon: callOutline,
    },
  ]);
  const [quickContact, setQuickContact] = useState<AppPage[]>([
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
  ]);

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

  const modifyAppPages = () => {
    if (user?.email === "admin@gscengland.org") {
      setAppPages([
        {
          title: "Admin",
          url: "/admin",
          icon: lockOpenOutline,
        },
        {
          title: "Home",
          url: "/",
          icon: homeOutline,
        },

        {
          title: "About",
          url: "/about",
          icon: peopleOutline,
        },
        {
          title: "Give",
          url: "/give",
          icon: giftOutline,
        },
        {
          title: "Our Leader",
          url: "/leader",
          icon: heartOutline,
        },
        {
          title: "Contact Us",
          url: "/contact",
          icon: callOutline,
        },
      ]);
    } else {
      setAppPages([
        {
          title: "Home",
          url: "/",
          icon: homeOutline,
        },

        {
          title: "About",
          url: "/about",
          icon: peopleOutline,
        },
        {
          title: "Give",
          url: "/give",
          icon: giftOutline,
        },
        {
          title: "Our Leader",
          url: "/leader",
          icon: heartOutline,
        },
        {
          title: "Contact Us",
          url: "/contact",
          icon: callOutline,
        },
      ]);
    }
  };

  const signOut = () => {
    auth.signOut();
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log(currentUser);
      setUser(currentUser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    modifyAppPages();
  }, [user]);

  return (
    <AuthContext.Provider
      value={{ user, appPages, signIn, signOut, quickContact }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useGlobalAuth = () => useContext(AuthContext);
