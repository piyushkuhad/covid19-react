import React, { Component } from 'react';
import './App.css';
import Content from '../Content/Content';
import SideNav from '../../components/SideNav/SideNav';

class App extends Component {  
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
