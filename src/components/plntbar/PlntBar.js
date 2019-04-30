import React from 'react';

class PlntBar extends React.Component {
  
  constuctor(props) {
    super(props);

    this.submitted = false;
    this.state = {
      value: ''
    }
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    this.submitted = true;
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
    fetch('/add', { /** options  specify post */ }).then(result => {
      console.log('added new plnt: ', result);
      // update table data
      this.setState({ value: '' });
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Plnt" />
        </form>
    )
  }
}