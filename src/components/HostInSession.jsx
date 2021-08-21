import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import Cookies from 'universal-cookie';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './components_CSS/HostInSession.css';
import config from '../config.js';
const cookies = new Cookies();


const ENDPOINT = `${config.npmClient.backendRoute}`;
var connectionOptions =  {
  "force new connection" : false,
  "reconnectionAttempts": "Infinity", //"Infinity" 
  "timeout" : 10000,                  
  "transports" : ["websocket" ]
};

    

function HostInSession() {
    //get random or something to name sessionID
    const socket = socketIOClient(ENDPOINT,connectionOptions);
    const [numPartic, setnumPartic] = useState(0);
    const [question,setquestion] = useState('Loading...');// add question
    var sessionID = cookies.get('sessionID');


    useEffect(()=> {
    socket.once('connect', function(){
      socket.emit("host-rejoin",sessionID);
      socket.emit('question_start',(sessionID));
      //need to possibly change function until verification of room
    });
  },[]);
        //_______________
    socket.on('session-DNE',function(){
      setquestion('Session Does not exist.');
      //make other page elements dissapear.


    })
    socket.on('update-answered',function(data){ //when users answer, this is updated
          setnumPartic(data);
        });
    socket.on('recieve_question',(data)=>{ //when host asks for a new question
      setquestion(data);
    });
    function getQues(sessionID){
      socket.emit('question_update',sessionID);
    }
    socket.on('host-transfer-analytics',function(){
      setquestion("transfering to new page.");
      window.location.href = `/hostAnalytics/`;
      //redirect host to new page /hostanalytics/?sessionID
      //upon redirection, have new page emit that is is ready to receive data, which has been proccessing user analytics class

    });
  return ( 
    <div className="HostInSession">
      <Row>
        <Col>
        <p id="textBox">{question}</p></Col>
      </Row>
      <Row>
        <Col>
      <p> {numPartic} answers in.</p></Col>
      </Row>
      <Row className='botRow'>
        <Col>
        <button className="btn" onClick={() => getQues(sessionID)}>Continue</button>
     </Col>
     </Row>
    </div>

  ); //end jsx
}

export default HostInSession;
