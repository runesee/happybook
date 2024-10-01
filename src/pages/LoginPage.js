import "./UserManagement.css";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { auth } from '../firebaseSrc/firebase-config';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import Footer from '../components/Footer';
import LimitedNavbar from "../components/LimitedNavbar";

function LoginPage() {
  //Defining constants
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  //Funcion used for login
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
    } catch (error) {
      alert("Feil passord eller email!");
      console.log(error.message);
    }
    console.log(user?.email + " er logget inn")
    navigate("/");
  };

  // const logout = async () => {
  //   await signOut(auth);
  //   alert(user?.email + " er logget ut");
  // };

  return (
    <><main>
      <LimitedNavbar/>
      <div id="loginBox">
        <h1>Innlogging</h1>
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
            onChange={(event) => { setPassword(event.target.value); } } />
          <div style={{ display: "flex", justifyContent: "space-between", padding: "10px" }}>


            <Button
              variant="contained"
              id="submitButton"
              style={{ marginBottom: "2em", marginTop: "3em", display: "block", marginRight: "1em" }}
              onClick={login}
            >
              Logg inn
            </Button>
            {/* <Button
      variant="contained"
      id="submitButton"
      style={{ marginBottom: "2em", marginTop: "3em", display: "block", marginLeft:"1em" }}
      onClick= {logout}
    >
      Logg ut
    </Button> */}
            <Link to="/CreateUserPage" id="link" style={{ textDecoration: "none" }}>
              <Button
                variant="contained"
                id="submitButton"
                style={{ marginBottom: "2em", marginTop: "3em", display: "block", marginRight: "1em" }}
              >
                Registrer

              </Button>
            </Link>
          </div>
        </Grid>
      </div>
    </main><Footer /></>
  );
}

export default LoginPage;
