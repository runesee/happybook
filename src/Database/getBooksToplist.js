import { db, storage } from "../firebaseSrc/firebase-config";
import { useState, useEffect, useRef} from "react";
import { collection, doc, setDoc, getDoc, getDocs } from "@firebase/firestore";
import { letterSpacing } from '@mui/system';


  // Poll database once for books:
  /*useEffect(()=>{
    
    alert("");
  }, []) // <-- empty dependency array*/
 
/*export default async function getBooksToplist() {
    let books = [];
    let topBooks = [];
    const querySnapshot = await getDocs(collection(db, "books"));
    querySnapshot.forEach((docs) => { // doc.data() is never undefined for query doc snapshots
      let nameNew = String(docs.data().name);
      let author = String(docs.data().author);
      let id = nameNew + ' : ' + author;
      books.push(
        id
      );
      books.forEach(async bookID => {
        const docRef = doc(db, "books", bookID);
        const docSnap = await getDoc(docRef);
        const data = docSnap.data();

        if (data.criticRating === '5') {
          topBooks.push(
            bookID
          )
        }
      });
    });
    
    return topBooks;
}*/

export default async function getBooksToplist() {
  let books = [];
  let topBooks = [];
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
    if (topBooks.length<10 && data.criticRating === '5') {
      let bookWithImg = [];
      const name = bookID.split(':')[0].trim();
      bookWithImg.push(name);
      bookWithImg.push(data.imgUrl);
      bookWithImg.push(bookID);
      topBooks.push(bookWithImg);
    }
    if (topBooks.length<10 && data.criticRating === '4'){
      let bookWithImg = [];
      const name = bookID.split(':')[0].trim();
      bookWithImg.push(name);
      bookWithImg.push(data.imgUrl);
      bookWithImg.push(bookID);
      topBooks.push(bookWithImg);
    }
  }
  console.log(books)
  console.log(topBooks)
  return topBooks;
}
