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
    icons.push(<img key={i} alt={type} className="icon" src={ iconUrl } />)
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
      <div className="row modicons">
        <button onClick={props.handleDelete.bind(null, { id: props.id, refresh: props.refresh })} className="delete-btn"><img className="icon delete" alt="delete" src="./assets/trash.png" /></button>
        <button className="edit-btn"><img className="icon edit" alt="edit" src="./assets/edit.png" /></button>
      </div>
    </div>
  </div>
}


export class Plntable extends React.Component {

  constructor(props) {
    super(props)

    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete(props) {

    const { id, refresh } = props;

    return fetch('/delete', { 
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id })
    })
    .then(response => 
      response.json().then(data => ({
          data: data,
          status: response.status
      })
    ).then(res => {
        console.log('[deleted entry] status: ', res.status, 'data: ', res.data)
        // console.log('props of plntable: ', this.props);
        console.log('status good? ', res.status === 'success', res.status)
        if (res.status === 200) {
          // refresh ?
          refresh(true);
        }
    }));
  }

  render() {

    let cardProps = {
      handleDelete: this.handleDelete,
      refresh: this.props.refresh
    }

    return (
      <div className="plntable">
        {
          this.props.data.map((data, i, items) => <div key={ i } ><Card { ...{...data, ...cardProps} } />{
            i === items.length - 1 ?
            <div /> :
            <div className="linebreak" />
          }</div>)
        }
      </div>
    )
  }
}
