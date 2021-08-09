var config = {};

config.socketIO = {};
config.npmClient ={};

config.socketIO.port = 5000;
config.npmClient.siteName ='https://step-to-the-line-backend.herokuapp.com';
config.npmClient.LocaltestDevSitName = "192.168.1.239";
config.npmClient.LocaltestDevBackName = "192.168.1.239:5000";

module.exports = config;