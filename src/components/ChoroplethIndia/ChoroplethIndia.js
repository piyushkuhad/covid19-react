import React, { useState } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { scaleQuantile } from 'd3-scale';
import ReactTooltip from 'react-tooltip';

import LinearGradient from '../LinearGradient/LinearGradient.js';
import './ChoroplethIndia.css';

/**
* Courtesy: https://rawgit.com/Anujarya300/bubble_maps/master/data/geography-data/india.topo.json
* Looking topojson for other countries/world? 
* Visit: https://github.com/markmarkoh/datamaps
*/
const INDIA_TOPO_JSON = require('../../assets/Maps/india.topo.json');

const PROJECTION_CONFIG = {
  scale: 350,
  center: [78.9629, 22.5937] // always in [East Latitude, North Longitude]
};

// Red Variants
// const COLOR_RANGE = [
//   '#ffedea',
//   '#ffcec5',
//   '#ffad9f',
//   '#ff8a75',
//   '#ff5533',
//   '#e2492d',
//   '#be3d26',
//   '#9a311f',
//   '#782618'
// ];

const COLOR_RANGE = [
  '#ffe6e6',
  '#ffe6e6',
  '#ffcccc',
  '#ffcccc',
  '#ffcccc',
  '#ffcccc',
  '#ffcccc',
  '#ffb3b3',
  '#ffb3b3',
  '#ffb3b3',
  '#ffb3b3',
  '#ffb3b3',
  '#ff9999',
  '#ff9999',
  '#ff9999',
  '#ff9999',
  '#ff9999',  
  '#ff8080',
  '#ff8080',
  '#ff8080',
  '#ff6666',
  '#ff4d4d',
  '#ff3333',
  '#e60000',
];


const DEFAULT_COLOR = '#e7e7e7';

// const getRandomInt = () => {
//   return parseInt(Math.random() * 100);
// };

const geographyStyle = {
  default: {
    outline: 'none'
  },
  hover: {
    fill: '#ccc',
    transition: 'all 250ms',
    outline: 'none'
  },
  pressed: {
    outline: 'none'
  }
};

/*here*/

function ChoroplethIndia({statewise_total_data}) {

  // will generate random heatmap data on every call
  const getHeatMapData = () => {
    let heatmap = [];
    for(let i=0; i < statewise_total_data.length; i++) {
      heatmap.push({
        id: statewise_total_data[i].statecode,
        state: statewise_total_data[i].state,
        value: Number(statewise_total_data[i].confirmed)
      });
    }
    //console.log('Heat', heatmap)
    return heatmap;
  };

  const [tooltipContent, setTooltipContent] = useState('');
  const [data, setData] = useState(getHeatMapData());

  const gradientData = {
    fromColor: COLOR_RANGE[0],
    toColor: COLOR_RANGE[COLOR_RANGE.length - 1],
    min: 0,
    max: data.reduce((max, item) => (item.value > max ? item.value : max), 0)
  };

  const colorScale = scaleQuantile()
    .domain(data.map(d => d.value))
    .range(COLOR_RANGE);

  const onMouseEnter = (geo, current = { value: 'NA' }) => {
    return () => {
      setTooltipContent(`${geo.properties.name}: ${current.value}`);
    };
  };

  const onMouseLeave = () => {
    setTooltipContent('');
  };

  const onChangeButtonClick = () => {
    setData(getHeatMapData());
  };

  return (
    <div className="full-width-height">
      <div className="container">
        <div className="cm-card-container">
          <h1 className="no-margin center cm-card-head">States and UTs</h1>
          <ReactTooltip>{tooltipContent}</ReactTooltip>
          <ComposableMap
            projectionConfig={PROJECTION_CONFIG}
            projection="geoMercator"
            width={250}
            height={200}
            style={{
                width: "100%",
                height: "auto",
            }}
            data-tip=""
          >
            <Geographies geography={INDIA_TOPO_JSON }>
              {({ geographies }) =>
                geographies.map(geo => {
                  //console.log(geo.id);
                  const current = data.find(s => s.id === geo.id);
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={current ? colorScale(current.value) : DEFAULT_COLOR}
                      style={geographyStyle}
                      onMouseEnter={onMouseEnter(geo, current)}
                      onMouseLeave={onMouseLeave}
                    />
                  );
                })
              }
            </Geographies>
          </ComposableMap>
          <LinearGradient data={gradientData} head="Confirmed Cases" />
        </div>
      </div>
    </div>
  );
}

export default ChoroplethIndia;
