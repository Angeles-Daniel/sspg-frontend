import React, {useState} from "react";
import useFetch from '../../hooks/useFetch'
import {setFecha} from '../../lib/metodos'
import {Container} from 'react-bootstrap';
import {ruta} from '../../lib/ruta'
import {setJsonStorage} from '../../lib/jsonStorages'
import {metodoGeneral} from '../../lib/metodos'
import FormModificarProyecto from './formModificarProyecto'
import FormEliminarProyecto from './formEliminarProyecto'
import FormJuradoProyecto from './formJuradoProyecto'
import ModalModificarProyecto from '../Modales/modal'
import ModalJuradoProyecto from '../Modales/modal'
import ModalEliminarProyecto from '../Modales/modal'



export default function TablaProyectos(props) {
    const {proyectos, profesores, estudiantesSinProyecto, periodosAcademicos} = props
    const [isOpenModalModificar, setIsOpenModalModificar] = useState(false);
    const [isOpenModalJurado, setIsOpenModalJurado] = useState(false);
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
            period_academic,
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
            id_student_3,
            period_academic: period_academic.id
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

    const openModalJurado = async (e) => {
        const tr = e.target.parentElement.parentElement;
        const idCompleto = tr.id.split('-')
        const id = idCompleto[1];

        const {
            name,
            type,
            num_doc_support,
            jury_1,
            jury_2,
            jury_3,
            state,
            date_supporting
        } = await metodoGeneral(`/projects/${id}`)

        let date = ''
        if(date_supporting != null){
            date = date_supporting.split(':')
            date = date[0] + ':' + date[1] 
        }

        let jurado1 = ''
        let jurado2 = ''
        let jurado3 = ''
        if(jury_1 != null){jurado1 = jury_1.id}
        if(jury_2 != null){jurado2 = jury_2.id}
        if(jury_3 != null){jurado3 = jury_3.id}

        const proyecto = {
            id,
            name,
            type,
            date_supporting: date,
            num_doc_support,
            jury_1: jurado1,
            jury_2: jurado2,
            jury_3: jurado3,
            state
        }
        
        setPrps(proyecto)
        setIsOpenModalJurado(true);
    }

    const closeModalJurado = () => {
        setPrps({});
        setIsOpenModalJurado(false);
    }

    if(proyectos.loading || !proyectos.result || profesores.loading || !profesores.result  || estudiantesSinProyecto.loading || !estudiantesSinProyecto.result || periodosAcademicos.loading || !periodosAcademicos.result){
        return "loading..."
    }
          
    const Proyects = proyectos.result;    
    const Profesores = profesores.result;
    const EstudiantesSinProyecto = estudiantesSinProyecto.result;
    const PeriodosAcademicos = periodosAcademicos.result;

    return (
        <>
            <ModalModificarProyecto isOpenModal={isOpenModalModificar} closeModal={closeModalModificar}> 
                <FormModificarProyecto prps={prps} setPrps={setPrps} Profesores={Profesores} EstudiantesSinProyecto={EstudiantesSinProyecto} PeriodosAcademicos={PeriodosAcademicos}/>  
            </ModalModificarProyecto>
            <ModalJuradoProyecto isOpenModal={isOpenModalJurado} closeModal={closeModalJurado}>         
                <FormJuradoProyecto prps={prps} setPrps={setPrps} Profesores={Profesores}/>  
            </ModalJuradoProyecto>
            <ModalEliminarProyecto isOpenModal={isOpenModalEliminar} closeModal={closeModalEliminar}>         
                <FormEliminarProyecto prps={prps} setPrps={setPrps} closeModal={closeModalEliminar}/>    
            </ModalEliminarProyecto>
            <table className ="table table-hover">
                <thead className = "table-secondary">
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Tipo de proyecto</th>
                        <th>Alumno(s)</th>
                        <th>Asesor</th>
                        <th>Periodo académico</th>
                        <th>Curso de inicio</th>
                        <th>Estado</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {Proyects.map((proyecto, index) => {
                        return <Proyecto key={proyecto.id} proyecto={proyecto} 
                        openModalModificar = {openModalModificar}
                        openModalJurado = {openModalJurado}
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
        period_academic
    },  openModalModificar, openModalJurado ,openModalEliminar} = props;
    
    let tipo = '';
    let asesor = 'Sin asesor asignado'
    let estudiante = '';

    if(adviser != undefined){asesor = `${adviser.last_name} ${adviser.first_name}`;}

    if(student_1 != null){estudiante = `${student_1.last_name}, ${student_1.first_name}`;}
    if(student_2 != null){estudiante += `; ${student_2.last_name}, ${student_2.first_name}`}
    if(student_3 != null){estudiante += `; ${student_3.last_name} ${student_3.first_name}`}
    
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
            <td>{period_academic.name}</td>
            <td>{course_initial}</td>
            <td>{state}</td>
            <td>
                <button type="button" className="btn btn-primary" onClick={openModalModificar}  >Modificar  </button>{"  "}
                {botonSustentacion(state, openModalJurado)}
                <button type="button" className="btn btn-danger"  onClick={openModalEliminar}   >Eliminar   </button>
            </td>
        </tr>
    );
}

const botonSustentacion = (state, openModalJurado) => {
    if(state != 'PENDIENTE'){
        return (<>
                <button type="button" className="btn btn-info"  onClick={openModalJurado}   >Sustentación   </button>
                {"  "}
            </>
        )
    }
}
