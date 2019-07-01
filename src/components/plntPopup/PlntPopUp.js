import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Input from 'react-bootstrap/InputGroup';
import './plntPopUp.css';

function simulateNetworkRequest() {
  return new Promise(resolve => setTimeout(resolve, 2000));
}

export class PlntPopUp extends React.Component {
  
  constructor(props) {
    super(props);

    console.log('props in plntbar: ', props);
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      isLoading: false,
      showForm: false,
      form: {
        genus: null,
        species: null,
        common_name: null,
        water_freq: null,
        sun: null,
        soil: null,
        hardiness: null,
        edible_parts: null,
        companions: null,
        image: null // eventually upload mult images
      }
    }
  }

  handleClick() {
    this.setState({ isLoading: true }, () => {
      simulateNetworkRequest().then(() => {
        this.setState({ isLoading: false, showForm: true });
      });
    });
  }

  handleSubmit(event) {
    const form = this.state.form;
    this.setState({ showForm: false, form: {
      genus: null,
      species: null,
      common_name: null,
      water_freq: null,
      sun: null,
      soil: null,
      hardiness: null,
      edible_parts: null,
      companions: null,
      image: null // eventually upload mult images      
    }}, async () => {
      return await fetch('/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      })
      .then(response => 
        response.json()
        .then(data => ({
            data: data,
            status: response.status
        }))
        .then(res => {
          console.log('[ added new entry ] res', res);
          if (res.status === 200) {
            console.log('new post id: ', res.data.postId);
            this.props.refresh(true);
          }
        })
      )
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
      <div className='add-plnt-container'>
        <Button 
          className='add-plnt-btn'
          onClick={!isLoading ? this.handleClick : null}
          variant="primary"
          type="button">
          {
            isLoading ? 
            'Loading form…' : 
            <img src='./assets/plus.png' alt='Add plnt!'/>
          }
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
                <h4>Image</h4>
                  <input 
                      type="text" name="image" 
                      placeholder="Image link" value={ form.image || '' } 
                      onChange={this.handleChange} />                
                <h4>Scientific name</h4>
                  <input 
                    type="text" name="genus" 
                    placeholder="Genus" value={ form.genus || '' } 
                    onChange={this.handleChange} />
                  <input 
                    type="text" name="species" 
                    placeholder="Species" value={ form.species || '' } 
                    onChange={this.handleChange} />
                  <input 
                    type="text" name="common_name" 
                    placeholder="Common name" value={ form.common_name || '' } 
                    onChange={this.handleChange} />
                <h4>Metrics</h4>
                  <input 
                    type="number" name="water_freq" 
                    placeholder="Water frequency" value={ form.water_freq || '' } 
                    onChange={this.handleChange} />
                  <input 
                    type="number" name="sun" 
                    placeholder="Light conditions" value={ form.sun || '' } 
                    onChange={this.handleChange} />
                  <input type="text" name="soil" 
                    placeholder="Soil requirements" value={ form.soil || '' } 
                    onChange={this.handleChange} />
                  <input 
                    type="text" name="hardiness" 
                    placeholder="Hardiness zones" value={ form.hardiness || '' } 
                    onChange={this.handleChange} />
                <h4>Ecosystem</h4>
                  <input 
                    type="text" name="edible_parts" 
                    placeholder="Edible parts" value={ form.edible_parts || '' } 
                    onChange={this.handleChange} />
                  <input 
                    type="text" name="companions" 
                    placeholder="Companions" value={ form.companions || '' } 
                    onChange={this.handleChange} />
               </div>
              </form>
            </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleSubmit}>Submit</Button>
            <Button onClick={this.handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}