import React from 'react';
import './plntable.css';
import { categories } from '../constants';

export const Plntable = props => {

  const putPlntsOnTable = (plnts) => {
    return plnts.map( (plnt, i) => <td className="row" key={i} >{ /** plnt data */ }</td> )
  }

  return (
    <table className="plntable" >
      <thead>
        <tr>
        { 
          props.cols.map( (header, i) => <th key={i}>{ header }</th> ) 
        }
        </tr>
      </thead>
      <tbody>
        {
          putPlntsOnTable(props.data)
        }
      </tbody>
    </table>  
  )
}
