import React, { Component } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";


export class EditEmpModal extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    fetch(process.env.REACT_APP_API + "tripulante/", {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        IdTripulante: event.target.IdTripulante.value,
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
              Editar Tripulante
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="IdTripulante">
                    <Form.Label>IdTripulante</Form.Label>
                    <Form.Control
                      type="text"
                      name="IdTripulante"
                      required
                      disabled
                      defaultValue={this.props.empid}
                      placeholder="NombreTripulante"
                    />
                  </Form.Group> 
                  <Form.Group controlId="NombreTripulante">
                    <Form.Label>NombreTripulante</Form.Label>
                    <Form.Control
                      type="text"
                      name="NombreTripulante"
                      required
                      defaultValue={this.props.empname}
                      placeholder="NombreTripulante"
                    />
                  </Form.Group>
                  <Form.Group controlId="NaveTripulante">
                    <Form.Label>NaveTripulante</Form.Label>
                    <Form.Control
                      type="text"
                      name="NaveTripulante"
                      required
                      defaultValue={this.props.empname}
                      placeholder="NaveTripulante"
                    />
                  </Form.Group>
                  
                  <Form.Group>
                    <Button variant="primary" type="submit" className="mt-2">
                      Actualizar Tripulante
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
