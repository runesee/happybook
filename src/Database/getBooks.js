import { db, storage } from "../firebaseSrc/firebase-config";
import { useState, useEffect, useRef} from "react";
import { collection, doc, setDoc, getDoc, getDocs } from "@firebase/firestore";
import { letterSpacing } from '@mui/system';



  // Poll database once for books:
  /*useEffect(()=>{
    
    alert("");
  }, []) // <-- empty dependency array*/
 
  //Gets multiple books and corrisponding data from database
export default async function getBooks() {
    let topBooks = [];
    const querySnapshot = await getDocs(collection(db, "books"));
    querySnapshot.forEach((doc) => { // doc.data() is never undefined for query doc snapshots
      let nameNew = String(doc.data().name);
      let author = String(doc.data().author);
      let genre =String(doc.data().genre);
      topBooks.push(
        nameNew
      );
    });
    //console.log(topBooks);
    return topBooks;
}
