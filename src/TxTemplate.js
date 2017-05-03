import React, { Component } from 'react';
import './styles/BlockTemplate.css';
import { Table } from 'react-bootstrap';
import {LoadData} from './helpers';
import SingleTx from './SingleTx';
import ipfsLogo from '../public/ipfs-logo.png';

// import { BrowserRouter as Router, Route } from 'react-router-dom'
// var dummyJoinsplit = 'z4QkEfzKjpPcGAiui6HBJjBXbp5CjLigviXzhz9ZPmb1hQKkfmm'

class TxTemplate extends Component {
  constructor(props){
    super(props)
    console.log("PROPS IN CONSTRUCTOR", props)
    var txid = props.match.params.txid
    console.log("this props params match TXID", txid)
    console.log("this props txstate", props.location.txstate)
    // console.log("IN TX, this state data", this.state.data)
    // console.log("Did txData come through props?", this.props.txData)
    this.state = {
      data: ''
    }
  };

  componentWillMount(){
    console.log("IN TX: preparing to call loaddata")
    var thisState = this;
    LoadData(this.props.match.params.txid, function(res){
      console.log("Success! Response for txData:", res)
      thisState.setState({data : res});
      console.log("This State data", thisState.data)
    });
  }

  displayTx(data) {
    console.log("In display tx, data", data)
    if(Array.isArray(data)){
      console.log("Tx is a joinsplit, display targets", data)
      return this.displayJoinsplit(data)
    } else {
      console.log("Display regular tx", data)
      return <SingleTx data={data} />
    }
  }

  displayJoinsplit(data){
    return data.map(function(item){
      return (
          <tr>{item['/']}</tr>
      )
    })
  }

  render (){
    // console.log("in render, this props txData", this.props.location.txstate)
    // need to fetch data for this

    if (this.state.data === ''){
      console.log("In render of TxTemplate, DATA HAS NOT ARRIVED")
      return (
          <div className="loading">
            <img alt="logo" src={ipfsLogo}/>
          </div>
      ) // Need to load data if navigate to this url through react router
    } else {
      var tableData = this.displayTx(this.state.data);
      return (
        <div className="data-table">
          <Table striped>
            <tbody>{tableData}</tbody>
          </Table>
        </div>
      )
    }
  }
}

export default TxTemplate;
