import React, {useState} from "react";
import useFetch from '../../hooks/useFetch'
import {setFecha} from '../../lib/metodos'
import {Container} from 'react-bootstrap';
import {ruta} from '../../lib/ruta'
import {setJsonStorage} from '../../lib/jsonStorages'
import {metodoGeneral} from '../../lib/metodos'
import FormModificarProyecto from './formModificarProyecto'
import FormEliminarProyecto from './formEliminarProyecto'
import ModalModificarProyecto from '../Modales/modal'
import ModalEliminarProyecto from '../Modales/modal'



export default function TablaProyectos(props) {
    const {proyectos, profesores, estudiantesSinProyecto} = props
    const [isOpenModalModificar, setIsOpenModalModificar] = useState(false);
    const [isOpenModalEliminar, setIsOpenModalEliminar] = useState(false);
    const [prps, setPrps] = useState({});
    
    const openModalModificar = async (e) => {
        const tr = e.target.parentElement.parentElement;
        const idCompleto = tr.id.split('-')
        const id = idCompleto[1];
        const {
            name,
            code,
            type,
            num_doc_support,
            date_doc_support,
            adviser,
            student_1,
            student_2,
            student_3,
            school,
            state,
            course_initial,
        } = await metodoGeneral(`/projects/${id}`)

        let id_adviser = ''
        let id_student_1 = ''
        let id_student_2 = ''
        let id_student_3 = ''
        if(adviser != null){ id_adviser = adviser.id}
        if(student_1 != null){ id_student_1 = student_1.id}
        if(student_2 != null){ id_student_2 = student_2.id}
        if(student_3 != null){ id_student_3 = student_3.id}

        const proyecto = {
            id,
            name,
            code,
            type,
            num_doc_support,
            date_doc_support,
            adviser,
            student_1,
            student_2,
            student_3,
            school,
            state,
            course_initial,
            id_adviser,
            id_student_1,
            id_student_2,
            id_student_3
        }
        setPrps(proyecto)
        setIsOpenModalModificar(true);
    }
    const closeModalModificar = () => {
        setPrps({});
        setIsOpenModalModificar(false);
    }

    const openModalEliminar = (e) => {
        const tr = e.target.parentElement.parentElement;
        const idCompleto = tr.id.split('-')
        const id = idCompleto[1];
        const name = tr.firstElementChild.nextSibling.textContent;
        const proyecto = {
            id, name
        }
        setPrps(proyecto)
        setIsOpenModalEliminar(true);
    }

    const closeModalEliminar = () => {
        setPrps({});
        setIsOpenModalEliminar(false);
    }

    if(proyectos.loading || !proyectos.result || profesores.loading || !profesores.result  || estudiantesSinProyecto.loading || !estudiantesSinProyecto.result ){
        return "loading..."
    }
          
    const Proyects = proyectos.result;    
    const Profesores = profesores.result;
    const EstudiantesSinProyecto = estudiantesSinProyecto.result;

    return (
        <>
            <ModalModificarProyecto isOpenModal={isOpenModalModificar} closeModal={closeModalModificar}> 
                <FormModificarProyecto prps={prps} setPrps={setPrps} Profesores={Profesores} EstudiantesSinProyecto={EstudiantesSinProyecto} />  
            </ModalModificarProyecto>
            <ModalEliminarProyecto isOpenModal={isOpenModalEliminar} closeModal={closeModalEliminar}>         
                <FormEliminarProyecto prps={prps} setPrps={setPrps} closeModal={closeModalEliminar}/>    
            </ModalEliminarProyecto>
            <table className ="table table-hover">
                <thead className = "table-secondary">
                    <tr>
                        <th>Id proyecto</th>
                        <th>Nombre</th>
                        <th>Tipo de proyecto</th>
                        <th>Alumno(s)</th>
                        <th>Asesor</th>
                        <th>Curso de inicio</th>
                        <th>Estado</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {Proyects.map((proyecto, index) => {
                        return <Proyecto key={proyecto.id} proyecto={proyecto} 
                        openModalModificar = {openModalModificar}
                        openModalEliminar ={openModalEliminar}
                        />
                    })}
                </tbody>

            </table>
        </>
    )


};

function Proyecto(props){
    const {proyecto: {
        id,
        name,
        type, 
        student_1,
        student_2,
        student_3,
        adviser,
        state,
        course_initial,
    },  openModalModificar,  openModalEliminar} = props;
    
    let tipo = '';
    let asesor = 'Sin asesor asignado'
    let estudiante = '';

    if(adviser != undefined){asesor = `${adviser.first_name} ${adviser.last_name}`;}

    if(student_1 != null){estudiante = `${student_1.first_name} ${student_1.last_name}`;}
    if(student_2 != null){estudiante += `; ${student_2.first_name} ${student_2.last_name}`}
    if(student_3 != null){estudiante += `; ${student_3.first_name} ${student_3.last_name}`}
    
    if(type == 'TI'){tipo = 'Trabajo de investigación'}
    else if(type == 'TESIS'){tipo = 'Tesis de Pregrado'}
    else if(type == 'TSP'){tipo = 'Trabajo de Suficiencia profesional'}

    return (
        <tr id={`proyecto-${id}`}>
            <td>{id}</td>
            <td>{name}</td>
            <td>{tipo}</td>
            <td>{estudiante}</td>
            <td>{asesor}</td>
            <td>{course_initial}</td>
            <td>{state}</td>
            <td>
                <button type="button" className="btn btn-primary" onClick={openModalModificar}  >Modificar  </button>{"  "}
                <button type="button" className="btn btn-danger"  onClick={openModalEliminar}   >Eliminar   </button>
            </td>
        </tr>
    );
}


// adviser: {id: 1, creation_date: "2020-08-28T05:39:26.460101Z", update_date: "2020-08-28T05:39:26.460127Z", last_name: "Wong", first_name: "Lennis", …}
// code: "er123"
// congress: null
// creation_date: "2020-08-28T05:42:29.308483Z"
// date_acceptance: null
// date_doc: null
// date_register: "2020-08-28T05:42:24Z"
// date_supporting: null
// date_validity: null
// id: 1
// jury_1: {id: 2, creation_date: "2020-08-28T05:41:22.753971Z", update_date: "2020-08-28T05:41:22.753992Z", last_name: "Gamarra", first_name: "Juan", …}
// jury_2: {id: 3, creation_date: "2020-08-28T05:41:42.728309Z", update_date: "2020-08-28T05:41:42.728344Z", last_name: "Machado", first_name: "Joel", …}
// jury_3: {id: 4, creation_date: "2020-08-28T05:42:16.829347Z", update_date: "2020-08-28T05:42:16.829367Z", last_name: "Bartra", first_name: "Alejandro", …}
// name: "Tesis del danielito"
// num_rd: "1234"
// school: 1
// state: "RECEIVED"
// student_1: {id: 1, creation_date: "2020-08-28T05:38:59.123552Z", update_date: "2020-08-28T05:38:59.123575Z", code: "12345", type_document: "DNI", …}
// student_2: null
// student_3: null
// type: "TI"
// update_date: "2020-08-28T06:05:22.647591Z"