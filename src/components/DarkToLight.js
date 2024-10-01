import React, { useEffect, useState } from "react";
import './DarkToLight.css';
function DarkToLight(){
    const [theme,setTheme]=useState(false);

    const handleClick=()=>{
        setTheme(!theme)
    }
    //Changing the theme from light to dark and back.
    useEffect(()=>{
        if(theme==true){
            document.body.classList.add("dark");
            document.body.classList.remove("light");
        }else{
            document.body.classList.remove("dark");
            document.body.classList.add("light");
        }
    })

    return(
        //Button for changig the website theme
            <button id="change" onClick={handleClick}>{theme?"☀️":"🌑"}</button>

    );
}
export default DarkToLight;