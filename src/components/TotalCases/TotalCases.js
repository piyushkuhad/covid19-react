import React from 'react';
import Card from '../Card/Card';

const TotalCases = ({totalData}) => {
    console.log('Data', totalData);
    const {confirmed, active, deaths, deltaconfirmed, deltadeaths, deltarecovered, lastupdatedtime, recovered} = totalData;
    return(
        <div className="cm-totalcase-container">
            <div className="container">
                <div class="cm-update-time">
                    <p>Last Updated: {lastupdatedtime}</p>
                </div>
                <div className="Card-Container cm-four-col-eq">
                    <Card 
                        color="isCherry" 
                        title="Total Cases" 
                        bigHead={confirmed} 
                        smallHead={deltaconfirmed} 
                        shadowPulseColor="isCherryBg"
                    />
                    <Card 
                        color="isBlue" 
                        title="Active" 
                        bigHead={active}
                        shadowPulseColor="isBlueBg"
                    />
                    <Card 
                        color="isGreen" 
                        title="Recovered" 
                        bigHead={recovered}
                        smallHead={deltarecovered}
                        shadowPulseColor="isGreenBg"
                    />
                    <Card 
                        color="isGrey" 
                        title="Deaths" 
                        bigHead={deaths}
                        smallHead={deltadeaths}
                        shadowPulseColor="isGreyBg"
                    />
                </div>
            </div>
        </div>
    )
}

export default TotalCases;