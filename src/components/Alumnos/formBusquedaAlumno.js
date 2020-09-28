import React, {useState} from 'react';
import {InputGroup, FormControl, Button, Form, Col} from 'react-bootstrap';
import {useHistory} from 'react-router-dom'

export default function FormBusquedaAlumno() {
    const history = useHistory();
    const [formValue, setFormValue] = useState({
        search: '',
        grade: ''
    });
    
    const onChange = async e => {
      setFormValue({
          ...formValue,
          [e.target.name]: e.target.value,
      })
    }

    const handleSubmit = async event => {
      event.preventDefault();
      let valoresValue = ''
      const valoresValuesArray = []
      if(formValue.search.length != 0){ valoresValuesArray.push(`search=${formValue.search}`) }
      if(formValue.grade.length != 0){ valoresValuesArray.push(`grade=${formValue.grade}`) }
    
      if(valoresValuesArray.length != 0){
        valoresValue = '?'
        for(let i in valoresValuesArray){
            if(i != 0){
                valoresValue += '&'
            }
            valoresValue += valoresValuesArray[i]
        }
      }
      history.push(`alumnos${valoresValue}`)
    };

    return (
        <Form onSubmit={handleSubmit} onChange={onChange}>
            <InputGroup className="mb-3">
                <FormControl
                placeholder="Busqueda: Nombres, Apellidos, Codigos"
                aria-label="Busqueda: Nombres, Apellidos, Codigos"
                aria-describedby="basic-addon2"
                name='search'
                />
                <InputGroup.Append>
                <Button variant="outline-secondary" type="submit">Buscar</Button>
                </InputGroup.Append>
            </InputGroup>
            <Form.Row>
                <Form.Group as={Col} md="4"> 
                    <Form.Control as="select" name="grade"> 
                        <option value=''>--Elegir grado academico--</option>
                        <option value='PREGRADO'>Pregrado</option>
                        <option value='POSGRADO'>Posgrado</option>
                    </Form.Control>
                </Form.Group>
                
            </Form.Row>
        </Form>
    );
}



