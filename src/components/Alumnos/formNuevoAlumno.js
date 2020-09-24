import React, {useState} from 'react';
import {Form, Button, Col} from 'react-bootstrap';
import {metodoGeneral} from '../../lib/metodos'

export default function FormNuevoAlumno() {
    const [validated, setValidated] = useState(false);
    const [formValue, setFormValue] = useState({
        code: '',
        first_name: '',
        last_name: '',
        document: '',
        email: '',
        phone: '',
        semester_1: false,
        qualification_1: '',
        semester_2: false,
        qualification_2: '',
        grade: 'PREGRADO'
    });
    
    const onChange = async e => {
      setFormValue({
          ...formValue,
          [e.target.name]: e.target.value,
      })
    }

    const onChangeGrade = async e => {
      const isGrade = e.target.value
      const inputTesis1 = document.getElementById('nuevo_qualification_1');
      const inputTesis2 = document.getElementById('nuevo_qualification_2');
      const checkboxTesis1 = document.getElementById('nuevo_checkbox_semester_1');
      const checkboxTesis2 = document.getElementById('nuevo_checkbox_semester_2');
      if(isGrade == 'POSGRADO'){
        inputTesis1.disabled = true;
        inputTesis1.value = '';
        inputTesis2.disabled = true;
        inputTesis2.value = '';
        checkboxTesis1.checked= false;
        checkboxTesis2.checked= false;
        checkboxTesis1.disabled= true;
        checkboxTesis2.disabled= true;
      }else{
        checkboxTesis1.disabled= false;
        checkboxTesis2.disabled= false;
      }
    }

    const onChangeTesisUno = async e => {
      const isChecked = e.target.checked;
      const inputTesis = document.getElementById('nuevo_qualification_1');
      if(isChecked){
        inputTesis.disabled = false;
      }
      else{
        inputTesis.disabled = true;
        inputTesis.value = '';
      }
    }

    const onChangeTesisDos = async e => {
      const isChecked = e.target.checked;
      const inputTesis = document.getElementById('nuevo_qualification_2');
      if(isChecked){
        inputTesis.disabled = false;
      }
      else{
        inputTesis.disabled = true;
        inputTesis.value = '';
      }
    }

    const handleSubmit = async event => {
      event.preventDefault();
      const form = event.currentTarget;
      if (form.checkValidity() === false) {event.stopPropagation();}
      else{
        const objeto = {
          code: formValue.code,
          first_name: formValue.first_name,
          last_name: formValue.last_name,
          document: formValue.document,
          email: formValue.email,
          phone: formValue.phone,
          grade: formValue.grade
        }
        if(formValue.grade='PREGRADO'){
          const checkboxTesis1 = document.getElementById('nuevo_checkbox_semester_1');
          const checkboxTesis2 = document.getElementById('nuevo_checkbox_semester_2');
          const inputTesis1 = document.getElementById('nuevo_qualification_1');
          const inputTesis2 = document.getElementById('nuevo_qualification_2');
          if(checkboxTesis1.checked){
            objeto.semester_1 = true;
            objeto.qualification_1 = inputTesis1.value;
          }
          if(checkboxTesis2.checked){
            objeto.semester_2 = true;
            objeto.qualification_2 = inputTesis2.value;
          }
        }
        const res = await metodoGeneral('/faculties/student','POST',objeto)  //mandar objeto al back para el registro
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
            <h2>Nuevo alumno</h2>
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
            <Form.Label>Grado:</Form.Label> 
          </Form.Group>
          <Form.Group as={Col} md="9">
            <Form.Control as="select" name="grade" onChange={onChangeGrade}> 
                <option value='PREGRADO'>Pregrado</option>
                <option value='POSGRADO'>Posgrado</option>
              </Form.Control>
          </Form.Group>
        </Form.Row>

        <br/>
        <Form.Row>
          <Form.Group as={Col} md="3">
            <Form.Label>Codigo:</Form.Label> 
          </Form.Group>
          <Form.Group as={Col} md="9">
            <Form.Control type="text" name="code" required/>
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

        <br/>
        <Form.Row>
            <Form.Group as={Col} md="3">
              <Form.Label>Nota tesis 1:</Form.Label> 
            </Form.Group>
            <Form.Group as={Col} md="5">
              <Form.Control type="text" name="qualification_1" id="nuevo_qualification_1" disabled/>
            </Form.Group>
            <Form.Group as={Col} md="1"></Form.Group>

            <Form.Group as={Col} md="3">
              <Form.Check inline type="checkbox" onChange={onChangeTesisUno} id="nuevo_checkbox_semester_1"/>
              <Form.Label>Tesis 1 aprobado</Form.Label> &nbsp;
            </Form.Group>
        </Form.Row>

        <br/>
        <Form.Row>
            <Form.Group as={Col} md="3">
              <Form.Label>Nota tesis 2:</Form.Label> 
            </Form.Group>
            <Form.Group as={Col} md="5">
              <Form.Control type="text" name="qualification_2" id="nuevo_qualification_2" disabled/>
            </Form.Group>
            <Form.Group as={Col} md="1"></Form.Group>

            <Form.Group as={Col} md="3">
              <Form.Check inline type="checkbox" onChange={onChangeTesisDos} id="nuevo_checkbox_semester_2"/>
              <Form.Label>Tesis 2 aprobado</Form.Label> &nbsp;
            </Form.Group>
        </Form.Row>

        <br/>
        <div style={{textAlign: "center"}}>
         <Button style={{textAlign: "center"}} type="submit" variant="success">Crear nuevo alumno</Button>
        </div>
      </Form>
    );
}
