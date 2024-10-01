import { db, storage } from "../firebaseSrc/firebase-config";
import React, { useState, useEffect, useRef} from "react";
import { collection, doc, setDoc, getDoc, getDocs, where, limit, query } from "@firebase/firestore";

export default async function getBooksByFirstLetter(inputChar) {
    let books = [];
    var lower =  inputChar.toUpperCase();
    var upper = String.fromCharCode(lower.charCodeAt(0) + 1);
    const q = query(collection(db, "books"), where("name", ">=", lower), where("name", "<", upper), limit(10));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        let nameNew = String(doc.data().name);
        let author = String(doc.data().author);
        books.push(
          nameNew
        );
    });
    return books;
}
