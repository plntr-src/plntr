import React from 'react';
import './plntable.css';
import { categories } from '../constants';

export const Plntable = props => {

  const putPlntsOnTable = (plnts) => {
    const t = plnts.reduce((list, plnt) => {
      let plntDeets = [];      
      for (const k in plnt) {
        let deet = plnt[k];
        if (k === "companions" && deet.length === 0) {
          deet = "--"
        } else if (k === "hardiness" && deet.length > 0) {
          deet = deet.join(", ");
        } else if (k === "image") {
          deet = <img className="plnt-img" src={ deet } />
        }
        plntDeets.push(<td>{ deet }</td>);
      }

      list.push(<tr>{ plntDeets }</tr>)
      return list
    }, [])
    return t;
  }

  console.log('plnts: ', props.data);

  return (
    <table className="plntable" >
      <tr>
      { 
        props.cols.map( (header, i) => <th key={i}>{ header }</th> ) 
      }
      </tr>
      {
        putPlntsOnTable(props.data)
      }
    </table>  
  )
}
