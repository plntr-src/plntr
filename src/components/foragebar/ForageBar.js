import React from 'react';
import Button from 'react-bootstrap/Button';
import DropdownMenu from '../dropdownMenu/DropdownMenu';
import './foragebar.css';

export default class ForageBar extends React.Component {
  constructor(props) {
    super(props);
    console.log('forage bar props: ', props);

    this.state = {
      value: '',
      shouldDropDn: false,
      currentSortType: null
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

  selectOption(option) {
    this.setState({ currentSortType: option, shouldDropDn: false })
  }
  
  render() {

    let boxStyle = {
      textAlign: "center"
    }

    if (this.state.value.length > 0) {
      boxStyle.textAlign = "left"
      boxStyle.paddingLeft = "10px"
    }

    let dropDownMenuProps = {
      shouldShowOptions: this.state.shouldDropDn,
      selectOption: this.selectOption,
      currentOption: this.state.currentSortType
    }

    return (
      <div className="forage-bar">
        <div className="forage-bar-bg" />
        <form onSubmit={this.handleSubmit}>
          <label>
            <Button className="forage-btn" type="submit" value=""><img alt="button" className="forage-icon" src="./assets/plntnsun.png" /></Button>
            <input className="forage-box" style={ boxStyle } placeholder="What dis plnt?" type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
        </form>
        <DropdownMenu {...dropDownMenuProps} />
      </div>
    )
  }
}
