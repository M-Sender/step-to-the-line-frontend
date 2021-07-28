import React from "react";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import './components_CSS/TopBar.css';

function TopBar() {
  return (
    <div className="topbar">
      <Navbar expand="lg" className='topBar'>
  <Navbar.Brand style={{color: "white"}}>Step to the Line</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" className="toggleBut"/>
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto" style={{color: "white"}}>
      <Nav.Link href="/" style={{color: "white"}}>Main Page</Nav.Link>
      <Nav.Link href="/createSession" style={{color: "white"}}>Create Session</Nav.Link>
      <Nav.Link href="/entersession/" style={{color: "white"}}>Join Session</Nav.Link>
    </Nav>
  </Navbar.Collapse>
</Navbar>
    </div>
  );
}

export default TopBar;