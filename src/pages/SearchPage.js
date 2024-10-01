import "./UserManagement.css";
import '../pages/FrontPage.css';
import React, { useEffect } from "react";
import Footer from '../components/Footer';
import "firebase/auth";
import LimitedNavbar from "../components/LimitedNavbar";
import getBooksWithFilter from '../Database/getBooksWithFilter';
import getBooksWithoutFilter from '../Database/getBooksWithoutFilter';
import getBooksByFirstLetter from '../Database/getBooksByFirstLetter';
import { stringSimilarity, findBestMatch, compareTwoStrings } from "string-similarity";

function SearchPage() {

  function addElement(text, author, source) {
    const wrapper = document.querySelector("#innerWrapper");
    const bookEl = document.createElement("div");
    const imageEl = document.createElement("img");
    const nameEl = document.createElement("h4");
    
    nameEl.innerText = text;
    bookEl.className = "searchedElement";
    imageEl.className = "imageEl";
    imageEl.src = source;
    imageEl.id = text + ";" + author;
    imageEl.addEventListener('click', (event)=>{
      window.location.href = `/books/:` + event.target.id;
    });
    bookEl.appendChild(imageEl);
    bookEl.appendChild(nameEl);
    wrapper.appendChild(bookEl);
  }

  useEffect(() => {
    async function funk() {
        let searchEl = document.querySelector(".search");
        let valueStrings = String(window.location.href).split(":");
        searchEl.value = valueStrings[4];
        let genre = valueStrings[3];
        genre = genre.substring(0, genre.length - 1)

        document.querySelectorAll(".radioButtons").forEach((element) => {
          if (genre === element.id) {
            element.checked = true;
          }
        });
        handleSearch(valueStrings[4], 5, genre);
    }
    funk();
  }, []);

  function handleSearch(text, elementCount, genre) {
    if (text.length < 1) {
      // No input, return
      return;
    }
  
    let genreString = genre;
    let bookArray = [];
    console.log(genreString);

    // Endrer genre-verdi for å passe med felt i databasen:
    if (genre === "helse") {
      genreString = "Helse- og livsstil";
    }
    else if (genre === "krim") {
      genreString = "Krim";
    }
    else if (genre === "bibliografi") {
      genreString = "Bibliografi";
    }
    else if (genre === "novelle") {
      genreString = "Novelle";
    }
    else if (genre === "barnebok") {
      genreString = "Barnebok";
    }
    else if (genre === "krim") {
      genreString = "Krim";
    }
    else if (genre === "fantasy") {
      genreString = "Fantasy";
    }
    else if (genre === "faglitteratur") {
      genreString = "Faglitteratur";
    }
    if (genre === "all") {
      bookArray = getBooksWithoutFilter();
    }
    else {
      bookArray = getBooksWithFilter(genreString);
    }
    var matches;
    if (text.length === 1) {
      text += " ";
    }
    Promise.resolve(bookArray).then(value=>{
      let names = [];
      let authors = [];
      let sources = [];
      //let names_authors_dict = {};
      value.forEach((element) => {
        //let idStrings = element.split(":");
        names.push(String(element[1]).replace(/['"]+/g, ''));
        authors.push(String(element[0]).replace(/['"]+/g, ''));
        sources.push(String(element[2]).replace(/['"]+/g, ''));
      });
      names.reverse();
      authors.reverse();
      sources.reverse();
 

      for (let i = 0; i < elementCount; i++) {
        try {
          matches = findBestMatch(text, names).bestMatchIndex;
          addElement(names[matches], authors[matches], sources[matches]);
          names.splice(matches, 1);
          authors.splice(matches, 1);
          sources.splice(matches, 1)
        }
        catch (error) {
          // Do nothing
        }

        // If search returned no books, let user know that no books for filter found in database
        const wrapper = document.querySelector("#innerWrapper");
        if (wrapper.childElementCount < 2) {
          const emptyEl = document.createElement("p");
          emptyEl.innerText = "Ingen bøker for gitt filter funnet i databasen.";
          wrapper.appendChild(emptyEl);
        }
      }
    });

    
  }
  
  function setGenre(event) {
    console.log(event.target.value);
  }

  function handleKey(e) {
    let value = document.querySelector(".search").value;
    if (e.keyCode === 13) {
      // Check which (if any) of the radio buttons pressed:
      let genre = "all";
      const elements = document.querySelectorAll(".radioButtons");
      elements.forEach(function (element) {
        if (element.checked) {
          genre = element.id;
        }
      });
      window.location.href = `/search/:` + genre + `/:` + value;
    }
  }

  function clearDisplay() {
    let wrapperEl = document.getElementById("innerWrapper");
    while (wrapperEl.childElementCount > 1) {
      wrapperEl.removeChild(wrapperEl.lastChild);
    }
  }

  let elementsOnPage = 5;
  async function loadMore() {
    elementsOnPage += 5;
    // Tillater ikke flere enn 20 elementer på siden for å minske forespørsler til datbasen
    if (elementsOnPage > 20) {
      return;
    }
    let valueStrings = String(window.location.href).split(":");
    let text = valueStrings[4];
    let genre = valueStrings[3];
    genre = genre.substring(0, genre.length-1);
    clearDisplay();
    handleSearch(text, elementsOnPage, genre);
  }

  return (
    <><main>
        <LimitedNavbar/>
        <div className="wrapper">
            <div id="innerWrapper">
                <div id="filterBar">
                  <input className="search" style={{width: "500px"}} type="text" placeholder="Search.." onKeyDown={handleKey}></input>
                  <div className="dropdown">
                    <button className="dropbtn">Filtrér</button>
                    <div className="dropdown-content" onChange={event => setGenre(event)}>
                      <div style={{display: "flex", flexDirection: "row"}}>
                        <input type="radio" id="krim" name="genre" className="radioButtons"></input>
                        <label htmlFor="krim">Krim</label>
                      </div>
                      <div style={{display: "flex", flexDirection: "row"}}>
                        <input type="radio" id="roman" name="genre" className="radioButtons"></input>
                        <label htmlFor="roman">Roman</label>
                      </div>
                      <div style={{display: "flex", flexDirection: "row"}}>
                        <input type="radio" id="biografi" name="genre" className="radioButtons"></input>
                        <label htmlFor="biografi">Biografi</label>
                      </div>
                      <div style={{display: "flex", flexDirection: "row"}}>
                        <input type="radio" id="barnebok" name="genre" className="radioButtons"></input>
                        <label htmlFor="barnebok">Barnebok</label>
                      </div>
                      <div style={{display: "flex", flexDirection: "row"}}>
                        <input type="radio" id="fantasy" name="genre" className="radioButtons"></input>
                        <label htmlFor="fantasy">Fantasy</label>
                      </div>
                      <div style={{display: "flex", flexDirection: "row"}}>
                        <input type="radio" id="novelle" name="genre" className="radioButtons"></input>
                        <label htmlFor="novelle">Novelle</label>
                      </div>
                      <div style={{display: "flex", flexDirection: "row"}}>
                        <input type="radio" id="faglitteratur" name="genre" className="radioButtons"></input>
                        <label htmlFor="faglitteratur">Faglitteratur</label>
                      </div>
                      <div style={{display: "flex", flexDirection: "row"}}>
                        <input type="radio" id="helse" name="genre" className="radioButtons"></input>
                        <label htmlFor="helse">Helse- og livsstil</label>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
        </div>
        <div style={{display: "flex", justifyContent: "center", width: "inherit"}}>
          <button id="loadButton" onClick={loadMore}>Load More</button>
        </div>
    </main>
    <Footer/></>
  );
}

export default SearchPage;
