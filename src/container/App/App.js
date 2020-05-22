import React, { Component } from 'react';
import './App.css';
import Content from '../Content/Content';
import SideNav from '../../components/SideNav/SideNav';

class App extends Component {
  
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
      <div className="App">
        <SideNav /> 
        <Content />
      </div>
    );
  }
}

export default App;
