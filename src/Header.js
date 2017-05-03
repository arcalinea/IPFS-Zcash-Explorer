import React, { Component } from 'react';
import './styles/App.css';
import { Navbar } from 'react-bootstrap';
import SearchForm from './SearchForm';


class Header extends Component {
  searchCallback(value) {
    this.setState({query: value});
    // this.loadData(value);
  }

  render() {
    // <img src={ipfsLogo} className="ipfsLogo" alt="logo" />
    // <img src={zcashLogo} className="zcashLogo" alt="logo" />
    return (
      <div className="App-header">
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="/">IPFS Zcash Explorer</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <SearchForm cb={this.searchCallback.bind(this)}/>
          </Navbar.Collapse>
        </Navbar>
      </div>
    )
  }
}

export default Header;
