import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';

import './NavMenu.css'

const NavMenu = ({page, setPage, setSubmit, setViewlog}) => {

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
        <Navbar collapseOnSelect expand="sm">
          <Container>
            <Navbar.Toggle aria-controls='resonsive-navbar-nav'/>
            <Navbar.Collapse id="resonsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link className="f5" onClick={() => setPage('home')}>Home</Nav.Link>
                <Nav.Link className="f5" onClick={() => setPage('links')}>Useful Links</Nav.Link>
                <Nav.Link className="f5" onClick={goNightlog}>Nightlogs</Nav.Link>
                <Nav.Link className="f5" onClick={goSubmit}>Submit New Nightlog</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    )
  }else{
    return(
      <div className="navContainer">
      <Navbar collapseOnSelect defaultExpanded expand="sm">
        <Container>
          <Navbar.Toggle aria-controls='resonsive-navbar-nav'/>
          <Navbar.Collapse id="resonsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link className="f5" onClick={() => setPage('home')}>Home</Nav.Link>
                <Nav.Link className="f5" onClick={() => setPage('links')}>Useful Links</Nav.Link>
                <Nav.Link className="f5" onClick={goNightlog}>Nightlogs</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    )
  }
}

export default NavMenu
