import { db, storage } from "../firebaseSrc/firebase-config";
import React, { useState, useEffect, useRef} from "react";
import { collection, doc, setDoc, getDoc } from "@firebase/firestore";

//if book added return true, else if error return false
export default async function addUser(email) {
    await setDoc(doc(db, "Users", email), {
    });
    //collection(db, "Users", email, "WantToRead");
}
    