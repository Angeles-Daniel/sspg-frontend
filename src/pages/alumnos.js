import React, {useState} from "react";
import {metodoGeneral} from '../lib/metodos'

import {Container} from 'react-bootstrap';

import {getJsonStorage} from '../lib/jsonStorages'
import useFetch from '../hooks/useFetch';
import TablaAlumnos from '../components/Alumnos/tablaAlumnos'
import FormNuevoAlumno from '../components/Alumnos/formNuevoAlumno'
import ModalAgregarAlumno from '../components/Modales/modal'
import FormBusquedaAlumno from '../components/Alumnos/formBusquedaAlumno'
import {useLocation} from 'react-router-dom'

export default function Alumnos(props) {    
    const search = useLocation().search
    const alumnos = useFetch(`/faculties/student${search}`);
    const {setState,state} = props; setState(state);
    const [isOpenModalAgregar, setIsOpenModalAgregar] = useState(false);

    const openModalAgregar = () => {
        setIsOpenModalAgregar(true);
    }

    const closeModalAgregar = () => {
        setIsOpenModalAgregar(false);
    }

    return (
        <Container>
        <br></br><br></br>
        <h3 style={{textAlign: "center"}}>Lista de alumnos</h3>
            <br />
            <FormBusquedaAlumno/>

            <button type="button" className="btn btn-success" onClick = {openModalAgregar}>Nuevo Alumno</button>
            <ModalAgregarAlumno isOpenModal = {isOpenModalAgregar} closeModal= {closeModalAgregar} >
                <FormNuevoAlumno/> 
            </ModalAgregarAlumno>
            <br /><br />
            <TablaAlumnos alumnos = {alumnos}/>
        </Container>
    );

};