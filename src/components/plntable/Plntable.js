import React from 'react';
import './plntable.css';
import { categories } from '../constants';

const SUN = "sun";
const WATER = "water";

const meter = (num, type) => {
  let icons = [];
  let iconUrl = './assets/water.png';
  if (type === SUN) {
    iconUrl = './assets/sun.png';
  }
  for (let i=num; i > 0; i--) {
    icons.push(<img className="icon" src={ iconUrl } />)
  }
  return icons;
}

const Card = props => {
  console.log('card props: ', props);
  return <div className="plnt-card">
    <div className="row card-content">
      <div className="image-container"><img className="image" src={ props.image } /></div>
      <div className="col">
        <div className="sci-name">{ props.genus } { props.species.toLowerCase() }</div>
        {
          props.common_name === '--' ?
          <br /> :
          <div className="common-name">{ props.common_name }</div>
        }
        <br />
        <div className="row">
          <div className="col metrics">
            <div className="meter-container water"><span className="bold">Water</span> { meter(props.water_freq, WATER) }</div>
            <div className="meter-container sun"><span className="bold">Sun</span> { meter(props.sun, SUN) }</div>
            <br />
            <div>Soil requirements <span className="bold">{ props.soil.join(', ') }</span></div>
          </div>
          <div className="col">
            <div className="hardiness">Hardiness Zones <span className="bold">{ props.hardiness[0] + ' - ' + props.hardiness[props.hardiness.length - 1]  }</span></div>
            <br />
            <div className="edible-parts">Edible parts <span>&nbsp;&nbsp;</span><span className="bold">{ props.edible_parts.join(', ') }</span></div>
          </div>
        </div>
        {
          props.companions.length > 0 ?
          <div className="companions-list">Companions with <span className="bold">{ props.companions.join(', ') }</span></div> :
          <div />
        }
      </div>
    </div>
  </div>
}


export const Plntable = props => {

  console.log('plnts: ', props.data);

  return (
    <div className="plntable">
      {
        props.data.map((data, i) => <Card key={ i } { ...data } />)
      }
    </div>
  )
}
