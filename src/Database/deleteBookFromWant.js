import { db} from "../firebaseSrc/firebase-config";
import { doc, setDoc, deleteDoc } from "@firebase/firestore";

//if book added return true, else if error return false
export default async function deleteBookFromWant(email, title, author) {
    let bookId = title + " : " + author;
    await deleteDoc(doc(db, "Users/" + email + "/WantToRead", bookId), {
        name: title,
        author: author,
      }).catch((error) => console.log(error));
}
    