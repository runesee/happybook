import '../pages/FrontPage.css';

import React, { useEffect } from "react";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import AccountMenu from './AccountMenu';
import SideBar from './SideBar';
import getBooks from '../Database/getBooks';
import { stringSimilarity, findBestMatch, compareTwoStrings } from "string-similarity";
import { Link } from "react-router-dom";
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import DarkToLight from './DarkToLight';
import { useNavigate } from "react-router-dom";
import getBooksWithoutFilter from '../Database/getBooksWithoutFilter';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton id="styledBurgerIcon" {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

function Navbar(){
  
  const navigate = useNavigate();
  // Function finding the best match for the search-input
  function handleSearch() {
    const searchEl = document.getElementById("search");
    let text = searchEl.value;
    if (text.length <= 1) {
      return;
    }
    let bookArray = getBooksWithoutFilter(5);
    var matches;
    Promise.resolve(bookArray).then(value=>{
    const contentBoxes = document.getElementsByClassName("contentBox");
      for (let i = 0; i < contentBoxes.length; i++) {
        matches = findBestMatch(text, value).bestMatchIndex;
        contentBoxes[i].textContent = value[matches];
        value.splice(matches, 1);
      }
    })
  }
  
  function handleKey(e) {
    const searchEl = document.getElementById("search");
    let text = searchEl.value;
    if (text.length < 1) {
      return;
    }
    let value = document.getElementById("search").value;
    if (e.keyCode == 13) {
      window.location.href = `/search/:all/:` + value;
    }
  }

  function showBoxes() {
    const contentBoxes = document.getElementsByClassName("contentBox");
    for (let i = 0; i < contentBoxes.length; i++) {
      contentBoxes[i].style.display = 'flex';
    }
  }

  function hideBoxes() {
    const contentBoxes = document.getElementsByClassName("contentBox");
    for (let i = 0; i < contentBoxes.length; i++) {
      contentBoxes[i].style.display = 'none';
    }
  }
  //Used for navigation to the frontpage
  function handleHomePage() {
    navigate("/");
  }

  return(
    //Navbar used on frontpage, separate from LimitedNavbar on the searchbar
    <><div id="navigationBar">

    <SideBar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
      <div id="leftNavBar">
      <Button id="title" variant="outlined" onClick={handleHomePage}>HappyBook</Button>
        <input className='search' id="search" type="text" placeholder="Search.." onKeyDown={handleKey}></input>
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

      const topBooks = [
        { title: 'The Big Four', year: 1994 },
        { title: 'The Silent Wife', year: 1972 },
      ];

      export default Navbar;