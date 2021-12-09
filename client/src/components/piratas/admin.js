import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import { GiPirateSkull } from "react-icons/gi";
import { Container, Col, Row, Button } from "reactstrap";
import axios from 'axios';
import Swal from "sweetalert2";
import PirataForm from "./form";
import PirataList from './list';

const PirataAdmin = (props) => {
    const [piratas, setPiratas] = useState([]);
    const [actualizar, setActualizar] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        axios.get('/api/piratas')
        .then(resp => setPiratas(resp.data.data))
        .catch(error =>
            Swal.fire('Error', error.message, 'error'));
    }, [actualizar]);


    const create = (data) => {
        axios.post('/api/piratas', data)
        .then(resp => {
            setPiratas([
                ...piratas,
                resp.data.data
            ]);
            navigate('./')
        }).catch(error => {
            console.log(error);
            Swal.fire('Error al crear el pirata', error?.message, 'error')
        });
    }

    const update = (data) => {
        axios.put(`/api/piratas/${data._id}`, data)
            .then(resp => {
                setActualizar(!actualizar)
                navigate('./');
            })
            .catch(error => Swal.fire('Error al actualizar el pirata', error?.message, 'error'));
    }

    const eliminar = (id) => {
        if(id) {
            Swal.fire({
                title:'Eliminar el piratas',
                text: '¿Esta seguro que desea eliminar el piratas',
                icon:'question',
                showCancelButton: true,
                confirmButtonText: 'Si, eliminar!!!',
                cancelButtonText: 'No'
            }).then(resp => {
                if(resp.isConfirmed){
                    axios.delete(`/api/piratas/${id}`)
                    .then(resp => {
                        const lista = [...piratas];
                        lista.splice(lista.findIndex(e => e._id === id), 1);
                        setPiratas(lista);
                    }).catch(error => Swal.fire('Error al eliminar el pirata', error?.message, 'error'));
                }
            })
        }
    }

    const goCreate = (e) => {
        e?.stopPropagation();
        navigate('/piratas/create');
    }

    return <>
    <Container className="estiloso">
        <Row className="estiloso-h1">
            <Col xs={12} md={12}>
                <h1>Pirate Crew</h1>
                <Link to="/"><GiPirateSkull color="black" /></Link>
                <Button color="primary" type="button" onClick={goCreate} style={{float:'right'}}>Agregar Nuevo</Button>
            </Col>
        </Row>
        <Row>
            <Routes>
                <Route path="/" element={ <PirataList piratas={piratas} eliminar={eliminar}/> } />
                <Route path="create" element={ <PirataForm accion={create}/> } />
                <Route path="update/:id" element={ <PirataForm accion={update} edicion={true}/> } />
                <Route path="view/:id" element={ <PirataForm ver={true}/> } />
            </Routes>
        </Row>
    </Container>
    </>
}

export default PirataAdmin;