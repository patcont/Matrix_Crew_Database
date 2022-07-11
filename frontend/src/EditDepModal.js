import React, { Component } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";


export class EditDepModal extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    fetch(process.env.REACT_APP_API + "nave/", {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        IdNave: event.target.IdNave.value,
        NombreNave: event.target.NombreNave.value,
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
              Editar Nave
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="Idnave">
                    <Form.Label>IdNave</Form.Label>
                    <Form.Control
                      type="text"
                      name="IdNave"
                      required
                      disabled
                      defaultValue={this.props.depid}
                      placeholder="NombreNave"
                    />
                  </Form.Group> 
                  <Form.Group controlId="NombreNave">
                    <Form.Label>NombreNave</Form.Label>
                    <Form.Control
                      type="text"
                      name="NombreNave"
                      required
                      defaultValue={this.props.depname}
                      placeholder="NombreNave"
                    />
                  </Form.Group>
                  <Form.Group>
                    <Button variant="primary" type="submit" className="mt-2">
                      Actualizar Nave
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
