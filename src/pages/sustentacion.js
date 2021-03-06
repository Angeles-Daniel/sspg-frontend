import React, {useState} from "react";
import {metodoGeneral} from '../lib/metodos'

import {Container, InputGroup, FormControl, Button, Form, Col} from 'react-bootstrap';

import {getJsonStorage} from '../lib/jsonStorages'
import useFetch from '../hooks/useFetch';
import TablaProyectosSustentacion from '../components/ListaProyectos/tablaProyectosSustentacion'
import FormBusquedaProyecto from '../components/ListaProyectos/formBusquedaProyecto'
import FormNuevoProyecto from '../components/ListaProyectos/formNuevoProyecto'
import ModalAgregarProyecto from '../components/Modales/modal'
import {generarPDF} from '../lib/reporteProyectos'
import {useLocation} from 'react-router-dom'

export default function Sustentacion(props) {
    const search = useLocation().search
    const proyectos = useFetch(`/projects${search}`)
    const profesoresAsesores = useFetch('/faculties/teacher/available')
    const periodosAcademicos = useFetch('/projects/periodacademic');
    const {setState,state} = props; setState(state);

    const crearReporte = () => {
        const titulo = 'REPORTE DE SUSTENTACIONES'
        generarPDF(titulo, proyectos)
    }

    return (
        <Container>
        <br></br><br></br>
        <h3 style={{textAlign: "center"}}>Sustentaciones</h3>
            <br />
            <FormBusquedaProyecto periodosAcademicos={periodosAcademicos} bandera={false} ruta='sustentacion'/>
            <button type="button" className="btn btn-primary" onClick = {crearReporte}>Reporte</button>
            <TablaProyectosSustentacion proyectos = {proyectos} profesores= {profesoresAsesores} />
        </Container>
    );

};
