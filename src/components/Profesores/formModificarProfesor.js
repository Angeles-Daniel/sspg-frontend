import React, {useState} from 'react';
import {Form, Button, Col} from 'react-bootstrap';
import {metodoGeneral} from '../../lib/metodos'


export default function FormNuevoProfesor(props) {
    const {prps} = props
    const [validated, setValidated] = useState(false);
    const [formValue, setFormValue] = useState({
        first_name: prps.first_name,
        last_name: prps.last_name,
        codigo: prps.codigo,
        document: prps.document,
        email: prps.email,
        phone: prps.phone,
        // asesor: prps.asesor
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
            // asesor: formValue.asesor
        }
        console.log(objeto);
        
        const res = await metodoGeneral('/faculties/teacher/' + prps.id ,'PATCH',objeto)  //mandar objeto al back para el registro
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
            <h2>Modificar profesor: {prps.first_name} {prps.last_name}</h2>
        </Form.Group>
        <br/>
        <br/>

        <Form.Row>
          <Form.Group as={Col} md="3">
            <Form.Label>Apellidos:</Form.Label> 
          </Form.Group>
          <Form.Group as={Col} md="9">
            <Form.Control type="text" name="last_name" defaultValue={prps.last_name} required/>
          </Form.Group>
        </Form.Row>

        <br/>
        <Form.Row>
          <Form.Group as={Col} md="3">
            <Form.Label>Nombres:</Form.Label> 
          </Form.Group>
          <Form.Group as={Col} md="9">
            <Form.Control type="text" name="first_name" defaultValue={prps.first_name} required/>
          </Form.Group>
        </Form.Row>
        

        <br/>
        <Form.Row>
          <Form.Group as={Col} md="3">
            <Form.Label>Codigo:</Form.Label> 
          </Form.Group>
          <Form.Group as={Col} md="9">
            <Form.Control type="text" name="codigo" defaultValue={prps.codigo} required/>
          </Form.Group>
        </Form.Row>

        <br/>
        <Form.Row>
          <Form.Group as={Col} md="3">
            <Form.Label>DNI:</Form.Label> 
          </Form.Group>
          <Form.Group as={Col} md="9">
            <Form.Control type="text" name="document" defaultValue={prps.document} required/>
          </Form.Group>
        </Form.Row>

        <br/>
        <Form.Row>
          <Form.Group as={Col} md="3">
            <Form.Label>Email:</Form.Label> 
          </Form.Group>
          <Form.Group as={Col} md="9">
            <Form.Control type="email" name="email" defaultValue={prps.email} required/>
          </Form.Group>
        </Form.Row>

        <br/>
        <Form.Row>
          <Form.Group as={Col} md="3">
            <Form.Label>Teléfono:</Form.Label> 
          </Form.Group>
          <Form.Group as={Col} md="9">
            <Form.Control type="text" name="phone" defaultValue={prps.phone} />
          </Form.Group>
        </Form.Row>
        {/* <br/>
        <Form.Row>
          <Form.Group as={Col} md="3">
            <Form.Label>Puede asesorar: </Form.Label> 
          </Form.Group>
          <Form.Group as={Col} md="9">
            <Form.Control as="select" name="asesor" defaultValue={prps.asesor}> 
                <option value={true}>Sí</option>
                <option value={false}>No</option>
              </Form.Control>
          </Form.Group>
        </Form.Row> */}

        <br/>
        <div style={{textAlign: "center"}}>
         <Button style={{textAlign: "center"}} type="submit" variant="success">Modificar profesor</Button>
        </div>
      </Form>
    );
}
