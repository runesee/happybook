import { db, storage } from "../firebaseSrc/firebase-config";
import React, { useState, useEffect, useRef} from "react";
import { collection, doc, setDoc, getDoc } from "@firebase/firestore";

//Returns a list with all values  in the book, where index 0 = author, 1 = criticRating, 2 = description, 3 = genre, 4 = name, 5 = releaseYear and 6 = imageUrl.
export default async function getBook(title, author) {
    title = decodeURIComponent(title);
    author = decodeURIComponent(author);

    let id = String(title) + " : " + String(author);
        const docRef = doc(db, "books", id);
        const docSnap = await getDoc(docRef);
        const data = docSnap.data();
        if (docSnap.exists()) {
            console.log("Bok er tatt imot");
            let returnList = [JSON.stringify(data.author), JSON.stringify(data.criticRating), JSON.stringify(data.description), JSON.stringify(data.genre), JSON.stringify(data.name), JSON.stringify(data.releaseYear), JSON.stringify(data.imgUrl)];
            return returnList;
        }
    console.log("Det har oppstått et problem")
    return null
}