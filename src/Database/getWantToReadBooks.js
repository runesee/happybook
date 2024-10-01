import { db, storage } from "../firebaseSrc/firebase-config";
import { useState, useEffect, useRef} from "react";
import { collection, doc, setDoc, getDoc, getDocs, getDocsFromCache } from "@firebase/firestore";
import { letterSpacing } from '@mui/system';
import { query, orderBy, limit } from "firebase/firestore"; 

  //Gets the book a user wants to read from database
export default async function getWantToReadBooks(email) {
    let books = [];
    let bookRef = collection(db, "Users/" + email + "/WantToRead");
    const q = query(bookRef, orderBy("name", "desc"), limit(100));
    let querySnapshot;
    querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      let title = String(doc.data().name);
      let author = String(doc.data().author);
      books.push(
        title + " : " + author
      );
    });
    return books;
}
