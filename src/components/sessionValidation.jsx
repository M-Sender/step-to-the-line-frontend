import Cookies from 'universal-cookie';
import socketIOClient from "socket.io-client";
import config from '../config.js';

const ENDPOINT = `${config.npmClient.siteName}`;
var connectionOptions =  {
  "force new connection" : true,
  "reconnectionAttempts": "Infinity", 
  "timeout" : 10000,                  
  "transports" : ["websocket"]
};

function sessionValidation(props) {
  var emitType = '';
    if(props.type==='cookies'){
      const cookies = new Cookies();
      var sessionID = cookies.get('sessionID');
      emitType = 'session';
    }
    else if(props.type==='urlIdent'){
      var givenURL = window.location.href;
      var holders = givenURL.split('?');
      var sessionID = holders[1];
      emitType = 'session';
  }
  else if(props.type === 'userSession'){
    const cookies = new Cookies();
    var sessionID = cookies.get('sessionID');
    var userName = cookies.get('userName');
    var emitType = 'instance';
  }
  else if(props.type === 'hostkey'){
    const cookies = new Cookies();
    var sessionID = cookies.get('sessionID');
    var hostKey = cookies.get('token');
    var emitType = 'hostkey';
  }
  const socket = socketIOClient(ENDPOINT,connectionOptions);
      socket.once('connect', function(){
        if(emitType==='session'){
        socket.emit("validate_sessionID",sessionID);}
        else if(emitType==='instance'){
          socket.emit('validate_Instance',{sessionID:sessionID,userName:userName});
        } 
        else if(emitType==='hostkey'){
          socket.emit("validate_sessionID",sessionID);
          socket.emit('validate_hostKey',hostKey);
        }   
      });
    socket.on('session_DNE', function(){
      window.location.href = '/pagenotfound';
    });
return(
null
);

}

export default sessionValidation;
