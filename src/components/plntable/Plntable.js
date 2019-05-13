import React from 'react';
import './plntable.css';

const SUN = "sun";
const WATER = "water";

const meter = (num, type) => {
  let icons = [];
  let iconUrl = './assets/water.png';
  if (type === SUN) {
    iconUrl = './assets/sun.png';
  }
  for (let i=num; i > 0; i--) {
    icons.push(<img key={i} className="icon" src={ iconUrl } />)
  }
  return icons;
}

const Card = props => {
  return <div className="plnt-card">
    <div className="row">
      <div className="image-container"><img className="image" src={ props.image } /></div>
      <div className="col text-container">
        {
          props.common_name === '--' ?
          <br /> :
          <div className="common-name">{ props.common_name }</div>
        }
        <div className="sci-name">{ props.genus } { props.species.toLowerCase() }</div>
        <br />
        <div className="row">
          <div className="col">
            <div className="water"><span className="bold">Water</span> { meter(props.water_freq, WATER) }</div>
            <div className="sun"><span className="bold">Sun</span> { meter(props.sun, SUN) }</div>
            <br />
            {
              props.companions.length > 0 ?
              <div>Companions with<div className="bold">{ props.companions.join(', ') }</div></div> :
              <div />
            }
          </div>
          <div className="col">
            <div className="hardiness">Hardiness Zones<span>&nbsp;&nbsp;</span><span className="bold">{ props.hardiness[0] + ' - ' + props.hardiness[props.hardiness.length - 1]  }</span></div>
            <br />
            <div>Soil requirements<div className="bold">{ props.soil.join(', ') }</div></div>
            <br />
            {
              props.edible_parts[0] === '--' ?
              <div /> :
              <div className="edible-parts">Edible parts<span>&nbsp;&nbsp;</span><span className="bold">{ props.edible_parts.join(', ') }</span></div>
            }
          </div>
        </div>
      </div>
    </div>
  </div>
}


export const Plntable = props => {
  return (
    <div className="plntable">
      {
        props.data.map((data, i, items) => <div key={ i } ><Card { ...data } />{
          i === items.length - 1 ?
          <div /> :
          <div className="linebreak" />
        }</div>)
      }
    </div>
  )
}
