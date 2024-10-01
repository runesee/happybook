import { db } from "../firebaseSrc/firebase-config";
import { doc, setDoc } from "@firebase/firestore";

//if book added return true, else if error return false
export default async function updateUserReadBooks(email, title, author) {
    let bookId = title + " : " + author;
    await setDoc(doc(db, "Users/" + email + "/ReadBooks", bookId), {
        name: title,
        author: author,
      });
}
    