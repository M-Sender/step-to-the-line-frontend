//import React, { useState, useEffect } from "react";
//require('path');
//import Cookies from 'universal-cookie';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { MainPage, pageDNE,
   JoinSession, ClientInit, ClientPage, ClientAnalytics,
   HostSettingsPage, HostLobbyPage,
    HostSessionPage , HostAnalytics,
    TopBar, Footbar,
     SessionValidation
  } from "./components";
//import components to display to user
//const cookies = new Cookies();
 
//cookies.set('sessionID', '', { path: '/' });
//cookies.set('Type', '', { path: '/' });
//cookies.set('userName', '', { path: '/' });



function App() {
  
  
  return (
    <div className="App">
      <Router>
        <TopBar />
        
      <Switch>
        <Route path='/' exact component={()=> <MainPage />}/>
        <Route path='/pagenotfound' exact component={()=> <pageDNE /> }/>
        <Route path="/entersession/" exact component={()=> <JoinSession />}/>
        <Route path='/userInfo/' exact component={()=><><SessionValidation type='urlIdent'/> <ClientInit /></>}/>
        <Route path='/userpage/' exact component={()=><><SessionValidation type='userSession'/> <ClientPage /></>}/>
        <Route path='/userResults' exact component={()=><><SessionValidation type='userSession'/> <ClientAnalytics /></>}/>
        <Route path='/createsession' exact component={()=><HostSettingsPage />}/>
        <Route path='/sessionLobby/' exact component ={()=><><HostLobbyPage /></>}/>
        <Route path='/hostinsession/' exact component ={()=><> <SessionValidation type='hostkey'/> <HostSessionPage /></>}/>
        <Route path='/hostAnalytics/' exact component = {()=><><SessionValidation type='hostkey'/> <HostAnalytics /></>}/>
        </Switch>
        <Footbar />
    </Router>
    </div>
  );
}

export default App;
