import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Input from 'react-bootstrap/InputGroup';

function simulateNetworkRequest() {
  return new Promise(resolve => setTimeout(resolve, 2000));
}

export class PlntBar extends React.Component {
  
  constructor(props) {
    super(props);

    this.handleAdd = this.handleAdd.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      isLoading: false,
      showForm: false,
      form: {
        genus: null,
        species: null,
        water_freq: null,
        sun: null,
        soil: null,
        hardiness: null,
        edible_parts: null,
        companions: null
        // images: null // eventually upload mult images
      }
    }
  }

  handleAdd() {
    this.setState({ isLoading: true }, () => {
      simulateNetworkRequest().then(() => {
        this.setState({ isLoading: false, showForm: true });
      });
    });
  }

  handleSubmit(event) {
    const form = this.state.form;
    this.setState({ showForm: !this.state.showForm }, async () => {
      return await fetch('/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      }).then(response => {
        return response.json();
      })
    });
  }

  handleClose() {
    this.setState({ showForm: false });
  }

  handleChange(event) {
    const target = event.target;
    let form = this.state.form;
    form[target.name] = target.value;
    this.setState({ form });
  }

  render() {
    console.log('this state: ', this.state);
    let { isLoading, showForm, validated, form } = this.state;

    return (
      <div>
        <Button 
          onClick={!isLoading ? this.handleAdd : null}
          variant="primary" 
          type="button">
          {isLoading ? 'Loading form…' : 'Add plnt!'}
        </Button>

        <Modal
          show={showForm} onHide={this.handleClose}
          size="lg"
          aria-labelledby="add-plnt-modal"
          centered
        >
            <Modal.Header closeButton>
              <Modal.Title id="add-plnt-modal">Add plnt info!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form>
               <div className="plnt-info">
                <h4>Scientific name</h4>
                  <input 
                    type="text" name="genus" 
                    placeholder="Genus" value={ form.genus || '' } 
                    onChange={this.handleChange.bind(this)} />
                  <input 
                    type="text" name="species" 
                    placeholder="Species" value={ form.species || '' } 
                    onChange={this.handleChange.bind(this)} />
                <h4>Metrics</h4>
                  <input 
                    type="text" name="water_freq" 
                    placeholder="Water frequency" value={ form.water_freq || '' } 
                    onChange={this.handleChange.bind(this)} />
                  <input 
                    type="text" name="sun" 
                    placeholder="Light conditions" value={ form.sun || '' } 
                    onChange={this.handleChange.bind(this)} />
                  <input type="text" name="soil" 
                    placeholder="Soil requirements" value={ form.soil || '' } 
                    onChange={this.handleChange.bind(this)} />
                  <input 
                    type="text" name="hardiness" 
                    placeholder="Hardiness zones" value={ form.hardiness || '' } 
                    onChange={this.handleChange.bind(this)} />
                <h4>Ecosystem</h4>
                  <input 
                    type="text" name="edible_parts" 
                    placeholder="Edible parts" value={ form.edible_parts || '' } 
                    onChange={this.handleChange.bind(this)} />
                  <input 
                    type="text" name="companions" 
                    placeholder="Companions" value={ form.companions || '' } 
                    onChange={this.handleChange.bind(this)} />
               </div>
              </form>
            </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleSubmit.bind(this)}>Submit</Button>
            <Button onClick={this.handleClose.bind(this)}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}