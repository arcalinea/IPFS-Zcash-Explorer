import React, { Component } from 'react';
// import logo from './logo.svg';
import Header from './Header';

class Base extends Component {
  render(){
    return (
      <div className="App">
        <Header/>
        {this.props.children}
      </div>
    )
  };
}

export default Base;
