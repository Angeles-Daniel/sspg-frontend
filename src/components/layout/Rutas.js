import React, {useState, useEffect} from 'react';

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Error404 from '../../pages/error404'
import Home from '../../pages/home'
import ListaProyectos from '../../pages/listaProyectos'
import Sustentacion from '../../pages/sustentacion'
import Login from '../../pages/login'
// import Documentacion from '../../pages/documentacion'
import Alumnos from '../../pages/alumnos'
import Profesores from '../../pages/profesores'
import Navegacion from './Navegacion'

export default function Rutas() {
    const [state, setState] = useState(false);

    return(
        <Router>
            <Navegacion state={state}/>

            <Switch>
                <Route path="/" exact={true}>
                    <Home setState={setState} state={false}/>
                </Route>

                <Route path="/login" exact={true}>
                    <Login setState={setState}state={false}/>
                </Route>

                <Route path="/listaProyectos" exact={true}>
                    <ListaProyectos setState={setState} state={false}/>
                </Route>

                <Route path="/sustentacion" exact={true}>
                    <Sustentacion setState={setState} state={false}/>
                </Route>

                <Route path="/alumnos" exact={true}>
                    <Alumnos setState={setState} state={false}/>
                </Route>

                <Route path="/profesores" exact={true}>
                    <Profesores setState={setState} state={false}/>
                </Route>

                <Route path="*"><Error404/></Route>
            </Switch>
        </Router>
    )
};
