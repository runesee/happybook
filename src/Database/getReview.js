import { db, storage } from "../firebaseSrc/firebase-config";
import { useState, useEffect, useRef} from "react";
import { collection, doc, setDoc, getDoc, getDocs, getDocsFromCache } from "@firebase/firestore";
import { letterSpacing } from '@mui/system';
import { query, orderBy, limit } from "firebase/firestore"; 


export default async function getReview(book, average) {
    let reviews = {
        user: "", 
        title: "", 
        reviewText: "", 
        rating: 0
    };
    let reviewRef = collection(db, "books/" + book + "/reviews");
    const q = query(reviewRef, orderBy("title", "desc"), limit(100));
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
      let user = String(doc.data().user);
      let title = String(doc.data().title);
      let reviewText = String(doc.data().reviewText);
      let rating = String(doc.data().reviewText);

      reviews.user = user;
      reviews.title = title;
      reviews.reviewText = reviewText;
      reviews.rating = rating;

    });
    return reviews;
}   
