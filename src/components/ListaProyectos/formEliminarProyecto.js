import React, {useState} from 'react';
import {Form, Button, Col} from 'react-bootstrap';
import {getJsonStorage} from '../../lib/jsonStorages'
import {metodoGeneral} from '../../lib/metodos'



export default function FormEliminarProyecto(props) {
  const {closeModal, prps:{id,name}} = props
  const handleSubmit = async event => {
    event.preventDefault();
    if(document.getElementById('eliminar-proyecto-input').value == name){
      document.getElementById('eliminar-proyecto-mensaje-error').textContent = '';
      const res = await metodoGeneral(`/projects/${id}`,'DELETE')  //mandar objeto al back para el registro
      console.log(res);
      window.location.reload();    
    }
    else{
      document.getElementById('eliminar-proyecto-mensaje-error').textContent = 'Los nombres no coinciden';
    }
  };
  

  return (
    <Form noValidate 
    onSubmit={handleSubmit}
    className="m-4">
      <Form.Group className="text-center" >
      <h4>¿Está seguro que desea eliminar el proyecto: {name}?</h4>
      </Form.Group>
      <Form.Row>
          <Form.Group as={Col} md="3">
            <Form.Label>Nombre</Form.Label> 
          </Form.Group>
          <Form.Group as={Col} md="9">   
              <Form.Control type="text" defaultValue={name} disabled/>
          </Form.Group>
        </Form.Row>
      <Form.Row>
          <Form.Group as={Col} md="3">
            <Form.Label>Escribir nombre del proyecto para confirmar</Form.Label> 
          </Form.Group>
          <Form.Group as={Col} md="9">   
              <Form.Control type="text" name='name' id="eliminar-proyecto-input" required/>
        <div style={{color: "#FF0000"}} id="eliminar-proyecto-mensaje-error"></div>
          </Form.Group>
        </Form.Row>
      <br></br>
      <div style={{textAlign: "center"}}>
       <Button style={{textAlign: "center"}} type="submit" variant="danger">Eliminar proyecto</Button>&nbsp;&nbsp;
       <Button style={{textAlign: "center"}} variant="warning" onClick={closeModal}>Cancelar</Button>
      </div>
    </Form>
  );

}