import React from 'react';
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from '../assets/logoo.png';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import '../components/Navbar.css';
import NavDropdown from 'react-bootstrap/NavDropdown';

function BasicExample() {
    const navigate = useNavigate(); 
    
    const handleNavigate = (path) => {
        navigate(path); // Dynamically navigate to the passed path
    };

    return (
        <Navbar expand="lg">
            <Container>
                <Navbar.Brand href="#home">
                    <img src={Logo} alt="Logo" className="logo" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto gap-4">
                        <Link to={'/'} className="nav-link">Home</Link>
                        <Link to={'/products'} className="nav-link">Products</Link>
                        <Link to={'/admin'} className="nav-link">Admin</Link>
                       
                    </Nav>
                    {/* The buttons to navigate to sign up and login */}
                    <div className="nav-buttons">
                        <button 
                            className="btn nav-btn"
                            onClick={() => handleNavigate('/register')}>
                            Sign Up
                        </button>
                        <button 
                            className="btn nav-btn"
                            onClick={() => handleNavigate('/login')}>
                            Login
                        </button>
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default BasicExample;
