import { db, storage } from "../firebaseSrc/firebase-config";
import React, { useState, useEffect, useRef} from "react";
import { collection, doc, setDoc, getDoc } from "@firebase/firestore";

//Returns a list with all values  in the book, where index 0 = author, 1 = criticRating, 2 = description, 3 = genre, 4 = name, 5 = releaseYear and 6 = imageUrl.
export default async function isAdmin(userMail) {
        const docRef = doc(db, "Users", userMail);
        const docSnap = await getDoc(docRef);
        const data = docSnap.data();
        if (docSnap.exists()) {
            return [data.isAdmin];
        }
    console.log("Det har oppstått et problem")
    return false;
}