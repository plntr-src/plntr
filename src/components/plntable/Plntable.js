import React from 'react';
import './plntable.css';

export const Plntable = (/**  search data from App  */) => {

  const headers = [
    "Genus",
    "Species",
    "Plnt", // pic. eventually, "Plnt Lf", "Plnt Flör", "Plnt Fruit"
    "Water Frequency",
    "Soil Type",
    "Soil pH",
    "Hardiness Zone"
  ];

  const putPlntsOnTable = (plnts) => {
    return plnts.map( (plnt, i) => <td className="row" key={i} >{ /** plnt data */ }</td> )
  }

  return (
    <table className="plntable" >
      <thead>
        <tr>
        { 
          headers.map( (header, i) => <th key={i}>{ header }</th> ) 
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
