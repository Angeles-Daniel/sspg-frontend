import React, {useState} from 'react';
import {Form, Button, Col} from 'react-bootstrap';
import {getJsonStorage} from '../../lib/jsonStorages'
import {metodoGeneral} from '../../lib/metodos'

export default function FormNuevoProyecto(props) {
    const {profesores, estudiantesSinProyecto, periodosAcademicos} = props;
    const [validated, setValidated] = useState(false);
    const [formValue, setFormValue] = useState({
        name: '',
        code: '',
        type: 'TI',
        num_doc_support: '',
        date_doc_support: null,
        adviser: '',
        student_1: '',
        student_2: '',
        student_3: '',
        school: '1',
        course_initial: 'TESIS_1',
        state: 'PENDIENTE',
        period_academic: '1'
    });
    
    const onChange = async e => {
      setFormValue({
          ...formValue,
          [e.target.name]: e.target.value,
      })
    }

    const tipoProyectoChange = e => {
        e.preventDefault();
        const estudiante_2 = document.getElementById('nuevo_estudiante_proyecto_2')
        const estudiante_3 = document.getElementById('nuevo_estudiante_proyecto_3')
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
          estudiante_3.value = '';
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
        const objeto = {
          name: formValue.name,
          code: formValue.code,
          type: formValue.type,
          num_doc_support:formValue.num_doc_support,
          date_doc_support :formValue.date_doc_support,
          school: formValue.school,
          course_initial: formValue.course_initial,
          state: formValue.state,
          period_academic: formValue.period_academic
        }
        if(formValue.adviser.length != 0){
          objeto.adviser = formValue.adviser;
        }
        if(formValue.student_1.length != 0){
          objeto.student_1 = formValue.student_1
        }
        if(formValue.student_2.length != 0){
          objeto.student_2 = formValue.student_2
        }
        if(formValue.student_3.length != 0){
          objeto.student_3 = formValue.student_3
        }
        const res = await metodoGeneral('/projects/','POST',objeto)  //mandar objeto al back para el registro
        console.log(res);
        window.location.reload();
      }     
      setValidated(true)
    };

    if(profesores.loading || !profesores.result || estudiantesSinProyecto.loading || !estudiantesSinProyecto.result || periodosAcademicos.loading || !periodosAcademicos.result){
      return "loading..."
    }
    const Profesores = profesores.result;
    const EstudiantesSinProyecto = estudiantesSinProyecto.result;
    const PeriodosAcademicos = periodosAcademicos.result;

    return (
      <Form noValidate 
      validated={validated} onSubmit={handleSubmit} onChange={onChange} 
      className="m-4">
        <Form.Group className="text-center" >
            <h2>Nuevo proyecto</h2>
        </Form.Group>
        <br/>
        <br/>

        <Form.Row>
          <Form.Group as={Col} md="3">
            <Form.Label>Titulo:</Form.Label> 
          </Form.Group>
          <Form.Group as={Col} md="9">
            <Form.Control type="text" name="name" required/>
          </Form.Group>
        </Form.Row>

        <br/>
        <Form.Row>
          <Form.Group as={Col} md="3">
            <Form.Label>Codigo:</Form.Label> 
          </Form.Group>
          <Form.Group as={Col} md="9">
            <Form.Control type="text" name="code" />
          </Form.Group>
        </Form.Row>

        <br/>
        <Form.Row>
          <Form.Group as={Col} md="3">
            <Form.Label>Tipo de proyecto</Form.Label> 
          </Form.Group>
          <Form.Group as={Col} md="9">
            <Form.Control as="select" name="type" onChange={tipoProyectoChange}>
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
            <Form.Control type="text" name="num_doc_support" />
          </Form.Group>
        </Form.Row>

        <br/>
        <Form.Row>
          <Form.Group as={Col} md="3">
            <Form.Label>Fecha de documento de sustento:</Form.Label> 
          </Form.Group>
          <Form.Group as={Col} md="9">
            <Form.Control type="date" name="date_doc_support" />
          </Form.Group>
        </Form.Row>

        <br/>
        <Form.Row>
          <Form.Group as={Col} md="3">
            <Form.Label>Asesor</Form.Label> 
          </Form.Group>
          <Form.Group as={Col} md="9">
            <Form.Control as="select" name="adviser">
                <option value=''>--ELEGIR ASESOR--</option>
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
            <Form.Control as="select" name="student_1">
                <option value=''>--ELEGIR ALUMNO--</option>
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
            <Form.Control as="select" name="student_2" id="nuevo_estudiante_proyecto_2">
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
            <Form.Control as="select" name="student_3" id="nuevo_estudiante_proyecto_3" disabled> 
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
            <Form.Control as="select" name="school"  > 
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
              <Form.Control as="select" name="period_academic"> 
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
            <Form.Control as="select" name="course_initial"  > 
                <option value='TESIS_1'>Tesis 1</option>
                <option value='TESIS_2'>Tesis 2</option>
              </Form.Control>
          </Form.Group>
        </Form.Row>

        <br/>
        <Form.Row>
          <Form.Group as={Col} md="3">
            <Form.Label>Estado del proyecto</Form.Label> 
          </Form.Group>
          <Form.Group as={Col} md="9">
            <Form.Control as="select" name="state"  > 
                <option value='PENDIENTE'>Pendiente</option>
                <option value='ACEPTADO'>Aceptado</option>
                <option value='SUSPENDIDO'>Suspendido</option>
                <option value='OBSERVADO'>Observado</option>
              </Form.Control>
          </Form.Group>
        </Form.Row>
        <br/>

        <br/>
        <div style={{textAlign: "center"}}>
         <Button style={{textAlign: "center"}} type="submit" variant="success">Crear nuevo proyecto</Button>
        </div>
      </Form>
    );

}















// name: "Tesis del danielito"
// code: "er123"
// type: "TI"
// state: "RECEIVED"
// num_rd: "1234"
// adviser: {id: 1, creation_date: "2020-08-28T05:39:26.460101Z", update_date: "2020-08-28T05:39:26.460127Z", last_name: "Wong", first_name: "Lennis", …}
// student_1: {id: 1, creation_date: "2020-08-28T05:38:59.123552Z", update_date: "2020-08-28T05:38:59.123575Z", code: "12345", type_document: "DNI", …}
// student_2: null
// student_3: null
// school: 1
// jury_1: {id: 2, creation_date: "2020-08-28T05:41:22.753971Z", update_date: "2020-08-28T05:41:22.753992Z", last_name: "Gamarra", first_name: "Juan", …}
// jury_2: {id: 3, creation_date: "2020-08-28T05:41:42.728309Z", update_date: "2020-08-28T05:41:42.728344Z", last_name: "Machado", first_name: "Joel", …}
// jury_3: {id: 4, creation_date: "2020-08-28T05:42:16.829347Z", update_date: "2020-08-28T05:42:16.829367Z", last_name: "Bartra", first_name: "Alejandro", …}
// congress: null
// creation_date: "2020-08-28T05:42:29.308483Z"
// date_acceptance: null
// date_doc: null
// date_register: "2020-08-28T05:42:24Z"
// date_supporting: null
// date_validity: null
// update_date: "2020-08-28T06:05:22.647591Z"