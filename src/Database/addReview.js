import { db, storage } from "../firebaseSrc/firebase-config";
import React, { useState, useEffect, useRef} from "react";
import { collection, doc, setDoc, getDoc } from "@firebase/firestore";

//Adds review to database
export default async function addReview(title, author, userRating,titleReview, userReview, userName, reviewID) {
    let id = String(title) + " : " + String(author);
    await setDoc(doc(db, "books/" + id + "/reviews", reviewID), {
        title: titleReview,
        rating: userRating,
        reviewText: userReview,
        user: userName,
    });
}