import '../pages/FrontPage.css';

import * as React from 'react';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import AccountMenu from './AccountMenu';
import getBooks from '../Database/getBooks';
import { stringSimilarity, findBestMatch, compareTwoStrings } from "string-similarity";
import { Link } from "react-router-dom";
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import DarkToLight from './DarkToLight';
import { useNavigate } from "react-router-dom";

function LimitedNavbar(){
  
  const navigate = useNavigate();

  //Function used for navigation to homepage
  function handleHomePage() {
    navigate("/");
  }

  return(
    //Navbar used on all pages except the frontpage
    <><div id="navigationBar">
      <div id="leftNavBar">
      <Button id="title" variant="outlined" onClick={handleHomePage}>HappyBook</Button>
      </div>
      <div id="rightNavBar">
        <AccountMenu/>
        <DarkToLight/>
      </div> 
    </div>
    <div id= 'searchContent'>
    <Link to="/LoginPage" id="link" style={{ textDecoration: "none" }}>
    <div className='contentBox'>
              <p></p>
            </div>
            </Link>
            <div className='contentBox'>
              <p></p>
            </div>
            <div className='contentBox'>
              <p></p>
            </div>
            <div className='contentBox'>
              <p></p>
            </div>
            <div className='contentBox'>
              <p></p>
            </div>
            </div>
    </>
    )}

      

      export default LimitedNavbar;