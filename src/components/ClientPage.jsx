import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import './components_CSS/ClientPage.css';
import getUserLocale from 'get-user-locale';
import Cookies from 'universal-cookie';
import loadingWheel from './loadingWheel.gif';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import config from '../config.js';
//var translate = require('translate-google');
const translate = require('translate');
//fix translate

const userLocale = getUserLocale();
const cookies = new Cookies();



const ENDPOINT = `${config.npmClient.siteName}`;
var connectionOptions =  {
  "force new connection" : true,
  "reconnectionAttempts": "Infinity", 
  "timeout" : 10000,                  
  "transports" : ["websocket"]
};

var sessionID = cookies.get('sessionID');
var userName = cookies.get('userName');
function ClientPage() {
  //------S E R V E R _ U S E --------------//
  const [response, setresponse] = useState("Waiting for Host...");
  const socket = socketIOClient(ENDPOINT,connectionOptions);


  useEffect(() => {
    socket.once('connect',function(){
      socket.emit('user-join-session',{sessionID:sessionID,userID:userName});
      socket.on('question-update',question => {
      setresponse(question);
    });
    });
  },[]);
  async function translateFunc(text,useLang){
    var userques = await translate(text, { to: useLang });
    setresponse(userques.toString());
  }
  socket.on('recieve_question',(data)=>{
    if(data==='Waiting for host...'){
      translateFunc(data,useLang);
    }
    else if(data==="OVER"){
      setresponse("End of session. Thank you for participating!");
    document.getElementById('inputContain').style.display = 'none';
    setTimeout(() => {
      window.location.href = '/userResults/';
    }, 1000);
    }
    else{
    document.getElementById('yesBut').style.display = 'inline';
    document.getElementById('noBut').style.display = 'inline';
    var useLang = (userLocale.toString().split('-'))[0];
    document.getElementById('wheelLoad').style.display = 'none';
    translateFunc(data,useLang);}
    
  });
  //------ Page JS USE ------//
  function sendAns(sessID,ans,userN) {
    socket.emit('user-answer',{sessionID:sessID,answer:ans,userName:userN});
    setresponse("Submitted. Waiting for Host...");
    document.getElementById('yesBut').style.display = 'none';
    document.getElementById('noBut').style.display = 'none';
    document.getElementById('wheelLoad').style.display = 'inline';

  }
  socket.on('end-user',function(){
    setresponse("End of session. Thank you for participating!");
    document.getElementById('inputContain').style.display = 'none';
    setTimeout(() => {
      window.location.href = '/userResults/';
    }, 1000);
    //close out connection// optionally create boolean in liveSession for joinable or not, but unnesccary
  });

  //have display page always on, reset on host next => css => appear on first load. use cs in index, show question-->
  return (
    <div className="ClientPage content-Container">
      <Row>
        <Col><p>{response}</p>
            <center><img id='wheelLoad' src={loadingWheel} alt='Loading Circle'/></center></Col>
        </Row>
      <center><Row id="inputContain" className="inputContainer">
        <Col><button id='yesBut' className="" onClick={() => sendAns(sessionID,'Y',userName)}> Yes </button>
          </Col>
        <Col>
        <button id="noBut" className="" onClick={() => sendAns(sessionID,'N',userName)}> No </button>
          </Col>
      </Row></center>

    </div>




    /*<div className="ClientPage">
    <div className="userQuestionContainer">
<p className="responseText">{response}</p>
<center><img className='loadingWheel' id='wheelLoad' src={loadingWheel} alt='Loading Circle'/></center>
        </div>
      <div id="inputContain" className="userInputContainer">
        <center><button id='yesBut' className="btn btn-primary userAnsBut" onClick={() => sendAns(sessionID,'Y',userName)}> Yes </button>
        <button id="noBut" className="btn btn-primary userAnsBut" onClick={() => sendAns(sessionID,'N',userName)}> No </button></center>
      </div>

    </div>*/
  );
}

export default ClientPage;
