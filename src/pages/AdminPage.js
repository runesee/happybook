import "./UserManagement.css";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import {useState, useEffect} from 'react';
import updateBook from "../Database/updateBook"
import deleteBook from "../Database/deleteBook";
import { Link } from "react-router-dom";
import { storage } from "../firebaseSrc/firebase-config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db } from "../firebaseSrc/firebase-config";
import { collection, getDocs } from "@firebase/firestore";
import { useRef } from "react";
import MenuItem from '@mui/material/MenuItem';
import Footer from '../components/Footer';
import LimitedNavbar from '../components/LimitedNavbar';

function AdminPage() {
  // Define constants and variables:
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [description, setDescription] = useState("");
  const [year, setYear] = useState("");
  const [author, setAuthor] = useState("");
  const [userRating, setUserRating] = useState(null);
  const [imgUrl, setImgUrl] = useState(null);
  const [criticRating, setCriticRating] = useState("");
  const [imageUpload, setImageUpload] = useState(null);

  let criticRef = useRef('');
  let titleRef = useRef('');
  let authorRef = useRef('');
  let yearRef = useRef('');
  let genreRef = useRef('');
  let descriptionRef = useRef('');
  let urlRef = useRef('');

  // Function for adding books to database and page:
  async function add() {

    if (
      titleRef.current.value == "" 
      || authorRef.current.value == "" 
      || yearRef.current.value == "" 
      || criticRef.current.value == "" 
      || descriptionRef.current.value == ""
      || urlRef.current.value == "") 
      {
        alert("Alle feltene må være fylt ut!");
        return;
    }
    if (Number(yearRef.current.value).isNaN) {
      alert("Vennligst velg et gyldig årstall!");
      return;
    }
    if (
      Number(yearRef.current.value) > (new Date().getFullYear()) 
      || Number(yearRef.current.value) < 0
    ) 
    {
      alert("Vennligst velg et gyldig årstall!");
      return;
    }
  //Updates current books img. updateCurrentImg();
  //Adds book selected values in fields on admin page.
    try {
      updateBook(title, author, year, genre, description, userRating, criticRating, imgUrl);
      createBookViewElement(title, author);
      //alert("Boken " + "'" + title + "'" + " av " + author + " ble lagt til!");
      //alert(imgUrl + "Eller" + imageUpload.name)
      clearFields();  // Clear the MUI input fields
    }
    catch(error) {
      alert("Boken " + "'" + title + "'" + " av " + author + " kunne ikke legges til!");
    }
  }

  // OnClick function for deleting books:
  async function del(event) {
    try {
      let id = String(event.target.id);   // Button ID
      let idStrings = id.split(" : ");
      let node = document.getElementById(id + " : View");   // Get view element by ID
      deleteBook(idStrings[0], idStrings[1]);   // Delete from firebase
      document.getElementById("deleteBook").removeChild(node);    // Remove from website view
      alert("Boken " + idStrings[0] + " av " + idStrings[1] + " ble slettet");
    }
    catch(error) {
      alert("Valgt bok kunne ikke slettes!");
    }
  }

  //Catches imported image from user, and imports it to firebase storage.
  function uploadImage() {
    return new Promise((resolve, reject) => {
      try {
        if (imageUpload == null) return;
        const imgRef = ref(storage, imageUpload.name);
        //Uploads picture to database
        uploadBytes(imgRef, imageUpload).then(() => {
            alert(imageUpload.name + " ble lagt til databasen");
  
            getDownloadURL(ref(storage, imageUpload.name)).then((getURL) => {
              setImgUrl(getURL, () => {
                resolve(); // Resolve the Promise after imgUrl is updated
              });
            });
          })
          .catch((error) => {
            reject(error); // Reject the Promise if there's an error
          });
      } catch (error) {
        alert("Noe gikk galt");
        reject(error); // Reject the Promise if there's an error
      }
    });
  }

  // Helper function for creating new book view elements on page:
  function createBookViewElement(title, author) {
    const node = document.querySelector(".bookView");
    const titleChild = document.createElement('h4');
    const authorChild = document.createElement('p');
    const buttonChild = document.createElement('button');
    const copy = node.cloneNode(true);   // copy of original div
  
    buttonChild.id = title + " : " + author;
    copy.id = title + " : " + author + " : View";
    copy.style = {display: 'inline', textAlign: "center"};  // Make copied element visible
    buttonChild.innerText = "SLETT";
    titleChild.innerText = title;
    authorChild.innerText = author;
    buttonChild.addEventListener('click', (event)=>{
      del(event);
    })
    buttonChild.className="adminButtons";
  
    copy.appendChild(titleChild);
    copy.appendChild(authorChild);
    copy.appendChild(buttonChild);
    document.getElementById("deleteBook").appendChild(copy);
  }

  // Poll database once for books:
  useEffect(()=>{
    async function fetch() {
      //let tally = 1;
      const querySnapshot = await getDocs(collection(db, "books"));
      querySnapshot.forEach((doc) => { // doc.data() is never undefined for query doc snapshots
        createBookViewElement(String(doc.data().name), String(doc.data().author));
      });
    }
    fetch();
  }, []) // <-- empty dependency array

  // Deprecated method, used to update page through refreshing:
  function reloadInfoFromDB() {
    // clear children: if ()
    const nodeToBeCleared = document.querySelector(".bookView");
    while (nodeToBeCleared.firstChild) {
      nodeToBeCleared.removeChild(nodeToBeCleared.lastChild);
    }
    window.location.reload();
  }

  function clearFields() {
      titleRef.current.value = "";
      authorRef.current.value = "";
      yearRef.current.value = "";
      genreRef.current.value = "";
      descriptionRef.current.value = "";
      criticRef.current.value = "";
      urlRef.current.value = "";
  }

  const genres = [
    {
      value: 'Krim',
      label: 'Krim',
    },
    {
      value: 'Roman',
      label: 'Roman',
    },
    {
      value: 'Biografi',
      label: 'Biografi',
    },
    {
      value: 'Barnebok',
      label: 'Barnebok',
    },
    {
    value: 'Fantasy',
    label: 'Fantasy',
    },
    {
      value: 'Novelle',
      label: 'Novelle',
    },
    {
      value: 'Faglitteratur',
      label: 'Faglitteratur',
    },
    {
      value: 'Helse- og livsstil',
      label: 'Helse- og livsstil',
      },
  ];

  return (
    <><main>
      <LimitedNavbar/>
      <div style={{display: 'flex', justifyContent: "center"}}>
        <div id="addBook" style={{width: "auto", padding: "3%", margin: "1%", marginLeft: "3%"}}>
          <h2>Legg til eller oppdater en bok</h2>
          <Grid container direction="column" alignItems="center" justify="center">
          <TextField
            id="outlined-basic"
            label="Tittel"
            variant="outlined"
            className="input"
            inputRef={titleRef}
            style={{ marginBottom: "2em", marginTop: "1.5em" }}
            onChange={(event) => {setTitle(event.target.value);}}/>
          <TextField
            id="outlined-basic"
            label="Forfatter"
            variant="outlined"
            className="input"
            inputRef={authorRef}
            style={{ marginBottom: "2em" }}
            onChange={(event) => { setAuthor(event.target.value); } } />
          <TextField
            id="outlined-basic"
            label="Utgivelsesår"
            variant="outlined"
            className="input"
            inputRef={yearRef}
            style={{ marginBottom: "2em" }}
            onChange={(event) => { setYear(event.target.value); } } />
          <TextField
          id="outlined-select-currency"
          select
          label="Sjanger"
          defaultValue="Sjanger"
          variant="outlined"
          style={{ marginBottom: "2em" }}
          onChange={(event) => { setGenre(event.target.value); } }
          className="input"
          inputRef={genreRef}
        >
          {genres.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
            <TextField
            id="outlined-basic"
            label="Gjennomsnittlig anmeldervurdering"
            variant="outlined"
            className="input"
            inputRef={criticRef}
            style={{ marginBottom: "2em" }}
            onChange={(event) => { setCriticRating(event.target.value); } } />
            
          <TextField
            id="outlined-basic"
            label="Beskrivelse"
            multiline
            rows={4}
            variant="outlined"
            className="input"
            inputRef={descriptionRef}
            style={{ marginBottom: "2em" }}
            onChange={(event) => { setDescription(event.target.value); } } />
          {/*<input
            type="file"
            name="bildeFil"
            id="bildeFil"
            style={{marginBottom:"2em"}}
            onChange={(event) => {
              setImageUpload(event.target.files[0])
            }}
          />*/}
          <TextField
            id="outlined-basic"
            label="Bilde-URL"
            multiline
            variant="outlined"
            className="input"
            inputRef={urlRef}
            style={{ marginBottom: "2em" }}
            onChange={(event) => {setImgUrl(event.target.value); } } />
          <Button
            variant="contained"
            id="submitButton"
            style={{ marginBottom: "2em"}}
            onClick={() => {
              uploadImage();
              add();
            }}
            >
            Legg til
          </Button>
        </Grid>
        </div>
        <div id="buttonHolder" style={{display: 'none'}}>
        </div>
        <div id="deleteBook" style={{overflowY: "auto", overflowX: "hidden", width: "auto", padding: "3%", margin: "1%", marginRight: "3%", height: "700px"}}>
          <h2>Slett en bok</h2>
          <div className="bookView" justify style={{display: 'none'}}>
          </div>
        </div>
      </div>
      <Footer />
    </main></>
  );
}

export default AdminPage;