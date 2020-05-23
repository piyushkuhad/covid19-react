import React, { Component } from 'react';
import TotalCases from '../../components/TotalCases/TotalCases';
// import ContentTable from '../../components/ContentTable/ContentTable';
import './Content.css';
import ListStyleLoader from '../../components/ListStyleLoader/ListStyleLoader';
import SortTable from '../../components/SortTable/SortTable';
import ChoroplethIndia from '../../components/ChoroplethIndia/ChoroplethIndia';

class Content extends Component {
  constructor(){
    super();
    this.state = {
      cases_time_series: '',
      statewise_total_data: '',
      country_total_data: ''
    }
  }

  componentDidMount(){
    fetch('https://api.covid19india.org/data.json')
    .then(response => response.json())
    .then(data => {
      this.setState({cases_time_series: data.cases_time_series, statewise_total_data: data.statewise, country_total_data: data.statewise[0]});
      // this.setState({statewise_total_data: data.statewise});
      // this.setState({country_total_data: data.statewise[0]});
      //console.log(data.data)
    });
  }
  
  render(){
    return this.state.statewise_total_data.length ?
    (
      <div className="Content" style={{paddingBottom: 1000}}>
        <TotalCases totalData={this.state.country_total_data} seriesData={this.state.cases_time_series}/>
        {/* <ContentTable statewise_total_data={this.state.statewise_total_data} test="test"/> */}
        <SortTable statewise_total_data={this.state.statewise_total_data.slice(1)}/>
        <ChoroplethIndia statewise_total_data={this.state.statewise_total_data.slice(1)} />
      </div>
    )
    :
    (
      <div className="Content hv-center">
        <ListStyleLoader />
        <ListStyleLoader />
      </div>
    )
  }
}

export default Content;
