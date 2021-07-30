import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import Cookies from 'universal-cookie';
import "./components_CSS/JoinSession.css"
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import config from '../config.js';

const ENDPOINT = `${config.npmClient.siteName}`;
var connectionOptions =  {
  "force new connection" : false,
  "reconnectionAttempts": "Infinity", //"Infinity" 
  "timeout" : 10000,                  
  "transports" : ["websocket" ]
};

function JoinSession() {
    //get random or something to name sessionID
    const socket = socketIOClient(ENDPOINT,connectionOptions);
    /*useEffect(()=> {
    socket.once('connect', function(){
      
    });
  },[]);*/
  function checkChar(){
    var sessionID = document.getElementById('sessionID').value;
    if(sessionID.length===6){
        document.getElementById('joinButton').classList.add('buttonShow');
    }
    else{
        document.getElementById('joinButton').classList.remove('buttonShow');
    }
}
  function verifySession(){
      var sessionID = document.getElementById('sessionID').value;
      socket.emit('checkSessionID',sessionID);
  }
  socket.on('checkBad', function(){
      alert('Incorrect Session ID. Please try again');
  });
  socket.on('checkGood', function(data){
    setTimeout(() => {
      window.location.href = `/userinfo/?${data}`;
    }, 200);

});
  
  return ( 
    <div className="JoinSession">
        <Row>
            <Col><center>Please enter the given session ID below:</center></Col>
            </Row>
      <Row>
          <Col>
          <center>
            <form>
                <input type="text" id="sessionID" name="sessionID" onChange={checkChar} />
            </form>
        </center> 
          </Col>
          </Row>
        <Row>
            <button id='joinButton' onClick={verifySession}>Click to join Session!</button>
            </Row>
    </div>

  ); //end jsx
}

export default JoinSession;

