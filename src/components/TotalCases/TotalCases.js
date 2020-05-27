import React from 'react';
import Card from '../Card/Card';
import MiniGraph from '../MiniGraph/MiniGraph';

const TotalCases = ({totalData, seriesData}) => {
    const {confirmed, active, deaths, deltaconfirmed, deltadeaths, deltarecovered, lastupdatedtime, recovered} = totalData;

    let seriesDataTrim = seriesData;
    const removeItem  = (items, i) => items.splice(0, i);
    if(seriesDataTrim.length > 100) {
        removeItem(seriesDataTrim, 90);
    }
    
    const getGraphActiveData = (data) => {
        let graphArr = [];

        for(let i =0; i < data.length; i++) {
            graphArr.push(Number(data[i].totalconfirmed) - ((Number(data[i].totalrecovered) + (Number(data[i].totaldeceased)))));
        }
        //console.log('Yp', graphArr);
        return graphArr;
    }

    const getGraphData = (data, dataPoint, dataType) => {
        let graphArr = [];
        //console.log(data[0]['totalconfirmed']);
        for(let i =0; i < data.length; i++) {
            if(dataType === 'number') {
                graphArr.push(Number(data[i][dataPoint]));
            }
            else {
                graphArr.push(data[i][dataPoint]);
            }
        }
        return graphArr;
    }
    //console.log('Arr', getGraphData(seriesData, 'totalconfirmed', 'number'));
    return(
        <div className="cm-totalcase-container">
            <div className="container">
                <div className="cm-update-time">
                    <p>Last Updated: {lastupdatedtime}</p>
                </div>
                <div className="Card-Container cm-four-col-eq">
                    <div className="cm-card-item-wrapper">
                        <Card 
                            color="isCherry" 
                            title="Total Cases" 
                            bigHead={confirmed} 
                            smallHead={deltaconfirmed} 
                            shadowPulseColor="isCherryBg"
                        />
                        <MiniGraph 
                            graphLabel={getGraphData(seriesDataTrim, 'date')} 
                            graphData={getGraphData(seriesDataTrim, 'dailyconfirmed', 'number')} 
                            borderColor="#ff073a" 
                        />
                    </div>
                    <div className="cm-card-item-wrapper">
                        <Card 
                            color="isBlue" 
                            title="Active" 
                            bigHead={active}
                            shadowPulseColor="isBlueBg"
                        />
                        <MiniGraph 
                            graphLabel={getGraphData(seriesDataTrim, 'date')} 
                            graphData={getGraphActiveData(seriesDataTrim)} 
                            borderColor="#007bff" 
                        />
                    </div>
                    <div className="cm-card-item-wrapper">
                        <Card 
                            color="isGreen" 
                            title="Recovered" 
                            bigHead={recovered}
                            smallHead={deltarecovered}
                            shadowPulseColor="isGreenBg"
                        />
                        <MiniGraph 
                            graphLabel={getGraphData(seriesDataTrim, 'date')} 
                            graphData={getGraphData(seriesDataTrim, 'dailyrecovered', 'number')} 
                            borderColor="#28a745" 
                        />
                    </div>
                    <div className="cm-card-item-wrapper">
                        <Card 
                            color="isGrey" 
                            title="Deaths" 
                            bigHead={deaths}
                            smallHead={deltadeaths}
                            shadowPulseColor="isGreyBg"
                        />
                        <MiniGraph 
                            graphLabel={getGraphData(seriesDataTrim, 'date')} 
                            graphData={getGraphData(seriesDataTrim, 'dailydeceased', 'number')} 
                            borderColor="#6c757d" 
                        />
                    </div>                    
                </div>
            </div>
        </div>
    )
}

export default TotalCases;