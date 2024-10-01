import { db} from "../firebaseSrc/firebase-config";
import { doc, deleteDoc } from "@firebase/firestore";

//if book added return true, else if error return false
export default async function deleteBookFromRead(email, title, author) {
    let bookId = title + " : " + author;
    await deleteDoc(doc(db, "Users/" + email + "/ReadBooks", bookId), {
        name: title,
        author: author,
      }).catch((error) => console.log(error));
}
    