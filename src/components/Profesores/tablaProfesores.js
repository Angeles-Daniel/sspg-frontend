import React, {useState} from "react";
import useFetch from '../../hooks/useFetch'
import {setFecha} from '../../lib/metodos'
import {Container} from 'react-bootstrap';
import {ruta} from '../../lib/ruta'
import {setJsonStorage} from '../../lib/jsonStorages'
import {metodoGeneral} from '../../lib/metodos'
import FormModificarProfesor from './formModificarProfesor'
import FormEliminarProfesor from './formEliminarProfesor'
import ModalModificarProfesor from '../Modales/modal'
import ModalEliminarProfesor from '../Modales/modal'



export default function TablaProfesores(props) {
    const {profesores} = props
    const [isOpenModalModificar, setIsOpenModalModificar] = useState(false);
    const [isOpenModalEliminar, setIsOpenModalEliminar] = useState(false);
    const [prps, setPrps] = useState({});
    
    const openModalModificar = async (e) => {
        const tr = e.target.parentElement.parentElement;
        const idCompleto = tr.id.split('-')
        const id = idCompleto[1];
        const {
            first_name,
            last_name,
            codigo,
            document,
            email,
            phone,
            asesor
        } = await metodoGeneral(`/faculties/teacher/${id}`)

        const profesor = {
            id,
            first_name,
            last_name,
            codigo,
            document,
            email,
            phone,
            asesor
        }
        console.log(profesor);
        
        setPrps(profesor)
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
        const profesor = {
            id, name
        }
        setPrps(profesor)
        setIsOpenModalEliminar(true);
    }

    const closeModalEliminar = () => {
        setPrps({});
        setIsOpenModalEliminar(false);
    }

    if(profesores.loading || !profesores.result){
        return "loading..."
    }
          
    const Profesores = profesores.result;    
    console.log(Profesores);
    
    return (
        <>
            <ModalModificarProfesor isOpenModal={isOpenModalModificar} closeModal={closeModalModificar}> 
                <FormModificarProfesor prps={prps} setPrps={setPrps} />  
            </ModalModificarProfesor>
            <ModalEliminarProfesor isOpenModal={isOpenModalEliminar} closeModal={closeModalEliminar}>         
                <FormEliminarProfesor prps={prps} setPrps={setPrps} closeModal={closeModalEliminar}/>    
            </ModalEliminarProfesor>
            <table className ="table table-hover">
                <thead className = "table-secondary">
                    <tr>
                        <th>Codigo</th>
                        <th>Apellidos</th>
                        <th>Nombres</th>
                        <th>DNI</th>
                        <th>E-mail</th>
                        <th>Telefono</th>
                        <th>Funciones</th>

                    </tr>
                </thead>
                <tbody>
                    {Profesores.map((profesor, index) => {
                        return <Profesor key={profesor.id} profesor={profesor} 
                        openModalModificar = {openModalModificar}
                        openModalEliminar ={openModalEliminar}
                        />
                    })}
                </tbody>

            </table>
        </>
    )


};

function Profesor(props){
    const {profesor: {
        id,
        codigo,
        last_name,
        first_name,
        email,
        document,
        phone,
    },  openModalModificar,  openModalEliminar} = props;

    return (
        <tr id={`proyecto-${id}`}>
            <td>{codigo}</td>
            <td>{last_name}</td>
            <td>{first_name}</td>
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

