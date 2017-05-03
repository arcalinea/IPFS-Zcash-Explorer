import React, { Component } from 'react';
import './styles/BlockTemplate.css';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {browserHistory} from 'react-router';
import {LoadData} from './helpers';
import ipfsLogo from '../public/ipfs-logo.png';

// load next block and tx data while on this page
var dummyQuery = 'z4QJh988wttY4rTJgLpmx57E3gEbun1vXmMVpBAwbA4pzE8MkLw';

class BlockTemplate extends Component {
    constructor(props) {
      super(props);
      var block = props.match.params.block
      console.log("BLOCK hash", block)
      this.state = {
        txData: '',
        data: '',
        query: block
      }
      if(block === undefined){
        this.state.query = dummyQuery;
      }
      console.log("This state in blocktemplate constructor", this.state)
    }

    componentWillMount(){
      console.log("preparing to call loaddata")
      var thisState = this;
      LoadData(this.state.query, function(res){
        thisState.setState({data : res});
      });
    }

    // componentDidMount(){
    //   var thisState = this;
    //   console.log("this state data", this.state.data)
    //   var hash = this.state.data['tx']['/']
    //   console.log("Loading data for tx after block component mounted")
    //   LoadData(hash, function(res){
    //     console.log("Success in pre-loading TX Data! Response:", res)
    //     thisState.setState({txData: res})
    //     console.log("This props in loaddata", thisState.state)
    //   });
    //   // console.log("Thisprops.state txdata", this.state.txData)
    // }

    // loadTx(hash){
    //   var thisState = this;
    //   LoadData(hash, function(res){
    //     console.log("Success in pre-loading TX Data! Response:", res)
    //     return {
    //       res
    //     }
    //   });
    // }

    displayBlock(data) {
      return Object.keys(data).map(function(key) {
        // handle the column data within each row
        var value, hash, path;
        if (key === 'parent'){
          hash = data[key]['/'];
          path = "/block/" + hash
          value = <Link to={path}>{hash}</Link>
          // value = this.actionLink(data[key]['/']);
        } else if (key === 'tx'){
          hash = data[key]['/'];
          path = "/tx/" + hash
          // onClick={this.loadTx(hash)}
          // value = <Link to={{pathname: path, txstate: this.state.txData}}>{hash}</Link>
          value = <Link to={path}>{hash}</Link>
        } else {
          value = data[key]
        }
        return (
          <tr key={key}>
            <td> {key} </td>
            <td> {value} </td>
          </tr>
        );
      }.bind(this));
    }

    render () {
      if (this.state.data === ''){
        return (
            <div className="loading">
              <img alt="logo" src={ipfsLogo}/>
            </div>
        )
      } else {
        var tableData;
        console.log("In BlockTemplate display data", this.state.data)
        tableData = this.displayBlock(this.state.data)
        return (
            <div className="data-table">
              <h3>Block Data</h3>
              <Table striped>
                  <tbody>{tableData}</tbody>
              </Table>
            </div>
        )
      }
    }
};


export default BlockTemplate;
