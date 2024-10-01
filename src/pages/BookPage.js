import "./bookPage.css";
import React, { useEffect, useState, useRef  } from "react";

import "firebase/auth";
import { auth,db } from '../firebaseSrc/firebase-config';
import { useAuthState} from 'react-firebase-hooks/auth';
import { collection, getDocs } from "@firebase/firestore";

import AddIcon from "@mui/icons-material/Add";
import DoneIcon from "@mui/icons-material/Done";
import { Rating } from '@mui/material';
import { borderTop } from '@mui/system';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";

import getBook from '../Database/getBook';
import updateUserReadBooks from '../Database/updateUserReadBooks';
import updateUserWantToRead from '../Database/updateUserWantToRead';
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import addReview from "../Database/addReview";
import delReview from "../Database/delReview";
import isAdmin from "../Database/isAdmin";

export default function BookPage() {

  const [imageSource, setImageSource] = useState("");
  const [nameFromUseEffect, setName] = useState("");
  const [authorFromUseEffect, setAuthor] = useState("");
  const [ratingValue, setRatingValue] = useState(0);

  //CurrentBook and current rating which shall be used on the info and ratings.
  const [currentBook, setCurrentBook] = useState([]);
  const [averageRating, setAverageRating] = useState("");
  const [reviewCount, setReviewCount] = useState(0);

  //Usestate for title and text, 
  const [titleReview, setTitleReview] = useState("");
  const [textReview, setTextReview] = useState("");
  const [ratingReview, setRatingReview] = useState("");
  let titleReviewRef = useRef('');
  let textReviewRef = useRef('');

  //

/*  Henter forfatter og tittel fra url, og henter boka gitt disse
 Legger til informasjon om boka, bilde o.l. gitt hentet data. */
  useEffect(() => {
    async function funk() {
      let valueStrings = String(window.location.href).split(":");
      valueStrings = valueStrings[3];
      let idStrings = valueStrings.split(";");
      let name = idStrings[0];
      let author = idStrings[1];
      name = decodeURIComponent(name);
      author = decodeURIComponent(author);

      // Sjekker om name og forfatter inneholder mellomrom:
      if (name.includes("%20")) {
        let nameStrings = name.split("%20");
        name = "";
        nameStrings.forEach(element => {
          name += element;
          name += " ";
        });
        name = name.substring(0, name.length-1);
      }
      setName(name);
      if (author.includes("%20")) {
        let authorStrings = author.split("%20");
        author = "";
        authorStrings.forEach(element => {
          author += element;
          author += " ";
        });
        author = author.substring(0, author.length-1);
      }
      setAuthor(author)

      console.log(name);
      console.log(author)
      let bookArray = await getBook(name, author);
      setCurrentBook(bookArray);
      console.log(bookArray[6]);

      try {
        let descEl = document.getElementById("descriptionBox");
        let authorEl = document.getElementById("bookAuthor");
        let titleEl = document.getElementById("bookTitle");
        let genreEl = document.getElementById("bookGenre");
        let releaseEl =  document.getElementById("bookReleaseYear");
        authorEl.innerText += " " + author;
        titleEl.innerText = name;
        descEl.innerText = String(bookArray[2]).replace(/['"]+/g, '');
        genreEl.innerText += " " + String(bookArray[3]).replace(/['"]+/g, '');
        releaseEl.innerText += " " + String(bookArray[5]).replace(/['"]+/g, '');

        setImageSource(String(bookArray[6]).replace(/['"]+/g, ''))
        console.log(parseInt(String(bookArray[1]).replace(/['"]+/g, '')));
        setRatingValue(parseInt(String(bookArray[1]).replace(/['"]+/g, '')));
      }
      catch(error) {}


    };
    funk();
  }, [window.location.href]);

  useEffect(() => {
    async function fetch() {
      //let tally = 1;
      let tally = 0;  
      let total = 0;
      console.log("Does it run?");
      console.log(String(currentBook[4]).replace(/['"]+/g, ''));
      const querySnapshot = await getDocs(collection(db, "books/" + String(currentBook[4]).
      replace(/['"]+/g, '') + " : "+ currentBook[0].replace(/['"]+/g, '') + "/reviews"));
      querySnapshot.forEach((doc) => { // doc.data() is never undefined for query doc snapshots
        createReviewElement(String(doc.data().user), String(doc.data().title), String(doc.data().reviewText), String(doc.data().rating));
        total += parseInt(String(doc.data().rating).replace(/['"]+/g, ''));
        tally += 1;
      });
      setAverageRating(Math.round((total/tally)*2)/2);
      console.log(averageRating);
      setReviewCount(tally);
    };
    fetch();
  }, [currentBook]);

  const [user, loading, error] = useAuthState(auth);
  let userMail = user?.email;
  //Function for handling the books a user has read
  function handleRead() {
      if (userMail == null || userMail == "undefined") {
        alert("Du må være innlogget for å kunne legge til bøker i din liste!");
        return;
      }
      // May need to be changed to accomodate for "Forfatter: " in element:
      updateUserReadBooks(userMail, nameFromUseEffect, authorFromUseEffect);
      alert("Boka '" + nameFromUseEffect + "' av " + authorFromUseEffect + " har blitt lagret på din side under 'Bøker du har lest'");
   
  }
  //Function for handling the books a user wants to read
  function handleWantToRead() {
    if (userMail == null || userMail == "undefined") {
      alert("Du må være innlogget for å kunne legge til bøker i din liste!");
      return;
    }
    // May need to be changed to accomodate for "Forfatter: " in element:
    updateUserWantToRead(userMail, nameFromUseEffect, authorFromUseEffect);
    alert("Boka '" + nameFromUseEffect + "' av " + authorFromUseEffect + " har blitt lagret på din side under 'Bøker du ønsker å lese'!");
 
  }

  //REVIEW PART:

  //add review to Database
  async function addReviewToDB() {
    try {
      addReview(String(currentBook[4]).replace(/['"]+/g, ''), String(currentBook[0]).replace(/['"]+/g, ''),
       ratingReview, titleReview, textReview, userMail, userMail + " " + titleReview);
       alert("Your review: " + titleReview + " on " + String(currentBook[4]) + "has been added.");
    }
    catch(error) {
      alert("Could not add review");
    }
  }
    
  //removes review from Database, and also from the website
  function deleteReview(selUser, selTitle) {
    try {
      delReview(String(currentBook[4]).replace(/['"]+/g, ''),String(currentBook[0]).replace(/['"]+/g, ''), selUser + " " + selTitle);
      alert("Anmeldelsen: " + selTitle + " av " + selUser + " har blitt fjernet.");
    }
    catch(error) {alert("Kunne ikke slette anmeldelse")}
  }
  //edit review in Database, aswell as on the website
  //function editReview(event) {
  //
  //}

  //Creates a review element to be added to Book pages
  function createReviewElement(user, title, review, rating) {
    const node = document.querySelector(".showReview");
    const titleChild = document.createElement('h5');
    const userChild = document.createElement('h6');
    const reviewChild = document.createElement('p');
    const ratingChild = document.createElement('rating');
    const copy = node.cloneNode(true);   // copy of original div

    copy.id = title + " : " + user + " : View";
    copy.style = {display: 'inline', textAlign: "center"};  // Make copied element visible
    
    titleChild.innerText = title;
    titleChild.style.textAlign = "left";
    userChild.innerText = user;
    userChild.style.fontFamily = "cursive";
    reviewChild.innerText = review;

    copy.appendChild(titleChild);
    copy.appendChild(userChild);
    copy.appendChild(reviewChild);

    //<Rating name="half-rating-read" defaultValue={4} precision={0.5} readOnly /> 
    ratingChild.name ="half-rating-read";
    ratingChild.defaultValue = rating;
    ratingChild.precision = "0.5";
    ratingChild.readOnly = true;

    if(user == userMail || isAdmin(user)) {
      //DELETE:
      const delButtonChild = document.createElement('button');
        delButtonChild.id = "del " + title + " : " + user;
        delButtonChild.innerText = "Slett";
        delButtonChild.className="currentUserButtons";
        delButtonChild.style.margin = "5px";
        delButtonChild.addEventListener('click', (event)=>{
          deleteReview(user, title);
        })
        copy.appendChild(delButtonChild);

      //EDIT:
      //const editButtonChild = document.createElement('button');
      //editButtonChild.id = "del " + title + " : " + user;
      //editButtonChild.innerText = "Slett";
      //editButtonChild.className="currentUserButtons";
      //editButtonChild.style.margin = "5px";
      //editButtonChild.addEventListener('click', (event)=>{
      ////delReview(event);
      //})
      //copy.appendChild(editButtonChild);
    }

    copy.style.borderBottom = "1px solid black";
    copy.style.margin = "5px";
    copy.style.textAlign = "left";
    document.getElementById("allReviews").appendChild(copy);
  }
  return (
    <>
        <Navbar/>
        
        <div className="bookpage-grid-container">
          <div className="imageContainer">
            <img className='bookPageimageEl' id="imageElement" src={imageSource}></img>
          </div>

          <div className="desc">
            <div id="innerDescWrapper">
              <h2 id="bookTitle"></h2>
              <div id="infoContainer" style={{borderBottom: "1px solid black", borderTop:"1px solid black"}}>
                <p id="bookAuthor">Forfatter: </p>
                <p id="bookReleaseYear">Utgivelsesår: </p>
                <p id="bookGenre">Sjanger: </p>
              </div>
              <p id='descriptionBox'></p>
            </div>
          </div>

          <div id='addWrapper'>
            <div className='add'>
              <p><Rating name="half-rating-read" value={ratingValue} precision={0.5} readOnly /></p>
              <div className="iconContainers">
                <AddIcon className='checkColors' onClick={handleRead}/>
                <p className='listLabel'>Har lest</p>
              </div>
              <div className="iconContainers">
                <DoneIcon className='checkColors' onClick={handleWantToRead}/>
                <p className='listLabel'>Ønsker å lese</p>
              </div>
            </div>
          </div>

          <div className="rate">
            <div id="ratings">
              <div id="ratingWrapper">
                <h3>Lag ein vurdering:</h3>
                <div id="createReview">
                  <Rating name="half-rating-read" defaultValue={0} precision={0.5} onChange={(event) => { setRatingReview(event.target.value); }} /> 
                  <Grid container direction="column" alignItems="center" justify="center">
                  <TextField
                    id="outlined-basic"
                    label="Tittel"
                    variant="outlined"
                    className="input"
                    inputRef={titleReviewRef}
                    style={{ marginBottom: "2em", marginTop: "1.5em", maxWidth:"70%" }}
                    onChange={(event) => {setTitleReview(event.target.value);}}
                    />
                  <TextField
                    id="outlined-basic"
                    label="Vurdering"
                    variant="outlined"
                    className="input"
                    inputRef={textReviewRef}
                    style={{ marginBottom: "2em", maxWidth:"70%" }}
                    onChange={(event) => { setTextReview(event.target.value); }} 
                    />
                  <Button
                    variant="contained" 
                    id="submitButton"
                    style={{ marginBottom: "2em"}}
                    onClick={() => {
                      addReviewToDB();
                    }}
                  > Legg til vurdering</Button>
                  </Grid>
                </div>
                <div id="reviewList">
                  <h3>All reviews:</h3>
                  <p style={{fontFamily:"cursive"}}>Antall vurderinger: {reviewCount}</p>
                  <div id ="allReviews">
                    <div className="showReview"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer/>
    </>
  )
}
