import { Container, Row, Col } from 'reactstrap';
import LoginForm from '../login/login';
import RegisterForm from '../register/form';

const Home = (props) => {

    return (
        <>
        <Container className="estiloso">
            <Row className="estiloso-h1">
                <h1>Bienvenidos a la Tripulación de Piratas</h1>
            <Col xs={6}>
                <RegisterForm />
            </Col>
            <Col xs={6}>
                <LoginForm />
            </Col>
            </Row>
        </Container>
        </>
    );
}

export default Home;
