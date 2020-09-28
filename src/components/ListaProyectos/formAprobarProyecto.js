import React, {useState} from 'react';
import {Form, Button, Col} from 'react-bootstrap';
import {getJsonStorage} from '../../lib/jsonStorages'
import {metodoGeneral} from '../../lib/metodos'

export default function FormJuradoProyecto(props) {
    const {prps, Profesores} = props;
    const [validated, setValidated] = useState(false);
    const [formValue, setFormValue] = useState({
        name: '',
        nota_project: prps.nota_project
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
      if (form.checkValidity() === false) {
          event.stopPropagation();
      }
      else{
        if(formValue.name == prps.name){
          document.getElementById('aprobar-proyecto-mensaje-error').textContent = '';
          console.log('aa');
          
          const objeto = {
            nota_project: formValue.nota_project,
            state: 'SUSTENTADO'
          }
          const res = await metodoGeneral('/projects/'+ prps.id,'PATCH',objeto)  //mandar objeto al back para el registro
          console.log(res);
          window.location.reload();
        }
        else{
          document.getElementById('aprobar-proyecto-mensaje-error').textContent = 'Los nombres no coinciden';
        }
      }     
      setValidated(true)
    };

    return (
      <Form noValidate 
      validated={validated} onSubmit={handleSubmit} onChange={onChange} 
      className="m-4">
        <Form.Group className="text-center" >
          <h2>Aprobar sustentación</h2>
        </Form.Group>
        <br/>


        <Form.Row>
          <Form.Group as={Col} md="3">
            <Form.Label>Nombre</Form.Label> 
          </Form.Group>
          <Form.Group as={Col} md="9">   
              <Form.Control type="text" defaultValue={prps.name} disabled/>
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} md="3">
            <Form.Label>Numero de documento de sustento:</Form.Label> 
          </Form.Group>
          <Form.Group as={Col} md="9">   
              <Form.Control type="text" defaultValue={prps.num_doc_support} disabled/>
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} md="3">
            <Form.Label>Fecha de sustentación:</Form.Label> 
          </Form.Group>
          <Form.Group as={Col} md="9">
            <Form.Control type="datetime-local" defaultValue={prps.date_supporting} name="date_supporting" disabled/>
          </Form.Group>
        </Form.Row>

          <Form.Row>
            <Form.Group as={Col} md="3">
              <Form.Label>Tipo de proyecto</Form.Label> 
            </Form.Group>
            <Form.Group as={Col} md="9">   
                <Form.Control type="text" defaultValue={prps.tipo} disabled/>
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} md="3">
              <Form.Label>Estudiante(s)</Form.Label> 
            </Form.Group>
            <Form.Group as={Col} md="9">   
                <Form.Control type="text" defaultValue={prps.estudiante} disabled/>
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} md="3">
              <Form.Label>Asesor(a)</Form.Label> 
            </Form.Group>
            <Form.Group as={Col} md="9">   
                <Form.Control type="text" defaultValue={prps.asesor} disabled/>
            </Form.Group>
          </Form.Row>

        <Form.Row>
          <Form.Group as={Col} md="3">
            <Form.Label>Jurado</Form.Label> 
          </Form.Group>
          <Form.Group as={Col} md="9">   
              <Form.Control type="text" defaultValue={`${(Profesores[0].last_name).toUpperCase()}, ${(Profesores[0].first_name)};   ${(Profesores[1].last_name).toUpperCase()}, ${(Profesores[1].first_name)};   ${(Profesores[2].last_name).toUpperCase()}, ${(Profesores[2].first_name)};
              `} disabled/>
          </Form.Group>
        </Form.Row>

        <br />

        <Form.Row>
            <Form.Group as={Col} md="3">
              <Form.Label>Nota de sustentación</Form.Label> 
            </Form.Group>
            <Form.Group as={Col} md="9">   
                <Form.Control type="number" name='nota_project' defaultValue={prps.nota_project} required/>
            </Form.Group>
          </Form.Row>

        <Form.Row>
            <Form.Group as={Col} md="3">
              <Form.Label>Escribir nombre del proyecto para confirmar</Form.Label> 
            </Form.Group>
            <Form.Group as={Col} md="9">   
                <Form.Control type="text" name='name' required/>
          <div style={{color: "#FF0000"}} id="aprobar-proyecto-mensaje-error"></div>
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
