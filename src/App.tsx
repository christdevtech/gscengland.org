import {
  IonApp,
  IonRouterOutlet,
  IonSplitPane,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";
import Menu from "./components/Menu";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import "./scss/global.scss";
import Home from "./pages/Home";
import About from "./pages/about/About";
import Give from "./pages/Give";
import OurLeader from "./pages/about/OurLeader";
import Contact from "./pages/Contact";
import Auth from "./pages/auth/Auth";
import { AuthContextProvider } from "./AuthContext";
import Admin from "./pages/auth/Admin";
import ProtectedRoute from "./components/ProtectedRoute";
import Salvation from "./pages/Salvation";
import NewMembers from "./pages/NewMembers";
import GSCEvents from "./pages/GSCEvents";
import Beliefs from "./pages/about/Beliefs";
import Vision from "./pages/about/Vision";
import Dashboard from "./pages/auth/Dashboard";
import TestPage from "./pages/TestPage";
import GSCEvent from "./pages/GSCEvent";
import EventComposer from "./pages/auth/EventComposer";

setupIonicReact();

const App: React.FC = () => {
  return (
    <AuthContextProvider>
      <IonApp>
        <IonReactRouter>
          <IonSplitPane contentId="main" disabled>
            <Menu />
            <IonRouterOutlet id="main">
              <Route path="/" exact={true}>
                <Redirect to={"/home"} />
              </Route>
              <Route path="/home" exact={true}>
                <Home />
              </Route>
              <Route path="/about" exact={true}>
                <About />
              </Route>
              <Route path="/about/leader" exact={true}>
                <OurLeader />
              </Route>
              <Route path="/about/vision" exact={true}>
                <Vision />
              </Route>
              <Route path="/about/belief" exact={true}>
                <Beliefs />
              </Route>
              <Route path="/give" exact={true}>
                <Give />
              </Route>

              <Route path="/contact" exact={true}>
                <Contact />
              </Route>
              <Route path="/auth" exact={true}>
                <Auth />
              </Route>
              <Route path="/new-members" exact={true}>
                <NewMembers />
              </Route>

              <Route path="/events" exact={true}>
                <GSCEvents />
              </Route>
              <Route path="/event-composer/:eventId" exact={true}>
                <EventComposer />
              </Route>

              <Route path={"/events/:eventId"} exact={true}>
                <GSCEvent />
              </Route>

              <Route path="/salvation" exact={true}>
                <Salvation />
              </Route>

              <ProtectedRoute>
                <Route path="/admin" exact={true}>
                  <Dashboard />
                </Route>
              </ProtectedRoute>

              <Route path={"/test"}>
                <TestPage />
              </Route>

              {/* <ProtectedRoute>
                <Route path="/admin" exact={true} render={() => <Admin />} />
              </ProtectedRoute> */}
            </IonRouterOutlet>
          </IonSplitPane>
        </IonReactRouter>
      </IonApp>
    </AuthContextProvider>
  );
};

export default App;
