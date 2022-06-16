import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';

import './NavMenu.css'

const NavMenu = ({page, setPage, setSubmit, setViewlog}) => {

  const goHome = () => {
    setPage('home')
  }

  const goTraining = () => {
    setPage('training')
  }

  const goNightlog = () => {
    if(page === "nightlog"){
      setViewlog(false)
      setSubmit(false)
    }else{
      setPage("nightlog")
    }
  }

  const goSubmit = () => {
    setViewlog(false)
    setSubmit(true)
  }

  if(page === "nightlog"){
    return(
      <div className="navContainer">
        <Navbar expand="lg">
          <Container>
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link onClick={goHome}>Home</Nav.Link>
                <Nav.Link onClick={goTraining}>Training Documents</Nav.Link>
                <Nav.Link onClick={goNightlog}>Nightlogs</Nav.Link>
                <Nav.Link onClick={goSubmit}>Submit New Nightlog</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    )
  }else{
    return(
      <div className="navContainer">
        <Navbar expand="lg">
          <Container>
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link onClick={goHome}>Home</Nav.Link>
                <Nav.Link onClick={goTraining}>Training Documents</Nav.Link>
                <Nav.Link onClick={goNightlog}>Nightlogs</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    )
  }
}

export default NavMenu
