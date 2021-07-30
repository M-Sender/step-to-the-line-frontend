import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import Cookies from 'universal-cookie';
import BarChart from 'barchart';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './components_CSS/HostAnalytics.css';
import config from '../config.js';

const cookies = new Cookies();


const ENDPOINT = `${config.npmClient.siteName}`;
var connectionOptions =  {
  "force new connection" : true,
  "reconnectionAttempts": "Infinity", 
  "timeout" : 10000,                  
  "transports" : ["websocket"]
};
var sessionID = cookies.get('sessionID');


function HostAnalytics() {
    //get random or something to name sessionID
    const socket = socketIOClient(ENDPOINT,connectionOptions);
    const [quartile25, setquartile25] = useState('Loading...');
    const [quartile50, setquartile50] = useState('Loading...');
    const [quartile75, setquartile75] = useState('Loading...');
    const [quartile100, setquartile100] = useState('Loading...');
    const [sessionAvg, setsessionAvg] = useState('Loading...');
    const [sessionStd, setsessionStd] = useState('Loading...');

    useEffect(()=> {
    socket.once('connect', function(){
      socket.emit("host-rejoin",sessionID);
      socket.emit('grab_analytics',(sessionID));
    });
  },[]);
      socket.on('send_analytics',function(data){
        var bc = new BarChart({
          barColors: ['#45A29E'], //same color as btns
          labelInsideColors: ['Black'],
          autoScale: true,
          minimum: -15, //need to find this as well
          maximum: 15, //need to find this
          container: document.getElementById('chart-container')
        });
        bc.data(data.graph_data);
        //have initial loading wheel dissapear and bargraph load in.
        setquartile25(data.quartiles[0]);
        setquartile50(data.quartiles[1]);
        setquartile75(data.quartiles[2]);
        setquartile100(data.quartiles[3]);
        setsessionAvg(data.avg);
        setsessionStd(data.std);
  });

  function endSession(){
    socket.emit('delete-sessionID',(sessionID));
    setTimeout(() => {
      window.location.href = '/';
    }, 500);
  }
  return ( 
    <div className="HostAnalytics content-Container">
      <Row className='barchartRow'>
        <div id='chart-container'></div>
       </Row>
        <Row className='even'>
          <Col>
            <Row>
              <p>The 25th Percentile:</p>
             </Row>
            <Row>
              <p>{quartile25}</p>
             </Row>
      </Col>
      <Col>
      <Row><p>The 50th Percentile:</p></Row><Row><p>{quartile50}</p></Row>
      </Col>
      <Col>
      <Row><p>The 75th Percentile:</p></Row><Row><p>{quartile75}</p></Row>
      </Col>
      <Col>
      <Row><p>The 100th Percentile:</p></Row><Row><p>{quartile100}</p></Row>
      </Col>
      </Row>

      <Row>
      <p>Session Average:    {sessionAvg}</p></Row>
      <Row><p>Session Standard Deviation:    {sessionStd}</p></Row>
      <center><button onClick={endSession}> close session </button></center>
    </div>

  ); //end jsx
}

export default HostAnalytics;