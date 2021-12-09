import { useState } from "react";
import { Button, Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { useNavigate } from 'react-router-dom'
import axios from "axios";
import Swal from "sweetalert2";
import './Registerstyle.css';


const initialState = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
}
const RegisterForm = (props) => {

    const [inputs, setInputs] = useState(initialState);
    const navigate = useNavigate();
    const formUpdate = (e) => {
        const { name, value } = e.target;
        setInputs({
            ...inputs,
            [name]: value
        });
    }
    const goHome = (e) => {
        e?.stopPropagation();
        navigate('/');
    }
    const formSubmit = (e) => {
        e.preventDefault();
        axios.post('/api/register', inputs)
            .then(resp => {
                if (resp.data.ok) {
                    Swal.fire('Registro de Usuarios', resp.data.message, 'success');
                    goHome();
                } else {
                    Swal.fire('Registro de Usuarios', resp.data.message, 'error');
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
    <Container className="register-form">
        <Row>
            <h4>Register</h4>
        </Row>
        <Form onSubmit={formSubmit}>
            <Row>
                <Col xs={12}>
                    <FormGroup>
                        <Label>Name:</Label>
                        <Input type="text" name="name" value={inputs.name} onChange={formUpdate} required maxLength={50} />
                    </FormGroup>

                    <FormGroup>
                        <Label>Email:</Label>
                        <Input type="email" name="email" value={inputs.email} onChange={formUpdate} required />
                    </FormGroup>

                    <FormGroup>
                        <Label>Password:</Label>
                        <Input type="password" name="password" value={inputs.password} onChange={formUpdate} required minLength={6} />
                    </FormGroup>

                    <FormGroup>
                        <Label>Confirm Password:</Label>
                        <Input type="password" name="confirmPassword" value={inputs.confirmPassword} onChange={formUpdate} required minLength={6} />
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col xs={6} md={3}>
                    <Button color="primary" type="submit">Registrar</Button>
                </Col>
                {/*<Col xs={6} md={3}>
                    <Button type="button" onClick={goHome}>Cancelar</Button>
                </Col>*/}
            </Row>
        </Form>
</Container>
    )
}


export default RegisterForm;