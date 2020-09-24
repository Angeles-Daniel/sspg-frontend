import React, {useState} from 'react';
import {Form, Button, Col} from 'react-bootstrap';
import {metodoGeneral} from '../../lib/metodos'


export default function FormNuevoProfesor() {
    const [validated, setValidated] = useState(false);
    const [formValue, setFormValue] = useState({
        first_name: '',
        last_name: '',
        codigo: '',
        document: '',
        email: '',
        phone: '',
        asesor: true,
    });
    
    const onChange = async e => {
      setFormValue({
          ...formValue,
          [e.target.name]: e.target.value,
      })
    }

    const handleSubmit = async event => {
      event.preventDefault();
      const form = event.currentTarget;
      if (form.checkValidity() === false) {event.stopPropagation();}
      else{
        const objeto = {
            first_name: formValue.first_name,
            last_name: formValue.last_name,
            codigo: formValue.codigo,
            document: formValue.document,
            email: formValue.email,
            phone: formValue.phone,
            asesor: formValue.asesor
        }
        console.log(objeto);
        
        const res = await metodoGeneral('/faculties/teacher','POST',objeto)  //mandar objeto al back para el registro
        // console.log(res);
        // window.location.reload();
      }     
      setValidated(true)
    };

    return (
      <Form noValidate 
      validated={validated} onSubmit={handleSubmit} onChange={onChange} 
      className="m-4">
        <Form.Group className="text-center" >
            <h2>Nuevo profesor</h2>
        </Form.Group>
        <br/>
        <br/>

        <Form.Row>
          <Form.Group as={Col} md="3">
            <Form.Label>Apellidos:</Form.Label> 
          </Form.Group>
          <Form.Group as={Col} md="9">
            <Form.Control type="text" name="last_name" required/>
          </Form.Group>
        </Form.Row>

        <br/>
        <Form.Row>
          <Form.Group as={Col} md="3">
            <Form.Label>Nombres:</Form.Label> 
          </Form.Group>
          <Form.Group as={Col} md="9">
            <Form.Control type="text" name="first_name" required/>
          </Form.Group>
        </Form.Row>
        

        <br/>
        <Form.Row>
          <Form.Group as={Col} md="3">
            <Form.Label>Codigo:</Form.Label> 
          </Form.Group>
          <Form.Group as={Col} md="9">
            <Form.Control type="text" name="codigo" required/>
          </Form.Group>
        </Form.Row>

        <br/>
        <Form.Row>
          <Form.Group as={Col} md="3">
            <Form.Label>DNI:</Form.Label> 
          </Form.Group>
          <Form.Group as={Col} md="9">
            <Form.Control type="text" name="document" required/>
          </Form.Group>
        </Form.Row>

        <br/>
        <Form.Row>
          <Form.Group as={Col} md="3">
            <Form.Label>Email:</Form.Label> 
          </Form.Group>
          <Form.Group as={Col} md="9">
            <Form.Control type="email" name="email" required/>
          </Form.Group>
        </Form.Row>

        <br/>
        <Form.Row>
          <Form.Group as={Col} md="3">
            <Form.Label>Teléfono:</Form.Label> 
          </Form.Group>
          <Form.Group as={Col} md="9">
            <Form.Control type="text" name="phone" />
          </Form.Group>
        </Form.Row>
        {/* <br/>
        <Form.Row>
          <Form.Group as={Col} md="3">
            <Form.Label>Puede asesorar: </Form.Label> 
          </Form.Group>
          <Form.Group as={Col} md="9">
            <Form.Control as="select" name="asesor" defaultValue={false}> 
                <option value={true}>Sí</option>
                <option value={false}>No</option>
              </Form.Control>
          </Form.Group>
        </Form.Row> */}

        <br/>
        <div style={{textAlign: "center"}}>
         <Button style={{textAlign: "center"}} type="submit" variant="success">Crear nuevo profesor</Button>
        </div>
      </Form>
    );
}
