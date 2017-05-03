import React, { Component } from 'react';
// import logo from './logo.svg';
import ipfsLogo from '../public/ipfs-logo.png';
import zcashLogo from '../public/zcash-logo.png';
import './styles/App.css';
import BlockTemplate from './BlockTemplate';
import TxTemplate from './TxTemplate';
import { Navbar, Button } from 'react-bootstrap';
import {BrowserRouter as Router, browserHistory} from 'react-router-dom';
import {LoadData} from './helpers';
import Header from './Header';


var dummyData = {
    version: '4',
    parent: 'hPwo48Df84fLEfkjx3',
    tx: 's3o452iSfaud4De6oijf',
    time: 'Mon, 23 Dec 2016, 20:43:23 GMT',
    difficulty: '4876452',
    nonce:'+AEAAAAAAAAA',
    solution: 'ALEQ25eURDJOE'
  };

var dummyQuery = 'z4QJh988wttY4rTJgLpmx57E3gEbun1vXmMVpBAwbA4pzE8MkLw';
// console.log(LoadData(this.state.query))

class App extends Component {
  constructor(){
    super();
    this.state = {
        data: '',
        query: dummyQuery
    };
  };

  componentWillMount(){
    console.log("preparing to call loaddata")
    var thisState = this;
    LoadData(this.state.query, function(res){
      console.log("Success! Response:", res)
      thisState.setState({data : res});
    });
  }

  goBack(e){
    console.log("hist", Router.History)
    if (this.history.state === null) {
      e.preventDefault();
    } else {
      this.history.goBack();
    }
  }

  render() {
    console.log("APP ENTRY POINT: ", this.state.data)
    if (this.state.data === ''){
      return (
          <div className="loading">
            <img src={ipfsLogo}/>
          </div>
      )
    } else {
      console.log("APP: Displaying Block Template", this.state.data)
      return (
          <div className="data-table">
            <BlockTemplate data={this.state.data} />
          </div>
      )
    }
  }
}

export default App;
