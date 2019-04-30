import React from 'react';
import './plntable.css';
import { categories } from '../constants';

export const Plntable = (data, cols) => {

  const putPlntsOnTable = (plnts) => {
    return plnts.map( (plnt, i) => <td className="row" key={i} >{ /** plnt data */ }</td> )
  }

  return (
    <table className="plntable" >
      <thead>
        <tr>
        { 
          cols.map( (header, i) => <th key={i}>{ header }</th> ) 
        }
        </tr>
      </thead>
      <tbody>
        {
          putPlntsOnTable(data)
        }
      </tbody>
    </table>  
  )
}
