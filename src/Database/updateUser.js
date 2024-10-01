import { db, storage } from "../firebaseSrc/firebase-config";
import React, { useState, useEffect, useRef} from "react";
import { useAuthState } from 'react-firebase-hooks/auth';
import { collection, doc, setDoc, getDoc } from "@firebase/firestore";

export default async function updateUser(email, bookID) {

    const docRef = doc(db, "Users", email);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data();
    if (!docSnap.exists()) {
        alert("No users registered!");
        return;
    }
    let WantToReadData = data.WantToRead;
    let ReadData = data.Read;
    console.log(WantToReadData);

    /*await setDoc(doc(db, "Users", email), {
        WantToRead: WantToRead,
        Read: Read
    });*/
}