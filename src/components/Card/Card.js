import React from 'react';
import './Card.css';

const Card = ({color, title, bigHead, smallHead, shadowPulseColor}) => {
    return(
        <div className={`cm-card-item ${color}`}>
            {title ? <h4>{title}</h4> : ''}
            {shadowPulseColor ? <span className={`cm-pulse ${shadowPulseColor}`}></span>: ''}
            {smallHead ? <p>+{smallHead}</p>: ''}
            {bigHead ? <h1>{bigHead}</h1>: ''}
        </div>
    )
}

export default Card;