import React, {useState} from "react";
import useFetch from '../../hooks/useFetch'
import {setFecha} from '../../lib/metodos'
import {Container} from 'react-bootstrap';
import {ruta} from '../../lib/ruta'
import {setJsonStorage} from '../../lib/jsonStorages'
import {metodoGeneral} from '../../lib/metodos'
import FormModificarAlumno from './formModificarAlumno'
import FormEliminarAlumno from './formEliminarAlumno'
import ModalModificarAlumno from '../Modales/modal'
import ModalEliminarAlumno from '../Modales/modal'



export default function TablaAlumnos(props) {
    const {alumnos} = props
    const [isOpenModalModificar, setIsOpenModalModificar] = useState(false);
    const [isOpenModalEliminar, setIsOpenModalEliminar] = useState(false);
    const [prps, setPrps] = useState({});
    
    const openModalModificar = async (e) => {
        const tr = e.target.parentElement.parentElement;
        const idCompleto = tr.id.split('-')
        const id = idCompleto[1];
        const {
            code,
            first_name,
            last_name,
            document,
            email,
            phone,
            semester_1,
            qualification_1,
            semester_2,
            qualification_2,
            grade
        } = await metodoGeneral(`/faculties/student/${id}`)

        const alumno = {
            id,
            code,
            first_name,
            last_name,
            document,
            email,
            phone,
            semester_1,
            qualification_1,
            semester_2,
            qualification_2,
            grade
        }
        console.log(alumno);
        
        setPrps(alumno)
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
        const name = tr.firstElementChild.nextSibling.textContent+', '+tr.firstElementChild.nextSibling.nextSibling.textContent;
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

    if(alumnos.loading || !alumnos.result){
        return "loading..."
    }
          
    const Alumnos = alumnos.result;    
    console.log(Alumnos);
    
    return (
        <>
            <ModalModificarAlumno isOpenModal={isOpenModalModificar} closeModal={closeModalModificar}> 
                <FormModificarAlumno prps={prps} setPrps={setPrps} />  
            </ModalModificarAlumno>
            <ModalEliminarAlumno isOpenModal={isOpenModalEliminar} closeModal={closeModalEliminar}>         
                <FormEliminarAlumno prps={prps} setPrps={setPrps} closeModal={closeModalEliminar}/>    
            </ModalEliminarAlumno>
            <table className ="table table-hover">
                <thead className = "table-secondary">
                    <tr>
                        <th>Codigo</th>
                        <th>Apellidos</th>
                        <th>Nombres</th>
                        <th>Grado</th>
                        <th>DNI</th>
                        <th>E-mail</th>
                        <th>Telefono</th>
                        <th>Funciones</th>

                    </tr>
                </thead>
                <tbody>
                    {Alumnos.map((alumno, index) => {
                        return <Alumno key={alumno.id} alumno={alumno} 
                        openModalModificar = {openModalModificar}
                        openModalEliminar ={openModalEliminar}
                        />
                    })}
                </tbody>

            </table>
        </>
    )


};

function Alumno(props){
    const {alumno: {
        id,
        code,
        last_name,
        first_name,
        email,
        document,
        phone,
        grade
    },  openModalModificar,  openModalEliminar} = props;

    return (
        <tr id={`proyecto-${id}`}>
            <td>{code}</td>
            <td>{last_name}</td>
            <td>{first_name}</td>
            <td>{grade}</td>
            <td>{document}</td>
            <td>{email}</td>
            <td>{phone}</td>
            <td>
                <button type="button" className="btn btn-primary" onClick={openModalModificar}  >Modificar  </button>{"  "}
                <button type="button" className="btn btn-danger"  onClick={openModalEliminar}   >Eliminar   </button>
            </td>
        </tr>
    );
}

