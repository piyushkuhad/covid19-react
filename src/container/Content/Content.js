import React, { Component } from 'react';
import TotalCases from '../../components/TotalCases/TotalCases';
import './Content.css';

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
      this.setState({latest_data: data.cases_time_series});
      this.setState({statewise_total_data: data.statewise});
      this.setState({country_total_data: data.statewise[0]});
      //console.log(data.data)
    });
  }
  
  render(){
    return (
      <div className="Content">
        <TotalCases totalData={this.state.country_total_data}/>
      </div>
    );
  }
}

export default Content;
