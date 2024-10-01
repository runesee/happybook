import * as React from 'react';

import './FrontPage.css';
import Navbar from '../components/Navbar';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Rating from '@mui/material/Rating';
import Carousel from 'react-bootstrap/Carousel';
import Footer from '../components/Footer';
import getBook from '../Database/getBook';
import { Link } from "react-router-dom";

import { auth } from '../firebaseSrc/firebase-config';
import { db, storage } from "../firebaseSrc/firebase-config";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useState, useEffect } from  'react';
import Popup from './bookTemplate.js';
import './bookTemplate.css'
import updateUserReadBooks from '../Database/updateUserReadBooks';
import updateUserWantToRead from '../Database/updateUserWantToRead';
import AddIcon from "@mui/icons-material/Add";
import DoneIcon from "@mui/icons-material/Done";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import getBooksToplist from '../Database/getBooksToplist';
import getBooksNewcomers from '../Database/getBooksNewcomers';


function FrontPage() {
  //Defining constants
  const [isOpen, setIsOpen] = useState(false);

  //CurrentBook and current image which shall be used on popup
  const [currentBook, setCurrentBook] = useState([]);
  const [img, setImg] = useState("")

  const togglePopup = () => {
    setIsOpen(!isOpen);
  }

  const [user, loading, error] = useAuthState(auth);
  let userMail = user?.email;
  const [toplist, setToplist] = useState([]);
  const [newcomers, setNewcomers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const topBooks = await getBooksToplist();
      setToplist(topBooks);
      const newcomers = await getBooksNewcomers();
      setNewcomers(newcomers);
      let counter = 1;
      let toplist = document.getElementById("topList");
      topBooks.forEach((element)=> {
        let topListValues = document.createElement("div");
        topListValues.className="topListValues";
        let counterDiv = document.createElement("div");
        counterDiv.className = "topListInnerWrapper";
        counterDiv.innerText = counter + ".  ";
        counterDiv.style.marginRight = "5px";
        let bookImage = document.createElement("img");
        bookImage.className = "innerBookImage";
        bookImage.src = element[1];
        let imageTextDiv = document.createElement("div");
        imageTextDiv.className = "imageTextDiv";
        let textEl = document.createElement("p");
        textEl.style.margin = 0;
        let idStrings = element[2].split(":");
        let name = idStrings[0];
        name = name.slice(0, name.length -1);
        let author = idStrings[1];
        author = author.slice(1, author.length);
        textEl.innerText = name;
        imageTextDiv.appendChild(counterDiv);
        imageTextDiv.appendChild(bookImage);
        imageTextDiv.appendChild(textEl);
        topListValues.appendChild(imageTextDiv);
        toplist.appendChild(topListValues);
        //name = name.substring(0, name.length-1);
        //author = author.substring(1, author.length-1);
        bookImage.id=name + ";" + author;
        bookImage.addEventListener('click', (event)=>{
          window.location.href = `/books/:` + event.target.id;
        });
        counter++;
      });
      let newcomersEl = document.getElementById("newcomers");
      newcomers.forEach((element) => {
        let newcomerContainer = document.createElement("div");
        let newcomerImage = document.createElement("img");
        let newcomerTitle = document.createElement("p");
        newcomerContainer.className="newcomerContainer";
        newcomerImage.className="newcomerImage";
        newcomerTitle.className="newcomerTitle";
        newcomerTitle.innerText = element[1];
        newcomerImage.src = element[0];
        newcomerImage.id = element[1] + ";" + element[2];
        newcomerImage.addEventListener('click', (event)=>{
          window.location.href = `/books/:` + event.target.id;
        });
        newcomerContainer.appendChild(newcomerImage);
        newcomerContainer.appendChild(newcomerTitle);
        newcomersEl.appendChild(newcomerContainer);
      });
    }

    fetchData();
  }, []);
  return (
    <>
      <>
        <Navbar />
        <div className="grid-container">
          <div className="item1"></div>
          <div className="item2">
            <div id='boxBookOfTheWeek'>
                <h2 id="bookOfTheWeekTitle">Ukens Bøker</h2>
                <Carousel>
              <Carousel.Item id="bilde">
                <img id="bok1"
                  className="d-block w-100"
                  src="https://kbimages1-a.akamaihd.net/9dd141e5-b446-49cf-8a7b-7d2ea19b34f2/353/569/90/False/the-silent-wife-the-will-trent-series-book-10-1.jpg"
                  alt="First slide"
                  onClick={() => {
                    getBook("The Silent Wife","Karin Slaugther").then(
                      function(bookInfo) {
                        setCurrentBook(bookInfo);
                    });
                    togglePopup();
                  }}/>
                <Carousel.Caption>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img id="bok2"
                  className="d-block w-100"
                  src="https://images.penguinrandomhouse.com/cover/9780593468906"
                  alt="Second slide"
                  onClick={() => {
                    getBook("The big four","Agatha Christie").then(
                      function(bookInfo) {
                        setCurrentBook(bookInfo);
                    });
                    setImg("https://images.penguinrandomhouse.com/cover/9780593468906");
                    togglePopup();
                  }}/>
                <Carousel.Caption>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img id="bok3"
                  className="d-block w-100"
                  src="https://www.norli.no/media/catalog/product/9/7/9788202758707_1_1.jpg?auto=webp&format=pjpg&width=1920&height=2400&fit=cover"
                  alt="third slide"
                  onClick={() => {
                    getBook("De tre","Valérie Perrin").then(
                      function(bookInfo) {
                        setCurrentBook(bookInfo)
                    });
                    setImg("https://www.norli.no/media/catalog/product/9/7/9788202758707_1_1.jpg?auto=webp&format=pjpg&width=1920&height=2400&fit=cover");
                    togglePopup();
                  }}/>
                <Carousel.Caption>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
              </div></div>
          <div className="item3">
            <div id="topList">
              <h2 id="topListHeader">Toppliste</h2>
            </div>
          </div>
          <div class="item4">
            <h2 style={{marginBottom:'30px'}}>Nykommere</h2>
            <div id="newcomers">
            </div>
            </div>
        </div>
        {isOpen && <Popup
              content={<>
                <div className='book-grid-container'>
                <div className ="book item4">
                  <div className="cover">
                  <img
                  src= {String(currentBook[6]).replace(/['"]+/g, '')}
                  />
                  </div>
                  <div class="page"></div>
                  <div class="page"></div>
                  <div class="page"></div>
                  <div class="page"></div>
                  <div class="page"></div>
                  <div class="last-page">
                  <h5>{String(currentBook[4]).replace(/['"]+/g, '')}</h5>

                      <div>
                        Forfatter: {String(currentBook[0]).replace(/['"]+/g, '')}
                        <p></p>
                      </div>
                      <div>
                        Utgivelsesår: {String(currentBook[5]).replace(/['"]+/g, '')}
                        <p></p>
                      </div>
               
                      <div>
                        Sjanger: {String(currentBook[3]).replace(/['"]+/g, '')}
                        <p></p>
                      </div>
                      <div>
                        Informasjon: {String(currentBook[2]).replace(/['"]+/g, '').substring(0,200)+"..."}
                        <Link to={"/books/:" + String(currentBook[4]).replace(/['"]+/g, '') + ";" + String(currentBook[0]).replace(/['"]+/g, '')}> Les mer </Link>
                      </div>
                      
                  </div>
                  <div className="back-cover"></div>
                </div></div>
              </>}
              handleClose={togglePopup}
              />
              }
      </>   
      <Footer />
    </>
    );  
  }
  export default FrontPage;