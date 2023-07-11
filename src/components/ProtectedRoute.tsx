import React from "react";
import { Redirect } from "react-router";
import { useGlobalAuth } from "../AuthContext";

interface Props {
  children: JSX.Element;
}
const ProtectedRoute = ({ children }: Props) => {
  const { user } = useGlobalAuth() ?? { user: null };
  if (!user) {
    return <Redirect to="/auth" />;
  }
  return children;
};

export default ProtectedRoute;
