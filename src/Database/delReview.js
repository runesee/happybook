import { db, storage } from "../firebaseSrc/firebase-config";
import React, { useState, useEffect, useRef} from "react";
import { collection, doc, setDoc, getDoc, deleteDoc } from "@firebase/firestore";

//if book added return true, else if error return false 
export default async function delReview(title, author, reviewID) {
    let id = String(title) + " : " + String(author);
    await deleteDoc(doc(db, "books/" + id + "/review", reviewID)).catch((error) => console.log(error));
}