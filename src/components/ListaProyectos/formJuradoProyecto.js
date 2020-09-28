import React, {useState} from 'react';
import {Form, Button, Col} from 'react-bootstrap';
import {getJsonStorage} from '../../lib/jsonStorages'
import {metodoGeneral} from '../../lib/metodos'

export default function FormJuradoProyecto(props) {
    const {prps, Profesores} = props;
    const [validated, setValidated] = useState(false);
    const [formValue, setFormValue] = useState({
        date_supporting : prps.date_supporting,
        jury_1 : prps.jury_1,
        jury_2 : prps.jury_2,
        jury_3 : prps.jury_3,
        state: 'ENTREGADO'
    });
    
    const onChange = async e => {
      setFormValue({
          ...formValue,
          [e.target.name]: e.target.value,
      })
    }

    const handleSubmit = async event => {
      console.log(prps);
      
      event.preventDefault();
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
          event.stopPropagation();
      }
      else{
        console.log(formValue);
        
        const res = await metodoGeneral('/projects/'+ prps.id,'PATCH',formValue)  //mandar objeto al back para el registro
        console.log(res);
        window.location.reload();
      }     
      setValidated(true)
    };

    return (
      <Form noValidate 
      validated={validated} onSubmit={handleSubmit} onChange={onChange} 
      className="m-4">
        <Form.Group className="text-center" >
          <h2>Definir sustentación: {prps.name} {prps.num_doc_support} ({prps.type})</h2>
        </Form.Group>
        <br/>


        <br/>
        <Form.Row>
          <Form.Group as={Col} md="3">
            <Form.Label>Fecha de sustentación:</Form.Label> 
          </Form.Group>
          <Form.Group as={Col} md="9">
            <Form.Control type="datetime-local" defaultValue={prps.date_supporting} name='date_supporting' required/>
          </Form.Group>
        </Form.Row>

        <br/>
        <Form.Row>
          <Form.Group as={Col} md="3">
            <Form.Label>Jurado 1</Form.Label> 
          </Form.Group>
          <Form.Group as={Col} md="9">
            <Form.Control as="select"defaultValue={prps.jury_1} name='jury_1' required>
                <option value=''>--Sin asesor asignado--</option>
                {Profesores.map((profesor) => {
                  return (<option key={profesor.id} value={profesor.id}>{(profesor.last_name).toUpperCase()}, {(profesor.first_name)}</option>)
                })}
              </Form.Control>
          </Form.Group>
        </Form.Row>

        <br/>
        <Form.Row>
          <Form.Group as={Col} md="3">
            <Form.Label>Jurado 2</Form.Label> 
          </Form.Group>
          <Form.Group as={Col} md="9">
            <Form.Control as="select"defaultValue={prps.jury_2} name='jury_2' required>
                <option value=''>--Sin asesor asignado--</option>
                {Profesores.map((profesor) => {
                  return (<option key={profesor.id} value={profesor.id}>{(profesor.last_name).toUpperCase()}, {(profesor.first_name)}</option>)
                })}
              </Form.Control>
          </Form.Group>
        </Form.Row>

        <br/>
        <Form.Row>
          <Form.Group as={Col} md="3">
            <Form.Label>Jurado 3</Form.Label> 
          </Form.Group>
          <Form.Group as={Col} md="9">
            <Form.Control as="select"defaultValue={prps.jury_3} name='jury_3' required>
                <option value=''>--Sin asesor asignado--</option>
                {Profesores.map((profesor) => {
                  return (<option key={profesor.id} value={profesor.id}>{(profesor.last_name).toUpperCase()}, {(profesor.first_name)}</option>)
                })}
              </Form.Control>
          </Form.Group>
        </Form.Row>


        <br/>
        <Form.Row>
          <Form.Group as={Col} md="3">
            <Form.Label>Estado del proyecto</Form.Label> 
          </Form.Group>
          <Form.Group as={Col} md="9">   
              <Form.Control type="text" defaultValue={prps.state} disabled/>
          </Form.Group>
        </Form.Row>
        <br/>

        <br/>
        <div style={{textAlign: "center"}}>
         <Button style={{textAlign: "center"}} type="submit" variant="success">Definir sustentación</Button>
        </div>
      </Form>
    );

}
