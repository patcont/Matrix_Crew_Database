import React, { Component } from "react";
import { Table } from "react-bootstrap";
import { Button, ButtonToolbar } from "react-bootstrap";
import { AddEmpModal } from "./AddEmpModal";
import { EditEmpModal } from "./EditEmpModal";
import Slide from 'react-reveal/Slide';

export class Tripulante extends Component {
  constructor(props) {
    super(props);
    this.state = { emps: [], addModalShow: false, editModalsShow:false };
  }

  refreshList() {
    fetch(process.env.REACT_APP_API + "tripulante")
      .then(response => response.json())
      .then(data => {
        this.setState({ emps: data });
      });
  }

  componentDidMount() {
    this.refreshList();
  }

  componentDidUpdate() {
    this.refreshList();
  }
  deleteEmp(empid){
    if(window.confirm('¿Estas seguro de borrar?')){
      fetch(process.env.REACT_APP_API+'tripulante/'+ empid,{
        method:'DELETE',
        header:{'Accept':'application/json',
      'Content-Type':'application/json'}
      })
    };

  }  
  
  
  render() {
    const { emps , empid,empname} = this.state;
    let addModalClose = () => this.setState({ addModalShow: false });
    let editModalClose = () => this.setState({ editModalShow: false });
    return (
      <div>
        <Slide left>
        <Table className="mt-4" striped bordered hover size="sm" variant="dark">
          <thead>
            <tr>
              <th>Id Tripulante</th>
              <th>Nombre Tripulante</th>
              <th>Nave Tripulante</th>
              <th>Opciones</th>
            </tr>
          </thead>
          <tbody>
            {emps.map((emp) => (
              <tr key={emp.IdTripulante}>
                <td>{emp.IdTripulante}</td>
                <td>{emp.NombreTripulante}</td>
                <td>{emp.NaveTripulante}</td>
                <td>
                  
                  <ButtonToolbar >
                    <div class="botones">
                    <Button size="sm" className="mr-2" variant="secondary"
                    onClick={()=>this.setState({editModalShow:true,empid:emp.IdTripulante, empname:emp.NombreTripulante})}>
                      Editar
                    </Button>
                    <EditEmpModal show={this.state.editModalShow}
                    onHide={editModalClose}
                    empid={empid}
                    empname={empname}/>
                    <Button size="sm" className="mr-2"
                         variant="danger"
                         onClick={() => this.deleteEmp(emp.IdTripulante)}>
                          Borrar
                     </Button>
                     </div>
                  </ButtonToolbar>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        </Slide>
        <ButtonToolbar>
          <Slide left>
          <Button
            variant="secondary"
            onClick={() => this.setState({ addModalShow: true })}
          >
            Agregar Tripulante
          </Button>
          </Slide>
          <AddEmpModal  
            show={this.state.addModalShow}
            onHide={addModalClose}
          ></AddEmpModal>
        </ButtonToolbar>
      </div>
    );
  }
}
