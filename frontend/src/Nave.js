import React, { Component } from "react";
import { Table } from "react-bootstrap";
import { Button, ButtonToolbar } from "react-bootstrap";
import { AddDepModal } from "./AddDepModal";
import { EditDepModal } from "./EditDepModal";
import Slide from 'react-reveal/Slide';

export class Nave extends Component {
  constructor(props) {
    super(props);
    this.state = { deps: [], addModalShow: false, editModalsShow:false };
  }

  refreshList() {
    fetch(process.env.REACT_APP_API + "nave")
      .then(response => response.json())
      .then(data => {
        this.setState({ deps: data });
      });
  }

  componentDidMount() {
    this.refreshList();
  }

  componentDidUpdate() {
    this.refreshList();
  }
  deleteDep(depid){
    if(window.confirm('¿Estas seguro de borrar?')){
      fetch(process.env.REACT_APP_API+'nave/'+ depid,{
        method:'DELETE',
        header:{'Accept':'application/json',
      'Content-Type':'application/json'}
      })
    };

  }  
  
  
  render() {
    const { deps , depid,depname} = this.state;
    let addModalClose = () => this.setState({ addModalShow: false });
    let editModalClose = () => this.setState({ editModalShow: false });
    return (
      <div>
        <Slide left>
        <Table className="mt-4" striped bordered hover size="sm" variant="dark">
          <thead>
            <tr>
              <th>Id Nave</th>
              <th>Nombre Nave</th>
              <th>Opciones</th>
            </tr>
          </thead>
          <tbody>
            {deps.map((dep) => (
              <tr key={dep.IdNave}>
                <td>{dep.IdNave}</td>
                <td>{dep.NombreNave}</td>
                <td>
                  
                  <ButtonToolbar >
                    <div class="botones">
                    <Button size="sm" className="mr-2" variant="secondary"
                    onClick={()=>this.setState({editModalShow:true,depid:dep.IdNave, depname:dep.NombreNave})}>
                      Editar
                    </Button>
                    <EditDepModal show={this.state.editModalShow}
                    onHide={editModalClose}
                    depid={depid}
                    depname={depname}/>
                    <Button size="sm" className="mr-2"
                         variant="danger"
                         onClick={() => this.deleteDep(dep.IdNave)}>
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
            Agregar Nave
          </Button>
          </Slide>
          <AddDepModal  
            show={this.state.addModalShow}
            onHide={addModalClose}
          ></AddDepModal>
        </ButtonToolbar>
      </div>
    );
  }
}
