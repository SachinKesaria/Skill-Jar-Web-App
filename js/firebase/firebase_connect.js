const firebase = require("firebase");
//Add your API Keys here
const app = firebase.initializeApp({
    apiKey:"",
    authDomain: "",
    databaseURL: ""
});

module.exports = app;