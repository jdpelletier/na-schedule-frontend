import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';

import './NavMenu.css'

const NavMenu = ({page, setPage, setViewlog, setLogtoview}) => {
  const goNightlogs = () => {
    if(page==="nightlogs"){
      setViewlog(false)
      setLogtoview({})
    }else{
      setPage("nightlogs")
    }
  }

  const goSubmit = () => {
    if(page==="nightlogs"){
      setLogtoview({})
    }
    setPage('submitnightlog')
  }

  return(
    <div className="navContainer">
      <Navbar collapseOnSelect expand="sm">
          <Navbar.Toggle aria-controls='resonsive-navbar-nav'/>
          <Navbar.Collapse id="resonsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Button} className="navbutton f5 b--black bg-light-silver hover-near-black" onClick={() => setPage('home')}>Home</Nav.Link>
              <Nav.Link as={Button} className="navbutton f5 b--black bg-light-silver" onClick={() => setPage('links')}>Useful Links</Nav.Link>
              <Nav.Link as={Button} className="navbutton f5 b--black bg-light-silver" onClick={goNightlogs}>Nightlogs</Nav.Link>
              <Nav.Link as={Button} className="navbutton f5 b--black bg-light-silver" onClick={goSubmit}>Submit New Nightlog</Nav.Link>
            </Nav>
          </Navbar.Collapse>
      </Navbar>
    </div>
  )
}

export default NavMenu
