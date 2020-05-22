import React, { Component } from 'react';
//import logo from './container/logo.svg';
import './App.css';
import coronalogo from '../assets/Images/coronavirus.png';

class App extends Component {
  
  constructor(){
    super();
    this.state = {
      latest_data: ''
    }
  }

  componentDidMount(){
    fetch('https://api.rootnet.in/covid19-in/stats/latest')
    .then(response => response.json())
    .then(data => {
      this.setState({latest_data: data.data});
      console.log(data.data)
    });
  }
  
  render(){
    return (
      <div className="App">
        <h1 className="mainHead">C<img src={coronalogo} alt="corona" />vid-19</h1>
      </div>
    );
  }
}

export default App;
