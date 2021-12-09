import './App.css';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import { Container } from 'reactstrap';
import Home from './components/home/home';
import PirataAdmin from './components/piratas/admin';
import LoginForm from "./components/login/login";
import RegisterForm from "./components/register/form";


function App() {
  return (
     <Container>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginForm />}/>
          <Route path="/register" element={<RegisterForm />}/>
          <Route path="/piratas/*" element={<PirataAdmin />} />
        </Routes>
      </BrowserRouter>
    </Container>
  );
}

export default App;
