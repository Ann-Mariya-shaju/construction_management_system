import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <>
      <Navbar className="bg-primary">
        <Container className="d-flex justify-content-between align-items-center">
          <Navbar.Brand href="#" className="d-flex align-items-center">
            <img
              alt=""
              src="./src/assets/iconss.jpg"
              width="25"
              height="25"
              className="d-inline-block align-top me-3"
            />
            <span style={{ color: 'white', fontWeight: 'bold' }}>SJS CONSTRUCTION</span>
          </Navbar.Brand>

          <ul className="d-flex list-unstyled mb-0 gap-4">
            <li><Link to="/" className="text-white text-decoration-none">HOME</Link></li>
            <li><Link to="/services" className="text-white text-decoration-none">SERVICES</Link></li>
            <li><Link to="/contact" className="text-white text-decoration-none">CONTACT</Link></li>
          </ul>

          <Link to="/login" className="btn btn-warning">
            LOGIN/REGISTER <i className="fa-solid fa-right-to-bracket ms-2"></i>
          </Link>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
