import { db } from "../firebaseSrc/firebase-config";
import { collection, getDocs, limit, where, query } from "@firebase/firestore";

export default async function getBooksWithFilter(genre) {
  let books = [];
  const q = query(collection(db, "books"), where("genre", "==", genre));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => { // doc.data() is never undefined for query doc snapshots
    let data = doc.data();
    let nameNew = String(doc.data().name);
    let author = String(doc.data().author);
    let returnList = [JSON.stringify(data.author), JSON.stringify(data.name),  JSON.stringify(data.imgUrl)];
    books.push(
      returnList
    );
  });  
  return books;
}