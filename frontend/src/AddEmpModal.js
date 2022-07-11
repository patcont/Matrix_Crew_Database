import React, { Component } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";


export class AddEmpModal extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    fetch(process.env.REACT_APP_API + "tripulante/", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        IdTripulante: null,
        NombreTripulante: event.target.NombreTripulante.value,
        NaveTripulante: event.target.NaveTripulante.value,
      })
    })
      .then((res) => res.json())
      .then(
        (result) => {
          alert(result);
        },
        (error) => {
          alert("Failed");
        }
      )
  }
  render() {
    return (
      <div className="container">
        <Modal
          {...this.props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Agregar Tripulante
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Group controlId="NombreTripulante">
                    <Form.Label>Nombre Tripulante</Form.Label>
                    <Form.Control
                      type="text"
                      name="NombreTripulante"
                      required
                      placeholder="Nombre Tripulante"
                    />
                  </Form.Group>
                  <Form.Group controlId="NaveTripulante">
                    <Form.Label>Nave Tripulante</Form.Label>
                    <Form.Control
                      type="text"
                      name="NaveTripulante"
                      required
                      placeholder="Nave Tripulante"
                    />
                  </Form.Group>
                  
                  <Form.Group>
                    <Button variant="primary" type="submit" className="mt-2">
                      Agregar Tripulante
                    </Button>
                  </Form.Group>
                  
                </Form>
              </Col>
            </Row>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="danger" onClick={this.props.onHide}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
