import "./UserManagement.css";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { auth } from '../firebaseSrc/firebase-config';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import Footer from '../components/Footer';
import "firebase/auth";
import { db, storage } from "../firebaseSrc/firebase-config";
import { useAuthState } from 'react-firebase-hooks/auth';
import { collection, doc, setDoc, getDoc } from "@firebase/firestore";
import getReadBooks from "../Database/getReadBooks";
import getWantToReadBooks from "../Database/getWantToReadBooks";
import LimitedNavbar from "../components/LimitedNavbar";
import deleteBookFromWant from "../Database/deleteBookFromWant";
import deleteBookFromRead from "../Database/deleteBookFromRead";
import { useNavigate } from "react-router-dom";


function MyPage() {

  const navigate = useNavigate();

  /*useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);*/

  const [user, loading, error] = useAuthState(auth);

  let userMail = user?.email;

  async function deleteWant(event) {
    try {
      let id = String(event.target.id);   // Button ID
      let idStrings = id.split(" : ");
      let node = document.getElementById(id + " : Want");   // Get view element by ID
      deleteBookFromWant(userMail, idStrings[0], idStrings[1]);   // Delete from firebase
      document.getElementById("wantToReadBooks").removeChild(node);    // Remove from website view
      alert("Boken " + idStrings[0] + " av " + idStrings[1] + " ble fjernet fra listen!");
      checkIfListsEmpty() // If list empty, display text to let user know
    }
    catch(error) {
      alert("Valgt bok kunne ikke fjernes!");
    }
  }

  async function deleteRead(event) {
    try {
      let id = String(event.target.id);   // Button ID
      let idStrings = id.split(" : ");
      console.log(idStrings);
      let node = document.getElementById(id + " : Read");   // Get view element by ID
      deleteBookFromRead(userMail, idStrings[0], idStrings[1]);   // Delete from firebase
      document.getElementById("readBooks").removeChild(node);    // Remove from website view
      alert("Boken " + idStrings[0] + " av " + idStrings[1] + " ble fjernet fra listen!");
      checkIfListsEmpty() // If list empty, display text to let user know
    }
    catch(error) {
      alert("Valgt bok kunne ikke fjernes!");
    }
  }

  function checkIfListsEmpty() {
    const getBookList = document.getElementById("readBooks");
    const getWantList = document.getElementById("wantToReadBooks");

    if (getBookList.childElementCount < 2) {
      const emptyEl = document.createElement("p");
      emptyEl.className="paragraphColor";
      emptyEl.innerText = "Denne listen er tom. Gå til forsiden for å legge til bøker";
      getBookList.appendChild(emptyEl);
    }
    if (getWantList.childElementCount < 2) {
      const emptyEl = document.createElement("p");
      emptyEl.className="paragraphColor";
      emptyEl.innerText = "Denne listen er tom. Gå til forsiden for å legge til bøker";
      getWantList.appendChild(emptyEl);
    }
  }
  
  useEffect(() => {
    async function funk() {
      const getBookList = document.getElementById("readBooks");
      const getWantList = document.getElementById("wantToReadBooks");
      let bookArray = getReadBooks(userMail);
      await Promise.resolve(bookArray).then((value)=>{
        for(let i = 0; i < value.length; i++) {
          const container = document.createElement('div');
          const titleContainer = document.createElement('div');
          const authorContainer = document.createElement('div');
          container.className = "bookContainers";

          const titleEl = document.createElement('p');
          const authorEl = document.createElement('p');
          const titleTag = document.createElement('b');
          const authorTag = document.createElement('b');
          let id = value[i];
          console.log(value);
          let idStrings = String(id).split(" : ");
          titleTag.innerHTML = "Tittel: ";
          authorTag.innerHTML = "Forfatter: ";
          titleEl.innerText = idStrings[0];
          authorEl.innerText = idStrings[1];

          titleContainer.appendChild(titleTag);
          titleContainer.appendChild(titleEl);
          authorContainer.appendChild(authorTag);
          authorContainer.appendChild(authorEl);
          container.appendChild(titleContainer);
          container.appendChild(authorContainer);

          const buttonChild = document.createElement('button');
          buttonChild.id = idStrings[0] + " : " + idStrings[1];
          buttonChild.innerText = "FJERN BOK FRA LISTE";
          buttonChild.addEventListener('click', (event)=>{
            deleteRead(event);
          })
          container.id = idStrings[0] + " : " + idStrings[1] + " : Read";
          container.appendChild(buttonChild);
          getBookList.appendChild(container);
        }
      })
      let wantArray = getWantToReadBooks(userMail);
      await Promise.resolve(wantArray).then((value2)=>{
        for(let i = 0; i < value2.length; i++) {
          const container = document.createElement('div');
          const titleContainer = document.createElement('div');
          const authorContainer = document.createElement('div');
          container.className = "bookContainers";
          

          const titleEl = document.createElement('p');
          const authorEl = document.createElement('p');
          const titleTag = document.createElement('b');
          const authorTag = document.createElement('b');
          let id = value2[i];
          console.log(value2);
          let idStrings = String(id).split(" : ");
          titleTag.innerHTML = "Tittel: ";
          authorTag.innerHTML = "Forfatter: ";
          titleEl.innerText = idStrings[0];
          authorEl.innerText = idStrings[1];

          titleContainer.appendChild(titleTag);
          titleContainer.appendChild(titleEl);
          authorContainer.appendChild(authorTag);
          authorContainer.appendChild(authorEl);
          container.appendChild(titleContainer);
          container.appendChild(authorContainer);
          
          const buttonChild = document.createElement('button');
          buttonChild.id = idStrings[0] + " : " + idStrings[1];
          buttonChild.innerText = "FJERN BOK FRA LISTE";
          buttonChild.addEventListener('click', (event)=>{
            deleteWant(event);
          })
          container.id = idStrings[0] + " : " + idStrings[1] + " : Want";
          container.appendChild(buttonChild);
          getWantList.appendChild(container);
        }
      })
      // If either of the lists are empty, display text to let user know:
      checkIfListsEmpty()
    }
    funk();

    // Add username to title:
    let mailStrings = userMail.split("@");
    console.log("Her:" + mailStrings[0]);
    document.getElementById("minSideTittel").innerText = "Velkommen til din side, " + mailStrings[0];

  }, []);

  const logout = async () => {
    await signOut(auth);
    alert(user?.email + " er logget ut");
    navigate("/");
  };
  

  return (
    <><main>
        <LimitedNavbar/>
        <div className="myGridContainer">
          <div className="welcome">
            <h1 id="minSideTittel">Min Side</h1>
            </div>
            <div id="readBooks">
              <h2>Bøker du har lest</h2>
            </div>  
          <div id="wantToReadBooks">
            <h2>Bøker du ønsker å lese</h2></div>
        </div>
        <div style={{display: 'flex', justifyContent: 'center'}}>
        <button className = {"adminButtons"} onClick={logout} >Logg ut</button>
        {/*<p> I'm the current user: {userMail} </p>*/}
        </div>
    </main>
    <Footer/></>
  );
}

export default MyPage;
