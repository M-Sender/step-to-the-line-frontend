import React from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './components_CSS/Footbar.css';

function Footbar() {
  return (
    <div className="footbar">
      <Row>
          <Col>
          <h1>Step to the Line</h1>
           </Col>
          <Col>
          <Row><p>Useful Links:</p></Row>
          <Row><p>Census data</p></Row>
          <Row><p>atlas</p></Row>
          <Row><p>something else</p></Row>
           </Col>
        </Row>
    </div>
  );
}

export default Footbar;