// @flow
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import ForageBar from './components/foragebar/ForageBar';
import { Plntable } from './components/plntable/Plntable.js';
import { PlntBar } from './components/plntbar/PlntBar.js';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data: [],
      cols: []
    }

    this.updateData = this.updateData.bind(this);
    this.refresh = this.refresh.bind(this);
    this.fetchData = this.fetchData.bind(this);
  }

  async fetchDataOnMount() {
    return await fetch("/forage")
      .then(res => res.json())
      .then(json => {
        console.log('fetched forage data', json)
        return json['body']['docs']
      });
  }

  async fetchColsOnMount() {
    return await fetch("/cols")
      .then(response => response.json())
      .then(json => {
        console.log('fetched cols data: ', json)
        return json['body']
      });
  }

  fetchData() {
    // get plnt data
    Promise.all([
      this.fetchDataOnMount(),
      this.fetchColsOnMount()
    ]).then((dataAndCols) => {
      this.setState({
        data: dataAndCols[0],
        cols: dataAndCols[1]
      })
    })
  }

  componentWillMount() {
    this.fetchData();
  }

  updateData(newData) {
    this.setState({
      data: newData
    })
  }

  refresh(flag) {
    console.log('called refresh', flag);
    if (flag) {
      this.fetchData();
    }
  }

  render () {
    if (this.state.data.length === 0 && this.state.cols.length === 0) {
      return <div>tesst</div>
    }

    let { cols, data } = this.state;

    let forageBarProps = {
      cols,
      updateData: this.updateData
    }

    let plntableProps = {
      data,
      cols,
      refresh: this.refresh
    }

    return (
      <div className="plntrplot">
        {/* <ForageBar { ...forageBarProps } /> */}
        <PlntBar refresh={ this.refresh } />
        <Plntable { ...plntableProps } />
      </div>
    )
  }
}

export default App;
