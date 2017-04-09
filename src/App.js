import React, { Component } from 'react';
// import logo from './logo.svg';
import ipfsLogo from '../public/ipfs-logo.png';
import zcashLogo from '../public/zcash-logo.png';
import './styles/App.css';
import BlockTemplate from './BlockTemplate';
import SearchForm from './SearchForm';
import { Navbar } from 'react-bootstrap';



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

class App extends Component {
  constructor(){
    super();
    this.state = {
        data: dummyData,
        query: dummyQuery
    };
  };

  loadData (newQuery) {
    console.log('loading data')
    var request = new XMLHttpRequest();
    console.log('newQuery', newQuery)
    request.open('GET', "http://107.170.229.52:8080/api/v0/dag/get/" + newQuery, true);
        request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        //this callback gets called when the server responds to the ajax call
        request.onreadystatechange = function(){
            if (request.readyState === 4 && request.status === 200){
                var returnedJson = JSON.parse(request.responseText);
                console.log('returned json', returnedJson)
                //this is where you would want to run setState if you need the returned Json for it.
                this.setState({data: returnedJson});
            }
            else if (request.readyState === 4 && request.status !== 200){
                alert('error');
            }
        }.bind(this);
        request.send();
  }

  componentWillMount () {
    this.loadData(this.state.query);
  }

  searchCallback(value) {
    this.setState({query: value});
    this.loadData(value);
  }

  displayHeader(){
    // <img src={ipfsLogo} className="ipfsLogo" alt="logo" />
    // <img src={zcashLogo} className="zcashLogo" alt="logo" />
    return (
      <div className="App-header">
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#">IPFS Zcash Explorer</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <SearchForm cb={this.searchCallback.bind(this)}/>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }

  render() {
    var header = this.displayHeader()
    return (
      <div className="App">
        {header}
        <div className="data-table">
          <BlockTemplate data={this.state.data} cb={this.searchCallback.bind(this)}/>
        </div>
      </div>
    );
  }
}

export default App;
