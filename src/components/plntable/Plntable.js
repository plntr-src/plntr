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
    icons.push(<img key={i} alt={type} className={`${ type }-icon`} src={ iconUrl } />)
  }
  return icons;
}

const Card = props => {
  return <div className="plnt-card">
    <div className="col content-container">
      <div className="image-container"><img className="image" src={ props.image } /></div>
      <div className="text-container col">
        {
          !props.common_name || props.common_name === '--' ? 
          <br /> :
          <div className="common-name">{ props.common_name }</div>
        }
        <div className="sci-name">{ props.genus } { props.species.toLowerCase() }</div>
        {
          !props.variety || props.variety === '--' ?
          <div /> :
          <div className="common-name">{ props.variety.toLowerCase() }</div>
        }
        <div className="row metrics">
          <div className="col">
            <div className="bold">Water</div>
            <div className="icons">{ meter(props.water_freq, WATER) }</div>
          </div>
          <div className="col">
            <div className="bold">Zone</div>
            <div className="hardiness">{ props.hardiness[0] + ' - ' + props.hardiness[props.hardiness.length - 1]  }</div>
          </div>
          <div className="col">
            <div className="bold">Sun</div>
            <div className="icons">{ meter(props.sun, SUN) }</div>
          </div>
        </div>
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
          this.props.data.map((data, i, items) => <Card { ...{...data, ...cardProps} } />)
        }
      </div>
    )
  }
}
