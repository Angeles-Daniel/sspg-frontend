import React, {useState} from "react";
import useFetch from '../../hooks/useFetch'
import {setFecha} from '../../lib/metodos'
import {Container} from 'react-bootstrap';
import {ruta} from '../../lib/ruta'
import {setJsonStorage} from '../../lib/jsonStorages'
import {metodoGeneral} from '../../lib/metodos'
import FormJuradoProyecto from './formJuradoProyecto'
import ModalJuradoProyecto from '../Modales/modal'
import FormSuspenderProyecto from './formSuspenderProyecto'
import ModalSuspenderProyecto from '../Modales/modal'
import FormAprobarProyecto from './formAprobarProyecto'
import ModalAprobarProyecto from '../Modales/modal'
import FormEliminarProyecto from './formEliminarProyecto'
import ModalEliminarProyecto from '../Modales/modal'


export default function TablaProyectosSustentacion(props) {
    const {proyectos, profesores} = props
    const [isOpenModalJurado, setIsOpenModalJurado] = useState(false);
    const [isOpenModalSuspender, setIsOpenModalSuspender] = useState(false);
    const [isOpenModalAprobar, setIsOpenModalAprobar] = useState(false);
    const [isOpenModalEliminar, setIsOpenModalEliminar] = useState(false);
    const [prps, setPrps] = useState({});

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

    const openModalSuspender = (e) => {
        const tr = e.target.parentElement.parentElement;
        const idCompleto = tr.id.split('-')
        const id = idCompleto[1];
        const name = tr.firstElementChild.nextSibling.textContent;
        const proyecto = {
            id, name
        }
        setPrps(proyecto)
        setIsOpenModalSuspender(true);
    }

    const closeModalSuspender = () => {
        setPrps({});
        setIsOpenModalSuspender(false);
    }

    const openModalAprobar = async (e) => {
        const tr = e.target.parentElement.parentElement;
        const idCompleto = tr.id.split('-')
        const id = idCompleto[1];

        const {
            name,
            type,
            num_doc_support,
            student_1,
            student_2,
            student_3,
            adviser,
            jury_1,
            jury_2,
            jury_3,
            state,
            date_supporting,
            nota_project
        } = await metodoGeneral(`/projects/${id}`)

        let estudiante = ''
        let asesor = ''
        if(student_1 != null){estudiante = `${(student_1.last_name.toUpperCase())}, ${student_1.first_name}`;  }
        if(student_2 != null){estudiante += `;   ${(student_2.last_name.toUpperCase())}, ${student_2.first_name}`}
        if(student_3 != null){estudiante += `;   ${(student_3.last_name.toUpperCase())} ${student_3.first_name}`}

        let tipo = ''

        if(type == 'TESIS'){tipo = 'Tesis de grado'}
        else if(type == 'TI'){tipo = 'Trabajo de investigación'}
        else if(type == 'TSP'){tipo = 'Trabajo de suficiencia profesional'}

        let date = ''
        if(date_supporting != null){
            date = date_supporting.split(':')
            date = date[0] + ':' + date[1] 
        }

        if(adviser != null){asesor = `${(adviser.last_name.toUpperCase())}, ${adviser.first_name}`;}

        let jurado1 = ''
        let jurado2 = ''
        let jurado3 = ''
        if(jury_1 != null){jurado1 = jury_1.id}
        if(jury_2 != null){jurado2 = jury_2.id}
        if(jury_3 != null){jurado3 = jury_3.id}

        const proyecto = {
            id,
            name,
            tipo,
            estudiante,
            asesor,
            date_supporting: date,
            num_doc_support,
            jury_1: jurado1,
            jury_2: jurado2,
            jury_3: jurado3,
            state,
            nota_project
        }

        setPrps(proyecto)
        setIsOpenModalAprobar(true);
    }

    const closeModalAprobar = () => {
        setPrps({});
        setIsOpenModalAprobar(false);
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

    if(proyectos.loading || !proyectos.result || profesores.loading || !profesores.result ){
        return "loading..."
    }
          
    const Proyects = proyectos.result;    
    const Profesores = profesores.result;  

    return (
        <>
            <ModalJuradoProyecto isOpenModal={isOpenModalJurado} closeModal={closeModalJurado}>         
                <FormJuradoProyecto prps={prps} setPrps={setPrps} Profesores={Profesores}/>  
            </ModalJuradoProyecto>
            <ModalSuspenderProyecto isOpenModal={isOpenModalSuspender} closeModal={closeModalSuspender}>         
                <FormSuspenderProyecto prps={prps} setPrps={setPrps} closeModal={closeModalSuspender}/>    
            </ModalSuspenderProyecto>
            <ModalAprobarProyecto isOpenModal={isOpenModalAprobar} closeModal={closeModalAprobar}>         
                <FormAprobarProyecto prps={prps} setPrps={setPrps} closeModal={closeModalAprobar} Profesores={Profesores}/>    
            </ModalAprobarProyecto>
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
                        <th>Jurado</th>
                        <th>Fecha</th>
                        <th>Hora</th>
                        <th>Estado</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {Proyects.map((proyecto, index) => {
                        return <Proyecto key={proyecto.id} proyecto={proyecto} 
                        openModalJurado = {openModalJurado} openModalSuspender={openModalSuspender} openModalAprobar={openModalAprobar} openModalEliminar={openModalEliminar}
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
        jury_1,
        jury_2,
        jury_3,
        adviser,
        state,
        date_supporting
    },   openModalJurado, openModalSuspender, openModalAprobar, openModalEliminar } = props;
    
    let tipo = '';
    let asesor = 'Sin asesor asignado'
    let estudiante = '';
    let jurado = ''
    let fecha = ''
    let hora = '' 

    let fechaHora = date_supporting.split('T');
    fecha = fechaHora[0];
    hora = fechaHora[1].split(':');
    hora = hora[0] + ':' + hora[1]

    if(adviser != undefined){asesor = `${adviser.last_name} ${adviser.first_name}`;}

    if(student_1 != null){estudiante = `${student_1.last_name}, ${student_1.first_name}`;}
    if(student_2 != null){estudiante += `; ${student_2.last_name}, ${student_2.first_name}`}
    if(student_3 != null){estudiante += `; ${student_3.last_name} ${student_3.first_name}`}

    if(jury_1 != null){jurado = `${jury_1.last_name}, ${jury_1.first_name}`;}
    if(jury_2 != null){jurado += `; ${jury_2.last_name}, ${jury_2.first_name}`}
    if(jury_3 != null){jurado += `; ${jury_3.last_name} ${jury_3.first_name}`}
    


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
            <td>{jurado}</td>
            <td>{fecha}</td>
            <td>{hora}</td>
            <td>{state}</td>
            <td>
                {botonSustentacion(state, openModalJurado, openModalSuspender, openModalAprobar, openModalEliminar)}
            </td>
        </tr>
    );
}

const botonSustentacion = (state, openModalJurado, openModalSuspender, openModalAprobar, openModalEliminar) => {
    if(state != 'SUSTENTADO'){
        return (<>
                <button type="button" className="btn btn-danger"  onClick={openModalSuspender}   >Suspender   </button>{"  "}
                <button type="button" className="btn btn-info"  onClick={openModalJurado}   >Sustentación   </button>
                <button type="button" className="btn btn-primary"  onClick={openModalAprobar}   >Aprobar   </button>{"  "}
            </>
        )
    }
    return (
        <>
            <button type="button" className="btn btn-warning"  onClick={openModalAprobar}   >Modificar</button>{"  "}
            <button type="button" className="btn btn-danger"  onClick={openModalEliminar}   >Eliminar    </button>{"  "}
        </>
    )
}