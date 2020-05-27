import React from 'react';
import Card from '../Card/Card';
import DistSortTable from '../DistSortTable/DistSortTable';
import './StateInfo.css';

const StateInfo = ({selected_state, stateBackClick, district_info, selected_state_total}) => {
    //console.log('Final:', district_info["districtData"]);
    //const districtDataSort = district_info["districtData"];
    //console.log('Dist', district_info);
    let districtDataSort;
    for(let i=0; i < district_info.length; i++) {
        if(district_info[i].state === selected_state) {
            districtDataSort = district_info[i].districtData;
        }
    }
    console.log('Dist', districtDataSort);
    let selected_state_total_info;
    for(let i=0; i < selected_state_total.length; i++) {
        if(selected_state_total[i].state === selected_state) {
            selected_state_total_info = selected_state_total[i];
        }
    }
    console.log(selected_state_total_info);
    const {active, confirmed, deaths, deltaconfirmed, deltadeaths, deltarecovered, recovered} = selected_state_total_info;
    return(
        <div className="cm-stateinfo-container">
            <div className="container">
                <span className="backBtn" onClick={stateBackClick}><i>&#8592;</i> Back</span>
                <div className="cm-bookmark">
                    <ul>
                        <li onClick={stateBackClick}>Home</li>
                        <li>{selected_state}</li>
                    </ul>
                </div>
                <h1 className="txt-center">{selected_state}</h1>
                <div className="Card-Container cm-four-col-eq">
                    <div className="cm-card-item-wrapper">
                        <Card 
                            color="isCherry" 
                            title="Total Cases" 
                            bigHead={confirmed} 
                            smallHead={deltaconfirmed} 
                            shadowPulseColor="isCherryBg"
                        />
                        {/* <MiniGraph graphLabel={getGraphData(seriesData, 'date')} graphData={getGraphData(seriesData, 'dailyconfirmed', 'number')} borderColor="#ff073a" /> */}
                    </div>
                    <div className="cm-card-item-wrapper">
                        <Card 
                            color="isBlue" 
                            title="Active" 
                            bigHead={active}
                            shadowPulseColor="isBlueBg"
                        />
                        {/* <MiniGraph graphLabel={getGraphData(seriesData, 'date')} graphData={getGraphActiveData(seriesData)} borderColor="#007bff" /> */}
                    </div>
                    <div className="cm-card-item-wrapper">
                        <Card 
                            color="isGreen" 
                            title="Recovered" 
                            bigHead={recovered}
                            smallHead={deltarecovered}
                            shadowPulseColor="isGreenBg"
                        />
                        {/* <MiniGraph graphLabel={getGraphData(seriesData, 'date')} graphData={getGraphData(seriesData, 'dailyrecovered', 'number')} borderColor="#28a745" /> */}
                    </div>
                    <div className="cm-card-item-wrapper">
                        <Card 
                            color="isGrey" 
                            title="Deaths" 
                            bigHead={deaths}
                            smallHead={deltadeaths}
                            shadowPulseColor="isGreyBg"
                        />
                        {/* <MiniGraph graphLabel={getGraphData(seriesData, 'date')} graphData={getGraphData(seriesData, 'dailydeceased', 'number')} borderColor="#6c757d" /> */}
                    </div>                    
                </div>
            </div>
            <DistSortTable 
                district_wise_total_data={districtDataSort}
            />
        </div>
    )
}

export default StateInfo;