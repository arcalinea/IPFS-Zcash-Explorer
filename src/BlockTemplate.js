import React, { Component } from 'react';
import './styles/BlockTemplate.css';
import { Table } from 'react-bootstrap';
import TxTemplate from './TxTemplate';


class BlockTemplate extends Component {
    constructor(props) {
      super(props);

      this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e){
      e.preventDefault();
      console.log("The link was clicked, search target:", e.target.getAttribute('href'))
      var hash = e.target.getAttribute('href');
      this.props.cb(hash)
    }

    actionLink(hash){
      return <a href={hash} onClick={this.handleClick}>{hash}</a>
    }

    displayBlock(data) {
      return Object.keys(data).map(function(key) {
        // handle the column data within each row
        var value;
        if (key === 'parent' || key === 'tx'){
          value = this.actionLink(data[key]['/']);
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
        var data = this.props.data;
        var tableData;
        if(data.inputs || data.outputs || data.joinSplits) {
          return (
              <TxTemplate data={data}/>
          );
        }
        else if(data.difficulty){
          tableData = this.displayBlock(data)
          return (
            <div>
              <h3>Block Data</h3>
              <Table striped responsive="true">
                  <tbody>{tableData}</tbody>
              </Table>
            </div>
          );
        }
        else if(Array.isArray(data)){
          return (
              <TxTemplate data={data}/>
          );
        }
    }
};


export default BlockTemplate;
