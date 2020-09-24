import React, {useState} from "react";
import {metodoGeneral} from '../lib/metodos'

import {Container, InputGroup, FormControl, Button, Form, Col} from 'react-bootstrap';

import {getJsonStorage} from '../lib/jsonStorages'
import useFetch from '../hooks/useFetch';
import TablaProyectos from '../components/ListaProyectos/tablaProyectos'
import FormBusquedaProyecto from '../components/ListaProyectos/formBusquedaProyecto'
import FormNuevoProyecto from '../components/ListaProyectos/formNuevoProyecto'
import ModalAgregarProyecto from '../components/Modales/modal'
import {useLocation, useHistory} from 'react-router-dom'

export default function ListaProyectos(props) {
    const search = useLocation().search
    const proyectos = useFetch(`/projects${search}`)
    const profesoresAsesores = useFetch('/faculties/teacher/available')
    const estudiantesSinProyecto = useFetch('/faculties/student/available')
    const periodosAcademicos = useFetch('/projects/periodacademic');
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
        <h3 style={{textAlign: "center"}}>Lista de Proyectos</h3>
            <br />
            <FormBusquedaProyecto periodosAcademicos={periodosAcademicos}/>

            <button type="button" className="btn btn-success" onClick = {openModalAgregar}>Nuevo Proyecto</button>
            <ModalAgregarProyecto isOpenModal = {isOpenModalAgregar} closeModal= {closeModalAgregar} >
                <FormNuevoProyecto profesores= {profesoresAsesores} estudiantesSinProyecto={estudiantesSinProyecto} periodosAcademicos={periodosAcademicos}/> 
            </ModalAgregarProyecto>
            <TablaProyectos proyectos = {proyectos} profesores= {profesoresAsesores} estudiantesSinProyecto={estudiantesSinProyecto} periodosAcademicos={periodosAcademicos}/>
        </Container>
    );

};