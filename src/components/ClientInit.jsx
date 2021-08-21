import Cookies from 'universal-cookie';
import React from "react";
import socketIOClient from "socket.io-client";

import './components_CSS/ClientInit.css'
import config from '../config.js';

const ENDPOINT = `${config.npmClient.backendRoute}`;
var connectionOptions =  {
  "force new connection" : true,
  "reconnectionAttempts": "Infinity", 
  "timeout" : 10000,                  
  "transports" : ["websocket"]
};
const cookies = new Cookies();
var givenURL = window.location.href;
var holders = givenURL.split('?');
var sessionID = holders[1];
var curText = 0;
const textArr = ['Lets Get Started','What is your Gender?','Please enter your home zipcode','Please enter the zipcode of where you were born','Please enter a nickname'];
const idArr = ['','genderInp','homeZipInp','bornZipInp','userNameInp'];
const valIdArr = ['','gender','zipcode','zipcodeBorn','username'];
var prevAct = 'rightToLeft';

function ClientInit() {
    //const [infiStop,setinfiStop] = useState(0);
    const socket = socketIOClient(ENDPOINT,connectionOptions);
    socket.once('connect', function(){
    });
    socket.on('user_validate',function([bool,userName]){
      if(bool){
        submitUserInf(userName);}
      else{
        alert('User name taken!');
      }
    });
    function isNumeric(str) {
      if (typeof str != "string") return false // we only process strings!  
      return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
             !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
    }



    function validateAns(valId){
      if(valId == 'zipcode' || valId === 'zipcodeBorn'){
        return (document.getElementById(valId).value.length===5 && isNumeric(document.getElementById(valId).value) )
      }
      else if(valId === 'gender'){
        return (!(document.getElementById(valId).value ===""))
      }
      else{
        return true
      }

    }
    function update(progression) {

      curText += progression;
      if(curText === 5){
        //check with server if username is open/ else say name is taken
        socket.emit('check-user',({userName:document.getElementById('username').value, sessionID:sessionID}));
        curText = 4;//need to fix this to detect final frame on 5, done by double if
      }
      else if(validateAns(valIdArr[curText-progression])){
        var action = 'rightToLeft';
        if(progression===1){
          action = 'rightToLeft';}
        else{
          action = 'leftToRight';
        }
      //update text label https://stackoverflow.com/questions/55227106/css-animation-text-sliding-left-to-right
      document.getElementById('textID').classList.toggle(prevAct);
      setTimeout(() => {
        document.getElementById('textID').innerHTML = textArr[curText];

        document.getElementById('textID').classList.toggle(action);
      }, 100);
      prevAct = action;
      var curId = idArr[curText];
      var prevId = idArr[curText-progression];


      //update input container
      document.getElementById(curId).style.display = 'inline';
      if(prevId!==''){
      document.getElementById(prevId).style.display = 'none';}
      //see if backbuttonAllow
      if(curText === 1 || curText===0){
        document.getElementById('backButton').style.visibility = "hidden";
      }
      else{
        document.getElementById('backButton').style.visibility = "visible";
      }
    }
    else{
      curText -=progression;
    }


    }
    function submitUserInf(userName){
      const socket = socketIOClient(ENDPOINT,connectionOptions);
      var genderVal = document.getElementById('gender').value;
      var zipcodeVal = document.getElementById('zipcode').value;  //check to see if valid zip(all nums and 5 len)
      var zipcodeBornVal = document.getElementById('zipcodeBorn').value;
      //var userNameVal = document.getElementById('username').value;
      socket.emit('submit-user-info',({'sessid':sessionID,'gender':genderVal,'zip':zipcodeVal,'zipborn':zipcodeBornVal,'userName':userName}));
      cookies.set('userName', userName , { path: '/' });
      cookies.set('sessionID', sessionID, { path: '/' });

      setTimeout(() => {
        window.location.href = `/userpage/`;

      }, 300);
    }
    socket.on('send-cookies',function(data){
      cookies.set('userName', data.userName , { path: '/' });
      setTimeout(() => {
        window.location.href = `/userpage/`;

      }, 300);

    });

  return ( 
    <div className='ClientInit content-Container'>
      <p className="upperText rightToLeft" id='textID'>Lets get started<span class="blinking-cursor upperText">|</span></p>


      <div className='inputContainer'>
          <div className="boxesLabel" id='userNameInp'>
            <input type="text" id="username" name="username"/>
            <p id="errMessUsername" className="errMess">Name already taken or something</p>
            </div>
          <div className="boxesLabel" id='genderInp'>
              <select id="gender" name="gender">
                <option value="" selected disabled hidden>Please select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
                </select>
              </div>
        <div className="boxesLabel" id='homeZipInp'>
            <input type="text" id="zipcode" name="zipcode"/>
            <p id="errMess2" className="errMess">Error. Please enter a valid postal code.</p>
            </div>
        <div className="boxesLabel" id='bornZipInp'>
            <input type="text" id="zipcodeBorn" name="zipcodeBorn"/>
            <p id="errMess3" className="errMess" >Error. Please enter a valid postal code.</p>
            </div>
        </div>

      <div className='actionContainer'> 
       <center> <button className='backButton' id='backButton' onClick={()=>update(-1)}>&#8592;</button> </center>
       <center> <button className='continueButton' id='continueButton' onClick={()=>update(1)}>&#8594;</button> </center>
        </div>

      </div>
  ); 
}

export default ClientInit;
