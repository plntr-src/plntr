import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

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
      validated: false
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
    const form = event.currentTarget;
    console.log('form: ', form);
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    this.setState({ validated: true });
  }

  handleClose() {
    this.setState({ showForm: false });
  }

  render() {
    const { isLoading, showForm, validated } = this.state;

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
            <Modal.Title id="add-plnt-modal"></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form
              inline={ true }
              noValidate
              validated={validated}
              onSubmit={e => this.handleSubmit(e)}
            >
              <Form.Group controlId="sci-name">
                <Form.Label>Scientific name</Form.Label>
                <Form.Control type="genus" placeholder="Genus" />
                <Form.Control type="species" placeholder="Species" />
              </Form.Group>
              <Form.Group controlId="metrics">
                <Form.Label>Metrics</Form.Label>
                <Form.Control type="soil" placeholder="Soil characteristics" />
                <Form.Control type="water_freq" placeholder="Water frequency" />
                <Form.Control type="sun" placeholder="Light conditions" />
              </Form.Group>
              <Form.Group controlId="lists">
                <Form.Label>Ecosystem</Form.Label>
                <Form.Control type="edible_parts" placeholder="Edible parts" />
                <Form.Control type="companions" placeholder="Companions" />
              </Form.Group>

              <Button variant="primary" type="submit">Submit</Button>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}