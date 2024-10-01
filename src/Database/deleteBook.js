import { db, storage } from "../firebaseSrc/firebase-config";
import React, { useState, useEffect, useRef} from "react";
import { collection, doc, setDoc, getDoc, deleteDoc } from "@firebase/firestore";

//if book added return true, else if error return false
export default async function deleteBook(title, author) {
    let id = String(title) + " : " + String(author);
    await deleteDoc(doc(db, "books", id)).catch((error) => console.log(error));
}