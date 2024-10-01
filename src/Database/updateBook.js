import { db, storage } from "../firebaseSrc/firebase-config";
import React, { useState, useEffect, useRef} from "react";
import { collection, doc, setDoc, getDoc } from "@firebase/firestore";

//if book added return true, else if error return false
export default async function updateBook(title, author, year, genre, description, userRating, criticRating, url) {
    let id = String(title) + " : " + String(author);
    await setDoc(doc(db, "books", id), {
        author: author,
        name: title,
        genre: genre,
        releaseYear: year,
        description: description,
        userRating: userRating,
        criticRating: criticRating,
        imgUrl: url,
      });
}
    