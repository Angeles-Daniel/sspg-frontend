import React, {useState} from 'react';
import {Form, Button, Col} from 'react-bootstrap';
import {getJsonStorage} from '../../lib/jsonStorages'
import {metodoGeneral} from '../../lib/metodos'

export default function FormModificarProyecto(props) {
    const {prps, Profesores, EstudiantesSinProyecto, PeriodosAcademicos} = props;
    const [validated, setValidated] = useState(false);
    const [formValue, setFormValue] = useState({
        name: prps.name,
        code: prps.code,
        type:  prps.type,
        num_doc_support: prps.num_doc_support,
        fecha_doc_sustento: prps.date_doc_support,
        adviser: prps.id_adviser,
        student_1: prps.id_student_1,
        student_2: prps.id_student_2,
        student_3: prps.id_student_3,
        school: prps.school,
        course_initial: prps.course_initial,
        state: prps.state,
        period_academic: prps.period_academic
    });
    
    const onChange = async e => {
      setFormValue({
          ...formValue,
          [e.target.name]: e.target.value,
      })
    }

    const tipoProyectoChange = e => {
        e.preventDefault();
        const estudiante_2 = document.getElementById('modificar_estudiante_proyecto_2')
        const estudiante_3 = document.getElementById('modificar_estudiante_proyecto_3')
        let tipo = e.target.value
        if(tipo == 'TI'){
          estudiante_2.disabled = false;
          estudiante_3.value = '';
          estudiante_3.disabled = true;
        }else if(tipo == 'TESIS'){
          estudiante_2.disabled = false;
          estudiante_3.disabled = false;
        }else if (tipo == 'TSP'){
          estudiante_2.value = '';
          estudiante_2.disabled = true;
          estudiante_3.value = '0';
          estudiante_3.disabled = true;
        }
    }

    const handleSubmit = async event => {
      event.preventDefault();
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
          event.stopPropagation();
      }
      else{
        console.log(formValue);
        
        const objeto = {
          name: formValue.name,
          code: formValue.code,
          type: formValue.type,
          num_doc_support:formValue.num_doc_support,
          date_doc_support :formValue.fecha_doc_sustento,
          school: formValue.school,
          course_initial: formValue.course_initial,
          state: formValue.state,  
          period_academic: formValue.period_academic
        }
        if(formValue.adviser != prps.id_adviser){
          objeto.adviser = formValue.adviser;
          if(objeto.adviser == ''){objeto.adviser = null}
        }
        if(formValue.student_1 != prps.id_student_1){
          objeto.student_1 = formValue.student_1
          if(objeto.student_1 == ''){objeto.student_1 = null}
        }
        if(formValue.student_2 != prps.id_student_2){
          objeto.student_2 = formValue.student_2
          if(objeto.student_2 == ''){objeto.student_2 = null}
        }
        if(formValue.student_3 != prps.id_student_3){
          objeto.student_3 = formValue.student_3
          if(objeto.student_3 == ''){objeto.student_3 = null}
        }
        console.log(objeto);
        
        const res = await metodoGeneral('/projects/'+ prps.id,'PATCH',objeto)  //mandar objeto al back para el registro
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
          <h2>Modificar proyecto: {prps.name} {prps.num_doc_support}</h2>
        </Form.Group>
        <br/>
        <br/>
        <Form.Row>
          <Form.Group as={Col} md="3">
            <Form.Label>Titulo:</Form.Label> 
          </Form.Group>
          <Form.Group as={Col} md="9">
            <Form.Control type="text" defaultValue={prps.name} name="name" />
          </Form.Group>
        </Form.Row>

        <br/>
        <Form.Row>
          <Form.Group as={Col} md="3">
            <Form.Label>Codigo:</Form.Label> 
          </Form.Group>
          <Form.Group as={Col} md="9">
            <Form.Control type="text" defaultValue={prps.code} name="code" />
          </Form.Group>
        </Form.Row>

        <br/>
        <Form.Row>
          <Form.Group as={Col} md="3">
            <Form.Label>Tipo de proyecto</Form.Label> 
          </Form.Group>
          <Form.Group as={Col} md="9">
            <Form.Control as="select" defaultValue={prps.type} name="type" onChange={tipoProyectoChange}>
                <option value="TI">Trabajo de investigacion</option>
                <option value="TESIS">Tesis de grado</option>
                <option value="TSP">Trabajo de suficiencia profesional</option>
              </Form.Control>
          </Form.Group>
          
        </Form.Row>

        <br/>
        <Form.Row>
          <Form.Group as={Col} md="3">
            <Form.Label>Numero de documento de sustento:</Form.Label> 
          </Form.Group>
          <Form.Group as={Col} md="9">
            <Form.Control type="text" defaultValue={prps.num_doc_support} name="num_doc_support" />
          </Form.Group>
        </Form.Row>

        <br/>
        <Form.Row>
          <Form.Group as={Col} md="3">
            <Form.Label>Fecha de documento de sustento:</Form.Label> 
          </Form.Group>
          <Form.Group as={Col} md="9">
            <Form.Control type="date" defaultValue={prps.date_doc_support} name="fecha_doc_sustento" />
          </Form.Group>
        </Form.Row>

        <br/>
        <Form.Row>
          <Form.Group as={Col} md="3">
            <Form.Label>Asesor</Form.Label> 
          </Form.Group>
          <Form.Group as={Col} md="9">
            <Form.Control as="select"defaultValue={prps.id_adviser} name="adviser">
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
            <Form.Label>Alumno 1</Form.Label> 
          </Form.Group>
          <Form.Group as={Col} md="9">
            <Form.Control as="select"defaultValue={prps.id_estudiante_1} name="student_1" >
                {existe(prps.student_1)}
                <option value=''>--Sin alumno asignado--</option>
                {EstudiantesSinProyecto.map((alumno) => {
                  return (<option key={alumno.id} value={alumno.id}>{(alumno.last_name).toUpperCase()}, {alumno.first_name} ({alumno.code})</option>)
                })}
              </Form.Control>
          </Form.Group>
        </Form.Row>

        <br/>
        <Form.Row>
          <Form.Group as={Col} md="3">
            <Form.Label>Alumno 2</Form.Label> 
          </Form.Group>
          <Form.Group as={Col} md="9">
            <Form.Control as="select" defaultValue={prps.id_estudiante_2} name="student_2" id="modificar_estudiante_proyecto_2">
                {existe(prps.student_2)}
                <option value=''>--Sin alumno asignado--</option>
                {EstudiantesSinProyecto.map((alumno) => {
                  return (<option key={alumno.id} value={alumno.id}>{(alumno.last_name).toUpperCase()}, {alumno.first_name} ({alumno.code})</option>)
                })}
              </Form.Control>
          </Form.Group>
        </Form.Row>

        <br/>
        <Form.Row>
          <Form.Group as={Col} md="3">
            <Form.Label>Alumno 3</Form.Label> 
          </Form.Group>
          <Form.Group as={Col} md="9">
            <Form.Control as="select" defaultValue={prps.id_estudiante_3} name="student_3" id="modificar_estudiante_proyecto_3" disabled> 
                {existe(prps.student_3)}
                <option value=''>--Sin alumno asignado--</option>
                {EstudiantesSinProyecto.map((alumno) => {
                  return (<option key={alumno.id} value={alumno.id}>{(alumno.last_name).toUpperCase()}, {alumno.first_name} ({alumno.code})</option>)
                })}
              </Form.Control>
          </Form.Group>
        </Form.Row>
        <br/>

        <Form.Row>
          <Form.Group as={Col} md="3">
            <Form.Label>Escuela profesional</Form.Label> 
          </Form.Group>
          <Form.Group as={Col} md="9">
            <Form.Control as="select" defaultValue={prps.school} name="school"  > 
                <option value='1'>Ing. de Software</option>
              </Form.Control>
          </Form.Group>
        </Form.Row>

        <br/>
        <Form.Row>
          <Form.Group as={Col} md="3">
            <Form.Label>Periodo académico</Form.Label> 
          </Form.Group>
          <Form.Group as={Col} md="9">
              <Form.Control as="select" defaultValue={prps.period_academic} name="period_academic"> 
                  {PeriodosAcademicos.map((periodo) => {
                      return <option key={periodo.id} value={periodo.id}>{periodo.name}</option>
                  })}
              </Form.Control>
          </Form.Group>
        </Form.Row>

        <br/>
        <Form.Row>
          <Form.Group as={Col} md="3">
            <Form.Label>Curso de inicio</Form.Label> 
          </Form.Group>
          <Form.Group as={Col} md="9">
            <Form.Control as="select" name="course_initial"  defaultValue={prps.course_initial}  > 
                <option value='TESIS_1'>Tesis 1</option>
                <option value='TESIS_2'>Tesis 2</option>
              </Form.Control>
          </Form.Group>
        </Form.Row>

        <br/>
          {mostrarEstado(prps.state)}
        <br/>

        <br/>
        <div style={{textAlign: "center"}}>
         <Button style={{textAlign: "center"}} type="submit" variant="success">Modificar proyecto</Button>
        </div>
      </Form>
    );

}

function existe(objeto){
  if(objeto != null){
    return <option value={objeto.id}>{(objeto.last_name).toUpperCase()}, {(objeto.first_name)}</option>
  }
  return (<></>)
}

function mostrarEstado(state){
  if(state == 'ENTREGADO' || state == 'SUSTENTADO'){
    return (
      <>
        <Form.Row>
          <Form.Group as={Col} md="3">
            <Form.Label>Estado del proyecto</Form.Label> 
          </Form.Group>
          <Form.Group as={Col} md="9">   
              <Form.Control type="text" defaultValue={state} disabled/>
          </Form.Group>
        </Form.Row>
      </>
    );
  }
  return (
    <Form.Row>
      <Form.Group as={Col} md="3">
        <Form.Label>Estado del proyecto</Form.Label> 
      </Form.Group>
      <Form.Group as={Col} md="9">
        <Form.Control as="select" name="state"  defaultValue={state} > 
            <option value='PENDIENTE'>Pendiente</option>
            <option value='ACEPTADO'>Aceptado</option>
            <option value='SUSPENDIDO'>Suspendido</option>
            <option value='OBSERVADO'>Observado</option>
          </Form.Control>
      </Form.Group>
    </Form.Row>
  );
}