import "./UserManagement.css";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import React, { useEffect, useRef, useState } from "react";
import { auth } from '../firebaseSrc/firebase-config';
import {
  createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import Footer from '../components/Footer';
import addUser from '../Database/addUser';
import updateUserReadBooks from "../Database/updateUserReadBooks";
import LimitedNavbar from "../components/LimitedNavbar";

function CreateUserPage() {
  //Defining constants and functions
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const confirmRef = useRef('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  //Function used for registration
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);
  //The register constant
  const register = async () => {
    if(password == confirmPassword) {
      try {
        const user = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        addUser(email);
      } catch (error) {
        alert(error.message);
      }
      alert("User successfully registered!");
      navigate("/loginpage");
      
    }
    else {
      alert("Passordene må være like.")
    }
  };

  return (
    <><main>
      <LimitedNavbar/>
      <div id="loginBox">
        <h1>Opprett bruker</h1>
        <Grid container direction="column" alignItems="center" justify="center">
          <TextField
            id="outlined-basic"
            label="E-post"
            variant="outlined"
            className="input"
            value={email}
            style={{ marginBottom: "2em", marginTop: "2.5em" }}
            onChange={(event) => { setEmail(event.target.value); } } />
          <TextField
            id="outlined-basic"
            label="Passord"
            type="password"
            variant="outlined"
            className="input"
            value={password}
            style={{ marginBottom: "2em" }}
            onChange={(event) => { setPassword(event.target.value); } } />
          <TextField
            id="outlined-basic"
            label="Bekreft passord"
            type="password"
            variant="outlined"
            className="input"
            inputRef={confirmRef}
            onChange={(event) => { setConfirmPassword(event.target.value); } } />
          <Button
            variant="contained"
            id="submitButton"
            style={{ marginBottom: "2em", marginTop: "2.5em" }}
            onClick={register}
          >
            Opprett
          </Button>
        </Grid>
      </div>
    </main><Footer /></>
  );
}

export default CreateUserPage;