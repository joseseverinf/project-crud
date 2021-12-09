import { Container, Table, Button } from "reactstrap";
import { RiSearchEyeLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import '../../App.css';

const PirataList = (props) => {

    const eliminar = (e, id) => {
        e.stopPropagation();
        if(id) {
            props.eliminar(id);
        }
    }

    return (
    <Container>
        <Table hover>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Tesoro</th>
                    <th>Frase</th>
                    <th>Rango</th>
                    <th>Pata de Palo</th>
                    <th>Parche de Ojo</th>
                    <th>Garfio</th>
                    <th>Acciones</th>

                </tr>
            </thead>
            <tbody>
                {props.piratas && props.piratas.map((pirata, i) => <tr key={i}>
                    <td>{pirata.nombre}</td>
                    <td>{pirata.tesoro}</td>
                    <td>{pirata.frase}</td>
                    <td>{pirata.rango}</td>
                    <td>{pirata.pata}</td>
                    <td>{pirata.parche}</td>
                    <td>{pirata.garfio}</td>
                    <td>
                    <Link to={`/piratas/view/${pirata._id}`}><RiSearchEyeLine color="green" style={{ marginRight: '10px'}}/></Link>

                        <Button type="button" color="danger" onClick={e => eliminar(e, pirata._id)} style={{marginLeft:'20px'}}>Ejecutar Pirata</Button>
                    </td>
                </tr>)}
            </tbody>
        </Table>
    </Container>
    )
}

export default PirataList;