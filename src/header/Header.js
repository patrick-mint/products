import React from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import '../App.css'

const Header = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/" style={{ color: 'gold' }}>
          Product Admin Page
        </Navbar.Brand>
        <hr />
        <Nav style={{ maxHeight: '100px' }} navbarScroll className="navbar-nav">
          <Nav.Link href="/" className="nav-link">Home</Nav.Link>
          <Nav.Link href="/product" className="nav-link">Product</Nav.Link>
          <Button variant="outline-info" className="button-right">Profile</Button>
          <Button variant="outline-info" className='button-left'>Logout</Button>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
