import React from 'react';
import Button from 'react-bootstrap/Button';
import DropdownMenu from '../dropdownMenu/DropdownMenu';

import Menu from './Menu';
import './foragebar.css';

export default class ForageBar extends React.Component {
  constructor(props) {
    super(props);
    console.log('forage bar props: ', props);
    const options = ['Abc', 'Water', 'Sunlight'];

    this.state = {
      cols: props.cols,
      value: '',
      options,
      currentFilter: options[0],
      shouldDropDn: false
    }
  
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.selectOption = this.selectOption.bind(this);
  } 

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
    fetch('/search').then(result => {
      // update table data
      this.props.updateData(result);
    });
  }

  selectOption(event) {
    console.log('selected an option', event);
  }
  
  render() {

    let boxStyle = {
      textAlign: "center",
      width: "56em"
    }

    if (this.state.value.length > 0) {
      boxStyle.textAlign = "left"
      boxStyle.paddingLeft = "2em"
      boxStyle.width = "54em"
    }

    let dropDownMenuProps = {
      title: this.state.currentFilter,
      options: this.state.options,
      showOptions: this.state.shouldDropDn,
      selectOption: this.selectOption
    }

    return (
      <div className="forage-bar">
        {/* <Menu cols={ this.state.cols } /> */}
        <DropdownMenu {...dropDownMenuProps} />
        <form onSubmit={this.handleSubmit}>
          <label>
            <input className="forage-box" style={ boxStyle } placeholder="What dis plnt?" type="text" value={this.state.value} onChange={this.handleChange} />
            <Button className="forage-btn" type="submit" value=""><img alt="button" className="forage-icon" src="./assets/plntnsun.png" /></Button>
          </label>
        </form>
      </div>
    )
  }
}
