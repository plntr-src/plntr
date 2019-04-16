import React from 'react';
import './foragebar.css';
import { categories } from '../constants';

const Menu = () => {

  return (
    <select>
      {
        categories.map((option, i) => <option>{ option }</option>)
      }
    </select>
  )
}

export default Menu;