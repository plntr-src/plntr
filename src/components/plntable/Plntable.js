import React from 'react';
import './plntable.css';
import { categories } from '../constants';

export const Plntable = (/**  search data from App  */) => {

  const putPlntsOnTable = (plnts) => {
    return plnts.map( (plnt, i) => <td className="row" key={i} >{ /** plnt data */ }</td> )
  }

  return (
    <table className="plntable" >
      <thead>
        <tr>
        { 
          categories.map( (header, i) => <th key={i}>{ header }</th> ) 
        }
        </tr>
      </thead>
      <tbody>
        {
          // insert data putPlntsOnTable(plnts)
        }
      </tbody>
    </table>  
  )
}
