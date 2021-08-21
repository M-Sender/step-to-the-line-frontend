//use dotenv and use same method as backend
process.env.NODE_ENV !== 'production' ? require('dotenv').config() : {/*PASS*/};
var config = {};

config.socketIO = {};
config.npmClient ={};

config.socketIO.port = 5000;
config.npmClient.backendRoute = process.env.backendRoute;
config.npmClient.frontendRoute = process.env.frontendRoute;
module.exports = config;