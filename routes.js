import React from 'react';
import { Route, IndexRoute } from 'react-router';

/**
 * Import all page components here
 */
//import App from './components/App';
import MainPage from './components/MainPage';
import pageDNE from './components/pageDNE';

import HostSettingsPage from './components/HostSettingsPage';
import HostLobbyPage from './components/HostLobbyPage';
import HostInSession from './components/HostInSession';
import HostAnalytics from './components/HostAnalytics';

import ClientInit from './components/ClientInit';
import ClientPage from './components/ClientPage';
import ClientAnalytics from './components/ClientAnalytics';

import TopBar from './components/TopBar';
//import DataBasePage from './components/DataBasePage';

/**
 * All routes go here.
 * Don't forget to import the components above after adding new route.
 */
export default (
  <Route path="/" component={App}>
    <IndexRoute component={MainPage} />
    <Route path="/createsession" component={HostSettingsPage} />
    <Route path="/sessionLobby" component={HostLobbyPage} />
    <Route path="/hostinsession" component={HostInSession} />
    <Route path="/hostAnalytics" component={HostAnalytics} />
    <Route path="/pagenotfound" component={pageDNE} />
    <Route path='/userinfo' component={ClientInit} />
    <Route path="/userpage" component={ClientPage} />
    <Route path="/userResults" component={ClientAnalytics} />
    
    
  </Route>
);