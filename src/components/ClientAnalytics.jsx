import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import Cookies from 'universal-cookie';
import "./components_CSS/ClientAnalytics.css"
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
const cookies = new Cookies();
var sessionID = cookies.get('sessionID');
var userName = cookies.get('userName');

function ClientAnalytics() {
    //get random or something to name sessionID
    const socket = socketIOClient(ENDPOINT,connectionOptions);
    const [userScore,setuserScore] = useState('Loading...');
    const [userQuart,setuserQuart] = useState('Generating...');
    const [zipAvg,setzipAvg] = useState('Loading...');
    const [zipPercentileAvg,setzipPercentileAvg] = useState('Loading...');
    const [zipPercentileDiff,setzipPercentileDiff] = useState('Loading...');

    useEffect(()=> {

    socket.once('connect', function(){
      socket.emit('user_analytics',({sessionID:sessionID,userName:userName}));
    });
  },[]);
  socket.on('user_grab_analytics',function(data){
      setuserScore(data.userScore);
      setuserQuart(100*data.userQuart);
      setzipAvg(Math.ceil((data.dataOBJ.zipAvgs[data.zipID])));
     setzipPercentileAvg(Math.ceil(100*(data.dataOBJ.zipPercentileAvg[data.zipID])));
      setzipPercentileDiff(Math.ceil(100*(data.dataOBJ.zipPercentDiff[data.zipID])));
  });
  return ( 
    <div className="ClientAnalytics content-Container">
            <h1>Your Session:</h1>
      <Row className='even'>
      <Col><p>Your score: {userScore}</p>
          <p>Your percentile of the session: {userQuart}%</p></Col>
    </Row>
    <h1>Your Area:</h1>
    <Row className='even'>
    <Col><p>How you compare with other in your zipcode: {zipAvg} is the average score for your zipcode.</p></Col>
    <Col><p>The average percentile you area ranks in is {zipPercentileAvg}%.</p></Col>
    <Col><p>The average percent difference of people in your area compared with their sessions is {zipPercentileDiff}%.</p></Col>
      </Row>
      <h1>What this means:</h1>
    <Row className='even'>
      <Col>
      <p>If your particular zipcode has a lower percentile average and negative percent difference, it means that despite people from your zipcode being less privleged than many others, it still provided enough oppurtinities to the point where you are able to be in the same place as many of your more privleged peers.</p>
      </Col></Row>
    </div>

  ); //end jsx
}

export default ClientAnalytics;

