import React, {useState} from 'react';
import {Form, Button, Col} from 'react-bootstrap';
import {metodoGeneral} from '../../lib/metodos'

export default function FormModificarAlumno(props) {
    const {prps} = props
    const [validated, setValidated] = useState(false);
    const [formValue, setFormValue] = useState({
        first_name: prps.first_name,
        last_name: prps.last_name,
        grade: prps.grade,
        code: prps.code,
        document: prps.document,
        email: prps.email,
        phone: prps.phone,
        qualification_1: prps.qualification_1,
        qualification_2: prps.qualification_2,
        semester_1: prps.semester_1,
        semester_2: prps.semester_2,
    });
    
    const onChange = async e => {
      setFormValue({
          ...formValue,
          [e.target.name]: e.target.value,
      })
    }

    const onChangeGrade = async e => {
      const isGrade = e.target.value
      const inputTesis1 = document.getElementById('modificar_qualification_1');
      const inputTesis2 = document.getElementById('modificar_qualification_2');
      const checkboxTesis1 = document.getElementById('modificar_checkbox_semester_1');
      const checkboxTesis2 = document.getElementById('modificar_checkbox_semester_2');
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
      const inputTesis = document.getElementById('modificar_qualification_1');
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
      const inputTesis = document.getElementById('modificar_qualification_2');
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
          const checkboxTesis1 = document.getElementById('modificar_checkbox_semester_1');
          const checkboxTesis2 = document.getElementById('modificar_checkbox_semester_2');
          const inputTesis1 = document.getElementById('modificar_qualification_1');
          const inputTesis2 = document.getElementById('modificar_qualification_2');
          if(checkboxTesis1.checked){
            objeto.semester_1 = true;
            objeto.qualification_1 = inputTesis1.value;
          }
          if(checkboxTesis2.checked){
            objeto.semester_2 = true;
            objeto.qualification_2 = inputTesis2.value;
          }
        }
        const res = await metodoGeneral('/faculties/student/' + prps.id,'PATCH',objeto)  //mandar objeto al back para el registro
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
          <h2>Modificar alumno: {prps.first_name} {prps.last_name}</h2>
        </Form.Group>
        <br/>
        <br/>

        <Form.Row>
          <Form.Group as={Col} md="3">
            <Form.Label>Apellidos:</Form.Label> 
          </Form.Group>
          <Form.Group as={Col} md="9">
            <Form.Control type="text" name="first_name" defaultValue={prps.first_name} required/>
          </Form.Group>
        </Form.Row>

        <br/>
        <Form.Row>
          <Form.Group as={Col} md="3">
            <Form.Label>Nombres:</Form.Label> 
          </Form.Group>
          <Form.Group as={Col} md="9">
            <Form.Control type="text" name="last_name" defaultValue={prps.last_name} required/>
          </Form.Group>
        </Form.Row>
        
        <br/>
        <Form.Row>
          <Form.Group as={Col} md="3">
            <Form.Label>Grado:</Form.Label> 
          </Form.Group>
          <Form.Group as={Col} md="9">
            <Form.Control as="select" name="grade" defaultValue={prps.grade} onChange={onChangeGrade}> 
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
            <Form.Control type="text" name="code" defaultValue={prps.code} required/>
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

        {isPregrado(prps, onChangeTesisUno, onChangeTesisDos)}

        <br/>
        <div style={{textAlign: "center"}}>
         <Button style={{textAlign: "center"}} type="submit" variant="success">Modificar alumno</Button>
        </div>
      </Form>
    );
}

const isPregrado = (prps, onChangeTesisUno, onChangeTesisDos) =>{
    console.log(prps.grade);
    
    if(prps.grade='PREGRADO'){ 
        return(
            <>
             <br/>
             <Form.Row>
                 <Form.Group as={Col} md="3">
                   <Form.Label>Nota tesis 1:</Form.Label> 
                 </Form.Group>
                 {isChecked(prps,prps.semester_1,'1',onChangeTesisUno)}
             </Form.Row>
     
             <br/>
             <Form.Row>
                 <Form.Group as={Col} md="3">
                   <Form.Label>Nota tesis 2:</Form.Label> 
                 </Form.Group>
                 {isChecked(prps,prps.semester_2,'2', onChangeTesisUno)}
             </Form.Row>
            </>
        ) 
    }
    
    return(
        <>
            <br/>
            <Form.Row>
                <Form.Group as={Col} md="3">
                    <Form.Label>Nota tesis 1:</Form.Label> 
                </Form.Group>
                <Form.Group as={Col} md="5">
                    <Form.Control type="text" name="qualification_1" id="modificar_qualification_1" disabled/>
                </Form.Group>
                <Form.Group as={Col} md="1"></Form.Group>
    
                <Form.Group as={Col} md="3">
                    <Form.Check inline type="checkbox" onChange={onChangeTesisUno} id="modificar_checkbox_semester_1"/>
                    <Form.Label>Tesis 1 aprobado</Form.Label> &nbsp;
                </Form.Group>
            </Form.Row>
    
            <br/>
            <Form.Row>
                <Form.Group as={Col} md="3">
                    <Form.Label>Nota tesis 2:</Form.Label> 
                </Form.Group>
                <Form.Group as={Col} md="5">
                    <Form.Control type="text" name="qualification_2" id="modificar_qualification_2" disabled/>
                </Form.Group>
                <Form.Group as={Col} md="1"></Form.Group>
    
                <Form.Group as={Col} md="3">
                    <Form.Check inline type="checkbox" onChange={onChangeTesisDos} id="modificar_checkbox_semester_2"/>
                    <Form.Label>Tesis 2 aprobado</Form.Label> &nbsp;
                </Form.Group>
            </Form.Row>
        </>
    ) 
    
}

const isChecked = (prps,semester,id_number, onChange) => {
    if(semester){
        return (
            <>
                <Form.Group as={Col} md="5">
                    <Form.Control type="text" name={`qualification_${id_number}`} defaultValue={prps.qualification_1} id={`modificar_qualification_${id_number}`}/>
                </Form.Group>
                <Form.Group as={Col} md="1"></Form.Group>
                <Form.Group as={Col} md="3">
                    <Form.Check inline type="checkbox" onChange={onChange} id={`modificar_checkbox_semester_${id_number}`} checked/>
                    <Form.Label>Tesis 1 aprobado</Form.Label> &nbsp;
                </Form.Group>
            </>
        )
    }
    return (
        <>
            <Form.Group as={Col} md="5">
                <Form.Control type="text" name={`qualification_${id_number}`} id={`modificar_qualification_${id_number}`} disabled/>
            </Form.Group>
            <Form.Group as={Col} md="1"></Form.Group>
            <Form.Group as={Col} md="3">
                <Form.Check inline type="checkbox" onChange={onChange} id={`modificar_checkbox_semester_${id_number}`} />
                <Form.Label>Tesis 1 aprobado</Form.Label> &nbsp;
            </Form.Group>
        </>
    )
    
}