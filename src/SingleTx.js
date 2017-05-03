import React, { Component } from 'react';
import './styles/BlockTemplate.css';
import { Table } from 'react-bootstrap';

class SingleTx extends Component {
  constructor(props){
    super(props)
    console.log("Props in SingleTx", this.props)
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
    // rendering data from TxTemplate
    var tableData = this.singleTx(this.props.data);

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

export default SingleTx;
