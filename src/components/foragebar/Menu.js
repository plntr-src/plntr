import React from 'react';
import './foragebar.css';
import { categories } from '../constants';

const Menu = props => {
  return (
    <select>
      {
        props.cols.map((option, i) => <option key={i}>{ option }</option>)
      }
    </select>
  )
}

export default Menu;