import React, { useState, useRef } from 'react';
// import ReactDOM from 'react-dom';
import { useSpring, animated } from 'react-spring';
import './styles.scss';

export default function StakeHolder() {
    const handleClickCard = (card) => {
        // console.log("cad: ", card)
    }
    return (
        <div style={{padding: 50, alignItems: "center"}}>
            {/* <p>UTKU</p> */}
            <img src="images/logo.jpeg" style={{ display: "block" ,width: "250px", marginLeft: "auto", marginRight: "auto"}}></img>
        </div>
    );
}