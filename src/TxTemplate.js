import React, { Component } from 'react';
import './styles/BlockTemplate.css';
import { Table } from 'react-bootstrap';

var dummyJoinsplit = 'z4QkEfzKjpPcGAiui6HBJjBXbp5CjLigviXzhz9ZPmb1hQKkfmm'

class TxTemplate extends Component {
  displayTx(data) {
    console.log("In display tx")
    if(Array.isArray(data)){
      console.log("Tx is a joinsplit, display targets")
      return this.displayJoinsplit(data)
    } else {
      console.log("Display regular tx")
      return this.singleTx(data)
    }
  }

  displayJoinsplit(data){
    return data.map(function(item){
      return (
          <tr>{item['/']}</tr>
      )
    })
  }

  listObjects(data){
    return Object.keys(data).map(function(key){
      console.log('inputs item:', key)
      return (
        <tr key={key}>
          <td> {key} </td>
          <td> {data[key]} </td>
        </tr>
      );
    })
  }

  singleTx(data){
    var inputs = this.listObjects(data['inputs'][0])
    var outputs = this.listObjects(data['outputs'][0])
    return (
      <div>
        <Table striped>
          <tbody>
            <tr>
              <td> version </td>
              <td> {data.version} </td>
            </tr>
            <tr>
              <td> lockTime </td>
              <td> {data.lockTime} </td>
            </tr>
          </tbody>
        </Table>
        <Table striped>
          <thead><tr><td>Inputs</td></tr></thead>
          <tbody> {inputs} </tbody>
        </Table>
        <Table striped>
          <thead><tr><td>Outputs</td></tr></thead>
          <tbody> {outputs} </tbody>
        </Table>
      </div>
    )
  }

  render (){
    var tableData = this.displayTx(this.props.data);

    return (
      <div>
        <h3>Transaction Data</h3>
        <Table striped>
            <tbody>{tableData}</tbody>
        </Table>
      </div>
    )
  }
}

export default TxTemplate;
