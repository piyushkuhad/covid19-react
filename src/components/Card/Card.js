import React from 'react';
import './Card.css';
import NumberFormat from '../NumberFormat/NumberFormat';

const Card = ({color, title, bigHead, smallHead, shadowPulseColor}) => {
    return(
        <div className={`cm-card-item ${color}`}>
            <h4>{title}</h4>
            {shadowPulseColor ? <span className={`cm-pulse ${shadowPulseColor}`}></span>: ''}
            {smallHead ? <p>+<NumberFormat formatNum={smallHead} /></p>: <p>&nbsp;</p>}
            {bigHead ? <h1><NumberFormat formatNum={bigHead} /></h1>: ''}
        </div>
    )
}

export default Card;