import { db, storage } from "../firebaseSrc/firebase-config";
import { useState, useEffect, useRef} from "react";
import { collection, doc, setDoc, getDoc, getDocs, getDocsFromCache } from "@firebase/firestore";
import { letterSpacing } from '@mui/system';
import { query, orderBy, limit } from "firebase/firestore"; 

//Used to retrieve the books a user has read
export default async function getReadBooks(email) {
    let books = [];
    let bookRef = collection(db, "Users/" + email + "/ReadBooks");
    const q = query(bookRef, orderBy("name", "desc"), limit(100));
    let querySnapshot;
    querySnapshot = await getDocs(q);
    // First try getting document from cache
    /*try {
        querySnapshot = await getDocsFromCache(q);
        alert("cache");
    }
    catch {
       
        alert("server");
    }*/
    querySnapshot.forEach((doc) => { // doc.data() is never undefined for query doc snapshots
      let title = String(doc.data().name);
      let author = String(doc.data().author);
      books.push(
        title + " : " + author
      );
    });
    return books;
}
