import React from 'react';
import PropTypes from 'prop-types';

class DropdownMenu extends React.Component {

  constructor(props) {
    super(props);

    /**
     * title: string
     * options: string[]
     * showOptions: boolean
     */

    this.state = {...props}
  }

  render() {
    return <div>
      <div className='filter-title'>{ this.state.title }</div>
      {
        this.state.showOptions ?
        <ul className='options'>
            {
              this.state.options.map(option => <li className='dp-dn-opt'>
                <button onClick={this.state.selectOption}>{option}</button>
              </li>)
            }
        </ul> :
        <div />
      }
    </div>
  }
}

DropdownMenu.propTypes = {
  title: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string),
  showOptions: PropTypes.bool,
  selectOption: PropTypes.func
};

export default DropdownMenu;