import React from 'react';
import Button from 'react-bootstrap/Button';

import Menu from './Menu';
import './foragebar.css';

export default class ForageBar extends React.Component {
  constructor(props) {
    super(props);
    console.log('forage bar props: ', props);
    this.state = {
      cols: props.cols,
      value: ''
    }
  
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  } 

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
    fetch('/search', { /** options */ }).then(result => {
      // update table data
      this.props.updateData(result);
    });
  }
  
  render() {

    let boxStyle = {
      textAlign: "center",
      width: "56em"
    }

    if (this.state.value.length > 0) {
      boxStyle.textAlign = "left"
    }

    return (
      <div className="forage-bar">
      <Menu cols={ this.state.cols } />
        <form onSubmit={this.handleSubmit}>
          <label>
            <input className="forage-box" style={ boxStyle } placeholder="Roses are red, violets are blue, but what aboot dis plnt?" type="text" value={this.state.value} onChange={this.handleChange} />
            <button className="forage-btn" type="submit" value=""><img className="forage-icon" src="./assets/plntnsun.png" /></button>
          </label>
        </form>
      </div>
    )
  }
}
