import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import ForageBar from './components/foragebar/ForageBar';
import { Plntable } from './components/plntable/Plntable.js';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data: [],
      cols: []
    }

    this.updateData.bind(this);
  }

  componentWillMount() {
    // get plnt data
    const setTable = await fetch("/").then(data => { 
      this.setState({data})
     });
    const getCols = await fetch("/cols").then(cols => {
      this.setState({cols})
    });
  }

  updateData(newData) {
    this.setState({
      data: newData
    })
  }

  render () {
    if (this.state.data.length === 0) {
      return <div />
    }

    let { cols, data } = this.state;

    let forageBarProps = {
      cols,
      updateData: this.updateData
    }

    let plntableProps = {
      data,
      cols
    }

    return (
      <div>
        <ForageBar { ...forageBarProps } />
        <Plntable { ...plntableProps } />
      </div>
    )
  }
}

export default App;
