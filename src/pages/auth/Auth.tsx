import React, { useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import {
  IonButton,
  IonCol,
  IonGrid,
  IonInput,
  IonItem,
  IonList,
  IonPage,
  IonRow,
} from "@ionic/react";
import TopMenu from "../../components/TopMenu";
import { useForm } from "react-hook-form";
import { useGlobalAuth } from "../../AuthContext";
import { useHistory } from "react-router";

const Auth = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { user, signIn } = useGlobalAuth() ?? { user: null };
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  if (user) {
    if (user.email === "admin@gscengland.org") {
      history.push("/admin");
    }
  }

  const onSignin = async (data: any) => {
    setLoading(true);
    console.log(data);
    const email = data.email;
    const password = data.password;
    await signIn?.(email, password);
    setLoading(false);
  };

  useEffect(() => {
    const checkUser = () => {
      if (user) {
        if (user.email === "admin@gscengland.org") {
          history.push("/admin");
        }
      }
    };

    return () => {
      checkUser();
    };
  }, [user]);

  return (
    <IonPage>
      <TopMenu />
      <IonGrid className="full-width hvc text-center">
        <IonRow>
          <IonCol sizeSm="10" sizeMd="6" sizeXl="4" className="m-auto">
            <h1>Admin Login</h1>
            <form onSubmit={handleSubmit(onSignin)}>
              <IonList>
                <IonItem>
                  <IonInput
                    label="Email"
                    labelPlacement="floating"
                    {...register("email", { required: true })}
                  />
                </IonItem>
                {errors.email && <span>Email is required</span>}

                <IonItem>
                  <IonInput
                    label="Password"
                    labelPlacement="floating"
                    type="password"
                    {...register("password", { required: true })}
                  />
                </IonItem>
                {errors.password && (
                  <>
                    <span>Password is required</span> <br />
                  </>
                )}

                <IonButton
                  type="submit"
                  shape="round"
                  fill="outline"
                  color={"dark"}
                  disabled={loading}
                >
                  Sign In
                </IonButton>
              </IonList>
            </form>
          </IonCol>
        </IonRow>
      </IonGrid>
      Auth
    </IonPage>
  );
};

export default Auth;
