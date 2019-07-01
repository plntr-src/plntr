import React from 'react';
import PropTypes from 'prop-types';
import { sortTypes } from '../constants.js';
import './dropdownMenu.css';
import isEqual from "react-fast-compare";

class DropdownMenu extends React.Component {

  constructor(props) {
    super(props);

    this.optionPlaceholder = "SORT BY";

    this.state = { 
      ...props, 
      options: sortTypes,
      currentOption: this.optionPlaceholder
    }

    this.toggleOptions = this.toggleOptions.bind(this);
  }

  toggleOptions() {
    this.setState({ shouldShowOptions: !this.state.shouldShowOptions })
  }

  componentDidUpdate(prevProps) {
    if (!isEqual(this.props, prevProps)) {
      this.setState(this.props)
    }
  }

  render() {
    return <div>
      <div className='opt current-opt' onClick={ this.toggleOptions }>{ this.state.currentOption }</div>
      {
        this.state.shouldShowOptions ?
        <div className='options'>
          {
            this.state.options.map(option => <div className='opt dp-dn-opt'>
              <button onClick={() => this.state.selectOption(option) }>{ option }</button>
            </div>)
          }
        </div> :
        <div />
      }
    </div>
  }
}

DropdownMenu.propTypes = {
  title: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string),
  shouldShowOptions: PropTypes.bool,
  selectOption: PropTypes.func
};

export default DropdownMenu;