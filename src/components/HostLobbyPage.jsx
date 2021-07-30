import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import loadingWheel from './loadingWheel.gif';
import config from '../config.js';

import './components_CSS/HostLobbyPage.css'
import Cookies from 'universal-cookie';
const cookies = new Cookies();
var QRCode = require('qrcode');
//var fs = require('fs');


const ENDPOINT = `${config.npmClient.siteName}`;
var connectionOptions =  {
  "force new connection" : false,
  "reconnectionAttempts": "Infinity", //"Infinity" 
  "timeout" : 10000,                  
  "transports" : ["websocket" ]
};


function HostMainPage() {
    //get random or something to name sessionID
    const socket = socketIOClient(ENDPOINT,connectionOptions);
    const [qrcode, setqrcode] = useState("Generating QR Code...");
    const [numPartic, setnumPartic] = useState(0);
    const [sessionID, setsessionID] = useState("Generating room id");
    var questionSettings = cookies.get('quesSettings');


    useEffect(()=> {
    socket.once('connect', function(){
        socket.emit("host-create-session",questionSettings);
        socket.once('send-session-id', function(data) {//have spinny then change upon reception
          setsessionID(data.sessionID);
          cookies.set('sessionID',data.sessionID,{ path : '/' });
          cookies.set('token',data.token ,{ path : '/' });
          var userJoinqr = `http://${config.npmClient.siteName}:3000/userinfo/?${data.sessionID}`;
          QRCode.toDataURL(userJoinqr, function (err, url) {
          if(err) return console.log("error occured");
           console.log(userJoinqr);
            setqrcode(url);
          });
          document.getElementById('beginSession').style.display = 'block';
        });
    });
  },[]);
        //_______________
    
    socket.on('update-participants',function(data){
          setnumPartic(data);
        });

  return ( 
    <div className="HostMainPage content-Container">
      <Row>
        <Col><center><img src={qrcode} alt={loadingWheel}/></center>
        </Col>
        <Col><p >There are {numPartic} currently connected to {sessionID}.</p></Col>
        </Row>
      <Row>
      <a id="linkTemp" style={{'grid-column':2}} href={`http://localhost:3000/userinfo/?${sessionID}`}>link</a>
      <Col><center><Link id='beginSession' to={`/hostinsession/`} className="btn">Begin</Link></center></Col>
        </Row>
      </div>

  );
}

export default HostMainPage;
