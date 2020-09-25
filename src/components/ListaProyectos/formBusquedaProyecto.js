import React, {useState} from 'react';
import {InputGroup, FormControl, Button, Form, Col} from 'react-bootstrap';
import {useHistory} from 'react-router-dom'

export default function FormBusquedaProyecto(props) {
    const history = useHistory();
    const {periodosAcademicos} = props;
    const [formValue, setFormValue] = useState({
        search: '',
        state: '',
        type: '',
        periodo: '',
    });
    
    const onChange = async e => {
      setFormValue({
          ...formValue,
          [e.target.name]: e.target.value,
      })
    }

    const handleSubmit = async event => {
      event.preventDefault();
      console.log(formValue);
      let valoresValue = ''
      const valoresValuesArray = []
      if(formValue.search.length != 0){ valoresValuesArray.push(`search=${formValue.search}`) }
      if(formValue.state.length != 0){ valoresValuesArray.push(`state=${formValue.state}`) }
      if(formValue.type.length != 0){ valoresValuesArray.push(`type=${formValue.type}`) }
      if(formValue.periodo.length != 0){ valoresValuesArray.push(`periodo=${formValue.periodo}`) }
    
      if(valoresValuesArray.length != 0){
        valoresValue = '?'
        for(let i in valoresValuesArray){
            if(i != 0){
                valoresValue += '&'
            }
            valoresValue += valoresValuesArray[i]
        }
      }
      history.push(`listaProyectos${valoresValue}`)
    };

    if(periodosAcademicos.loading || !periodosAcademicos.result ){
      return "loading..."
    }
    const PeriodosAcademicos = periodosAcademicos.result;

    console.log(PeriodosAcademicos);
    

    return (
        <Form onSubmit={handleSubmit} onChange={onChange}>
            <InputGroup className="mb-3">
                <FormControl
                placeholder="Busqueda: Nombres, Apellidos, Codigos, Nombre de trabajos"
                aria-label="Busqueda: Nombres, Apellidos, Codigos, Nombre de trabajos"
                aria-describedby="basic-addon2"
                name='search'
                />
                <InputGroup.Append>
                <Button variant="outline-secondary" type="submit">Buscar</Button>
                </InputGroup.Append>
            </InputGroup>
            <Form.Row>
                <Form.Group as={Col} md="4"> 
                    <Form.Control as="select" name="state"> 
                        <option value=''>--Elegir estado--</option>
                        <option value='PENDIENTE'>Pendiente</option>
                        <option value='ACEPTADO'>Aceptado</option>
                        <option value='SUSPENDIDO'>Suspendido</option>
                        <option value='OBSERVADO'>Observado</option>
                        <option value='ENTREGADO'>Entregado</option>
                        <option value='SUSTENTADO'>Sustentado</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group as={Col} md="4"> 
                    <Form.Control as="select" name="type"> 
                        <option value=''>--Elegir tipo de proyecto--</option>
                        <option value="TI">Trabajo de investigacion</option>
                        <option value="TESIS">Tesis de grado</option>
                        <option value="TSP">Trabajo de suficiencia profesional</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group as={Col} md="4"> 
                    <Form.Control as="select" name="periodo"> 
                        <option value=''>--Elegir periodo academico--</option>
                        {PeriodosAcademicos.map((periodo) => {
                            return <option key={periodo.id} value={periodo.name}>{periodo.name}</option>
                        })}
                    </Form.Control>
                </Form.Group>
            </Form.Row>
        </Form>
    );
}



