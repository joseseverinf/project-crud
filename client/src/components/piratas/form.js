import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container, Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import Swal from "sweetalert2";
import axios from 'axios';


const initialState={
    nombre: '',
    tesoro: 0,
    frase: '',
    rango: '',
    pata: false,
    parche: false,
    garfio: false
}

const PirataForm = (props) => {

    const navigate = useNavigate();
    const [inputs, setInputs] = useState(initialState);
    const { id } = useParams();

    useEffect(() => {
        if(id) {
            axios.get(`/api/piratas/${id}`)
            .then(resp => setInputs(resp.data.data))
            .catch(error => Swal.fire('Error', 'Error al obtener el pirata, inténtelo mas tarde', 'error'));
        }
    }, [id]);

    const inputsUpdate = (e) => {
        const {name, value} = e.target;
        setInputs({
            ...inputs,
            [name]: value
        })
    }

    const volver = e => {
        e.stopPropagation();
        navigate('../')
    }

    const save = e => {
        e.preventDefault();
        const data = {...inputs};
        data._id = id;
        props.accion(data);
        Swal.fire('Guardado', 'El pirata se ha guardado correctamente', 'success');

    }

    return <>
    <Container className="formularosos">
        <Row>
            <h1>{props.edicion?'Editando el Pirata: ' + inputs?.nombre: props.ver?'Visualizando el Pirata: ' + inputs?.nombre :'Creando un Pirata Nuevo'}</h1>
        </Row>
        <Row>
            <Form onSubmit={save}>
                <Row>
                    <Col md={6}>
                        <FormGroup>
                            <Label>Nombre del Pirata:</Label>
                            <Input type="text" minLength={3} required name="nombre" value={inputs.nombre} onChange={inputsUpdate} disabled={props.ver}/>
                        </FormGroup>
                        <FormGroup>
                            <Label>Cantidad de Tesoros:</Label>
                            <Input type="number" min={0} max={120} required name="tesoro" value={inputs.tesoro} onChange={inputsUpdate} disabled={props.ver}/>
                        </FormGroup>
                        <FormGroup>
                            <Label>Frase Típica</Label>
                            <Input type="text" minLength={3} required name="frase" value={inputs.frase} onChange={inputsUpdate} disabled={props.ver}/>
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label>Rango del Pirata:</Label>
                            <Input type="select" name="rango" value={inputs.rango} onChange={inputsUpdate} disabled={props.ver}>
                                <option value="">Seleccione un rango</option>
                                <option value="capitan">Capitán</option>
                                <option value="teniente">Teniente</option>
                                <option value="sargento">Sargento</option>
                                <option value="pirata">Pirata</option>
                                <option value="guardiamarina">Guardiamarina</option>
                                <option value="marinero">Marinero</option>
                                <option value="cocinero">Cocinero</option>
                                <option value="mecanico">Mecanico</option>
                                
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Input type="checkbox" name="pata" value={inputs.pata}  disabled={props.ver}/>
                            <Label>Pata de Palo</Label>
                        </FormGroup>
                        <FormGroup>
                            <Input type="checkbox" name="parche" value={inputs.parche}  disabled={props.ver}/>
                            <Label>Parche de Ojo</Label>
                        </FormGroup>
                        <FormGroup>
                            <Input type="checkbox" name="garfio" value={inputs.garfio}  disabled={props.ver}/>
                            <Label>Garfio</Label>
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {props.accion && <Button color="success" type="submit">Guardar</Button>}
                        <Button type="button" color="primary" onClick={volver} style={{marginLeft:'20px'}}>Crew Board</Button>
                    </Col>
                </Row>
            </Form>
        </Row>
    </Container>
    </>
}

export default PirataForm;