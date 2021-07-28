import Cookies from 'universal-cookie';
import React from "react";
import './components_CSS/HostSettingsPage.css'
import DropDown from './tools/dropDown.jsx'


const cookies = new Cookies();
cookies.set('Type', 'Host', { path: '/' });


function HostSettingsPage() {
  function checkAndGet(id){
    var val = document.getElementById(`${id}Drop`).value;
    if((val!=="")){
      document.getElementById(`${id}Lab`).classList.remove('title-error');
      return [true,val];
    }
    else{
      document.getElementById(`${id}Lab`).classList.add('title-error');
      return [false,null];
    }
  }
  function hostStart(){
    var community = checkAndGet("community");
    var family = checkAndGet("family");
    var needs = checkAndGet("needs");
    var potential = checkAndGet("potential");
    var relationships = checkAndGet("relationships");
    var combo = [community,family,needs,potential,relationships];
    var verified = true;
    for(var i = 0; i<combo.length ; i++){
      if(!combo[i][0]){
        verified = false;
      }
    }
    if(verified){
      //instead use cookies
      cookies.set('quesSettings', {questions_community: community[1] ,
         questions_family : family[1] ,
          questions_mhon: needs[1] ,
          questions_potential : potential[1] , 
          questions_relationships : relationships[1]}
      , { path: '/' });

      window.location.href = `/sessionLobby`;


    }
    else{
      //alert("Please fix red");//put custom ui for notification using z index and fading with 'X' button
    }
    

  }
  return ( //jsx portion
    <div className="HostSettingsPage content-Container">
    <DropDown group='community' NumberQuestions={10} />

    <DropDown group='family' NumberQuestions={15} />

    <DropDown group='potential' NumberQuestions={5} />

    <DropDown group='needs' NumberQuestions={24} />

    <DropDown group='relationships' NumberQuestions={12} />
    <center><button onClick={hostStart} to={`/sessionLobby/?{2,3,4,2,3}`} className="sessionButton"> Click here to create session from given inputs</button></center>
    </div>

  ); 
}

export default HostSettingsPage;
