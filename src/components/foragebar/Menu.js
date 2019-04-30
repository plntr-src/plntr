import React from 'react';
import './foragebar.css';
import { categories } from '../constants';

const Menu = cols => {

  return (
    <select>
      {
        cols.map((option, i) => <option>{ option }</option>)
      }
    </select>
  )
}

export default Menu;