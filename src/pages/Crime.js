import React from 'react';
import "./SortingPages.css";
import GetBooks from "../Database/getBooks";
import LimitedNavbar from '../components/LimitedNavbar';
import Footer from '../components/Footer';
import { db, storage } from "../firebaseSrc/firebase-config";
import { useState, useEffect, useRef} from "react";
import { doc, setDoc, getDoc, getDocsFromCache } from "@firebase/firestore";
import { letterSpacing } from '@mui/system';
import {collection, getFirestore, getDocs, limit, orderBy, query, where} from 'firebase/firestore';


function Crime() {

  function createBookViewElement(title, author, img) {
  
    const node = document.querySelector(".genreView");
    const titleChild = document.createElement('h3');
    const imgChild = document.createElement('img');
    const authorChild = document.createElement('p');
    const bookDiv = document.createElement('div');
    //const buttonChild = document.createElement('button');
    bookDiv.className = "outerDiv";
    imgChild.className="genreImg";
    //buttonChild.id = title + " : " + author;
    imgChild.src = img;
    imgChild.id = title + ";" + author;
    imgChild.addEventListener('click', (event)=>{
      window.location.href = `/books/:` + event.target.id;
    })
    titleChild.innerText = title;
    authorChild.innerText = author;
    bookDiv.appendChild(titleChild);
    bookDiv.appendChild(authorChild);
    bookDiv.appendChild(imgChild);
    node.appendChild(bookDiv);
  }
      useEffect(()=>{
        async function fetch() {
          //let tally = 1;
          const querySnapshot = await getDocs(collection(db, "books"));
          let counter = 0;
          querySnapshot.forEach((doc) => { // doc.data() is never undefined for query doc snapshots
            if (String(doc.data().genre) === 'Krim') {
              counter++;
              console.log(String(doc.data().genre));
              createBookViewElement(String(doc.data().name), String(doc.data().author), String(doc.data().imgUrl));
            };
            
          });
          if (counter == 0) {
            const noBooks = document.createElement("p");
            noBooks.innerText = "Det er ingen krimbøker tilgjengelig";
            document.querySelector(".genreView").appendChild(noBooks);
          }
        }
        fetch();
      }, [])
  return (
    <><LimitedNavbar />
    <h1>Krim</h1>
    <div className="genreView">
          </div>
    <Footer/>
    </>

  )
}

export default Crime