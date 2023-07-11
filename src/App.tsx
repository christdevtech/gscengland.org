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
import About from "./pages/About";
import Give from "./pages/Give";
import OurLeader from "./pages/OurLeader";
import Contact from "./pages/Contact";
import Auth from "./pages/auth/Auth";
import { AuthContextProvider } from "./AuthContext";
import Admin from "./pages/auth/Admin";
import ProtectedRoute from "./components/ProtectedRoute";

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
                <Home />
              </Route>
              <Route path="/about" exact={true}>
                <About />
              </Route>
              <Route path="/give" exact={true}>
                <Give />
              </Route>
              <Route path="/leader" exact={true}>
                <OurLeader />
              </Route>
              <Route path="/contact" exact={true}>
                <Contact />
              </Route>
              <Route path="/auth" exact={true}>
                <Auth />
              </Route>

              <ProtectedRoute>
                <Route path="/admin" exact={true}>
                  <Admin />
                </Route>
              </ProtectedRoute>
            </IonRouterOutlet>
          </IonSplitPane>
        </IonReactRouter>
      </IonApp>
    </AuthContextProvider>
  );
};

export default App;
