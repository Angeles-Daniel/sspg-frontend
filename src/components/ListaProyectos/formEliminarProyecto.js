import React, {useState} from 'react';
import {Form, Button, Col} from 'react-bootstrap';
import {getJsonStorage} from '../../lib/jsonStorages'
import {metodoGeneral} from '../../lib/metodos'



export default function FormEliminarProyecto(props) {
  const {closeModal, prps:{id,name}} = props
  const handleSubmit = async event => {
    event.preventDefault();
    const res = await metodoGeneral(`/projects/${id}`,'DELETE')  //mandar objeto al back para el registro
    console.log(res);
    window.location.reload();
  };
  

  return (
    <Form noValidate 
    onSubmit={handleSubmit}
    className="m-4">
      <Form.Group className="text-center" >
      <h4>¿Está seguro que desea eliminar el proyecto: {name}?</h4>
      </Form.Group>
      <br></br>
      <div style={{textAlign: "center"}}>
       <Button style={{textAlign: "center"}} type="submit" variant="danger">Eliminar proyecto</Button>&nbsp;&nbsp;
       <Button style={{textAlign: "center"}} variant="warning" onClick={closeModal}>Cancelar</Button>
      </div>
    </Form>
  );

}