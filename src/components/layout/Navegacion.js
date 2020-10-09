import React from 'react';
import {Container, Navbar, Nav, Button, Form, FormControl } from 'react-bootstrap';
import {useParams} from 'react-router-dom'
import LogoRedux from '../../public/redux.png';
import {setJsonStorage} from '../../lib/jsonStorages';

import '../../public/nav.scss';

export default function Navegacion(props){
    const {state} = props;
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                {labelSSPG()}
                {barraNavegacion()}
                <Form inline>
                    {Deslogueo()}
                </Form>
            </Container>
      </Navbar>
    );
}

function Deslogueo(){
    const token = localStorage.getItem('SSPG_token');
    if(token.length < 3) return (<></>)
    
    const deslogueo = () => {
        setJsonStorage('SSPG_token', '');
        setJsonStorage('SSPG_usuario', '');
        setJsonStorage('modalProps', '');
    }
    return(
        <Button href='/' onClick={deslogueo} variant="outline-info" >Deslogueo</Button>
    )
}

function labelSSPG(){
    const token = localStorage.getItem('SSPG_token');
    if(token.length < 3) 
    return (
        <Navbar.Brand href="/">
            <img 
                alt="Planilla Fugusa" 
                src={LogoRedux}
                id='LogoRedux'
                width="30"
                height="30"
                className="d-inline-block aling top mr-4"
            />
            SSPG
        </Navbar.Brand>
    )
    return (
        <Navbar.Brand href="/ListaProyectos?general=true">
        <img 
            alt="Planilla Fugusa" 
            src={LogoRedux}
            id='LogoRedux'
            width="30"
            height="30"
            className="d-inline-block aling top mr-4"
        />
        SSPG
    </Navbar.Brand>
    );
}

function barraNavegacion(){
    const token = localStorage.getItem('SSPG_token');
    if(token.length < 3) return (<></>)

    return(
        <Nav className="mr-auto">
            <Nav.Link href={`/listaProyectos?general=true`}>Proyectos</Nav.Link>
            <Nav.Link href={`/sustentacion?sustentacion=true`}>Sustentaciones</Nav.Link>
            <Nav.Link href={`/alumnos`}>Alumnos</Nav.Link>
            <Nav.Link href={`/profesores`}>Docentes</Nav.Link>
        </Nav>
    )
}
