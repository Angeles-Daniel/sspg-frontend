import React, {useState} from "react";
import {metodoGeneral} from '../lib/metodos'

import {Container} from 'react-bootstrap';

import {getJsonStorage} from '../lib/jsonStorages'
import useFetch from '../hooks/useFetch';
import TablaProfesores from '../components/Profesores/tablaProfesores'
import FormNuevoProfesor from '../components/Profesores/formNuevoProfesor'
import FormBusquedaProfesor from '../components/Profesores/formBusquedaProfesor'
import ModalAgregarProfesor from '../components/Modales/modal'
import {useLocation} from 'react-router-dom'

export default function Profesores(props) {    
    const search = useLocation().search
    const profesores = useFetch(`/faculties/teacher${search}`);
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
        <h3 style={{textAlign: "center"}}>Lista de Profesores</h3>
            <br />
            <FormBusquedaProfesor/>

            <button type="button" className="btn btn-success" onClick = {openModalAgregar}>Nuevo Profesor</button>
            <ModalAgregarProfesor isOpenModal = {isOpenModalAgregar} closeModal= {closeModalAgregar} >
                <FormNuevoProfesor/> 
            </ModalAgregarProfesor>
            <br /><br />
            <TablaProfesores profesores = {profesores}/>
        </Container>
    );

};