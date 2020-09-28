import React, {useState} from 'react';
import {InputGroup, FormControl, Button, Form, Col} from 'react-bootstrap';
import {useHistory} from 'react-router-dom'

export default function FormBusquedaProfesor() {
    const history = useHistory();
    const [formValue, setFormValue] = useState({
        search: ''
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
      if(formValue.search.length!=0){
          valoresValue = `?search=${formValue.search}`
      }
    //   const valoresValuesArray = []
    //   if(formValue.search.length != 0){ valoresValuesArray.push(`search=${formValue.search}`) }
    //   if(formValue.grade.length != 0){ valoresValuesArray.push(`grade=${formValue.grade}`) }
    
    //   if(valoresValuesArray.length != 0){
    //     valoresValue = '?'
    //     for(let i in valoresValuesArray){
    //         if(i != 0){
    //             valoresValue += '&'
    //         }
    //         valoresValue += valoresValuesArray[i]
    //     }
    //   }
      history.push(`profesores${valoresValue}`)
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
        </Form>
    );
}



