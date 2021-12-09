import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Button, Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";
import Swal from "sweetalert2";

const initialState = {
    username: '',
    password: ''
}

const LoginForm = (props) => {

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
        navigate('/piratas');
    }

    const formSubmit = (e) => {
        e.preventDefault();
        axios.post('/api/login', inputs)
            .then(resp => {
                if (resp.data.ok) {
                    Swal.fire('Login', resp.data.message, 'success');
                    goHome();
                } else {
                    Swal.fire('Login', resp.data.message, 'error');
                }
            })
            .catch(err => {
                console.log(err);

            })
    }

    return (
    <Container className="register-form">
        <Row>
            <h4>Login</h4>
        </Row>
        <Form onSubmit={formSubmit}>
            <Row>
                <Col xs={12}>
                    <FormGroup>
                        <Label>Username:</Label>
                        <Input type="text" name="username" value={inputs.username} onChange={formUpdate} required maxLength={50} />
                    </FormGroup>
                
                    <FormGroup>
                        <Label>Password:</Label>
                        <Input type="password" name="password" value={inputs.password} onChange={formUpdate} required minLength={6} />
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col xs={6} md={3}>
                    <Button color="primary" type="submit">Login</Button>
                </Col>
            </Row>
        </Form>
    </Container>
    )
}

export default LoginForm;