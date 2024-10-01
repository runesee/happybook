import React from 'react';
import { useState } from 'react';
import { elastic as Menu } from 'react-burger-menu';
import './SideBar.css';
import { Link } from "react-router-dom";

export default props => {

  return (
    //Hamburger menu-items
    <Menu>
        <h3>Sjanger</h3>

        <div>
          <Link to="/Crime">
      <button id="hamburgerButton">Krim</button>
      </Link>
        </div>
        <div>
          <Link to="/Roman">
      <button id="hamburgerButton">Roman</button>
      </Link>
        </div>
        <div>
          <Link to="/Biography">
      <button id="hamburgerButton">Biografi</button>
      </Link>
        </div>
        <div>
        <Link to="/ChildrenBook">
      <button id="hamburgerButton">Barnebok</button>
      </Link>
        </div>
        <div>
        <Link to="/Fantasy">
      <button id="hamburgerButton">Fantasy</button>
      </Link>
        </div>
        <div>
        <Link to="/Novel">
      <button id="hamburgerButton">Novelle</button>
      </Link>
        </div>
        <div>
        <Link to="/NonFiction">
      <button id="hamburgerButton">Faglitteratur</button>
      </Link>
        </div>
        <div>
        <Link to="/HealthAndLifestyle">
      <button id="hamburgerButton">Helse- og livsstil</button>
      </Link>
        </div>
    </Menu>
  );
};