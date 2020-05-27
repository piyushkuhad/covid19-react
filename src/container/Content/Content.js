import React, { Component } from 'react';
import TotalCases from '../../components/TotalCases/TotalCases';
// import ContentTable from '../../components/ContentTable/ContentTable';
import './Content.css';
import ListStyleLoader from '../../components/ListStyleLoader/ListStyleLoader';
import SortTable from '../../components/SortTable/SortTable';
import ChoroplethIndia from '../../components/ChoroplethIndia/ChoroplethIndia';
//import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import StateInfo from '../../components/StateInfo/StateInfo';

class Content extends Component {
  constructor(){
    super();
    this.state = {
      cases_time_series: '',
      statewise_total_data: '',
      country_total_data: '',
      district_info: '',
      state_click: false,
      stateCode_route: '',
      selected_state: '',
      stateBackClick: false
    }
  }

  componentDidMount(){
    fetch('https://api.covid19india.org/data.json')
    .then(response => response.json())
    .then(data => {
      this.setState(
        {
          cases_time_series: data.cases_time_series, 
          statewise_total_data: data.statewise, 
          country_total_data: data.statewise[0]
        }
      );
    });
  
    // fetch('https://api.covid19india.org/state_district_wise.json')
    fetch('https://api.covid19india.org/v2/state_district_wise.json')
    .then(response => response.json())
    .then(data => {
      this.setState({district_info: data});
    });
  }

  stateClick = (e) => {
    this.setState(
      {
        state_click: true, 
        stateCode_route: e.target.getAttribute('statecode'),
        selected_state: e.target.innerText,
        stateBackClick: true
      }
    )
    //console.log(district_info[e.target.innerText]);
    //console.log(e.target.getAttribute('statecode'));
    //console.log(stateCode_route);
  }

  stateBackClick = (e) => {
    this.setState(
      {
        state_click: false,
        stateCode_route: '',
        selected_state: '',
        stateBackClick: false
      }
    )
  }
  
  render(){
    //console.log('This: ', this.state.state_click + ' ' + this.state.stateCode_route);
    if(this.state.statewise_total_data.length) {
      return (
        <div className="Content" style={{paddingBottom: 30}}>
          {
           !this.state.state_click ? 
            <div>
              <TotalCases stateBackClick = {this.state.state_click} totalData={this.state.country_total_data} seriesData={this.state.cases_time_series}/>
                {/* <ContentTable statewise_total_data={this.state.statewise_total_data} test="test"/> */}
              <SortTable 
                statewise_total_data={this.state.statewise_total_data.slice(1)}
                stateClick = {this.stateClick}
                isState = 'true'
              />
              <ChoroplethIndia statewise_total_data={this.state.statewise_total_data.slice(1)} />
            </div>
           :
            <div>
              <StateInfo
                selected_state = {this.state.selected_state} 
                stateBackClick = {this.stateBackClick}
                district_info = {this.state.district_info}
                selected_state_total = {this.state.statewise_total_data}
              />
            </div>
          }
          
        </div>
      )
    }
    else {
      return (
        <div className="Content hv-center">
          <ListStyleLoader />
          <ListStyleLoader />
        </div>
      )
    }
  }
}

export default Content;
