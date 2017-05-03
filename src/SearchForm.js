import React, { Component } from 'react';
import './styles/App.css';
import {FormGroup, FormControl, Button, Navbar} from 'react-bootstrap';

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.cb(this.state.value)
  }

  getValidationState() {
    const length = this.state.value.length;
    if (length > 30) return 'success';
    else if (length > 10) return 'warning';
    else if (length > 0) return 'error';
  }

  render() {
    var placeholder = 'Search by IPFS hash'
    return (
      <Navbar.Form pullRight onSubmit={this.handleSubmit}>
        <FormGroup controlId="formBasicText" validationState={this.getValidationState()}>
          <FormControl type="text" value={this.state.value} placeholder={placeholder} onChange={this.handleChange} />
          <FormControl.Feedback />
        </FormGroup>
        <Button className="btn btn-large centerButton" type="submit">Search</Button>
      </Navbar.Form>
    );
  }
}

export default SearchForm;
