import React from "react";
 
//Code gathered from https://www.cluemediator.com/create-simple-popup-in-reactjs
const Popup = props => {
  return (
    <div className="popup-box">
      <div className="box">
        <span className="close-icon" onClick={props.handleClose}>x</span>
        {props.content}
      </div>
    </div>
  );
};
 
export default Popup;