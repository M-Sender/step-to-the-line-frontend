import React from "react";
import './components_CSS/MainPage.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import speechBubble from './images/pixel-speech-bubble.gif';
function MainPage() {
  return (
    <div className="mainpage content-Container">
            <Row className='welcomeBar odd'>
            <Col>
            <img src={speechBubble} alt='speechBubble'/>
            </Col>
            </Row>
            <Row className="even">
              <Col>
            <p>
              <b>Our Mission</b>: <b>With Step to the Line</b>, You can easily facilitate communication between people to drive them into the conversation of privilege. A touchy subject for many, providing direct numbers and a statistical approach allows the communication to flow and people share experiences more easily. We ask questions based on your situation when growing up, so there are direct points of conversion away from the numbers that people can talk about more casually, while still learning about their own position in comparison with others.
            </p>
            </Col>
            
            </Row>
            <Row className="odd">
              <Col>
            <p>
                  With <b>Step to the Line</b>, You can easily facilitate communication between people to drive them into the conversation of privilege. A touchy subject for many, providing direct numbers and a statistical approach allows the communication to flow and people share experiences more easily. We ask questions based on your situation when growing up, so there are direct points of conversion away from the numbers that people can talk about more casually, while still learning about their own position in comparison with others.
            </p>
            </Col>
            </Row>
        </div>
  );
}

export default MainPage;