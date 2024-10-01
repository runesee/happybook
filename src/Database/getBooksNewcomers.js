import { db, storage } from "../firebaseSrc/firebase-config";
import { useState, useEffect, useRef} from "react";
import { collection, doc, setDoc, getDoc, getDocs } from "@firebase/firestore";
import { letterSpacing } from '@mui/system';


export default async function getBooksNewcomers() {
  let books = [];
  let newcomers = [];
  const querySnapshot = await getDocs(collection(db, "books"));
  for (const doc of querySnapshot.docs) {
    let nameNew = String(doc.data().name);
    let author = String(doc.data().author);
    let id = nameNew + ' : ' + author;
    books.push(id);
  }
  for (const bookID of books) {
    const docRef = doc(db, "books", bookID);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data();
    /*if (topBooks.length<10 && data.criticRating === '5') {
      const name = bookID.split(':')[0].trim();
      topBooks.push(name);
    }*/
    if(data.releaseYear === '2023' && newcomers.length<5){
      let book = [];
      book.push(data.imgUrl)
      book.push(data.name)
      book.push(data.author)
      newcomers.push(book)
    }
  }
  console.log(newcomers)
  return newcomers;
}