import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, getDoc } from "@firebase/firestore";
import { db, auth } from "./firebaseSrc/firebase-config";

const ProtectedRouteUser = ({ children }) => {
  const [user, loading, error] = useAuthState(auth);

  //Navigerer til innloggingssiden hvis brukeren ikke er logget inn
  if (!user) {
    alert("Du må være logget inn for å se denne siden")
    return <Navigate to="/loginpage" />;
  }

  return <>{children}</>;




  
};

export default ProtectedRouteUser;
