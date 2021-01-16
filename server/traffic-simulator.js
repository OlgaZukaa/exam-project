const axios = require('axios');

function sendValidRequest(){
    axios.get('http://localhost:4000/endpoint?login=test')
}

function sendInvalidRequest(){
    axios.get('http://localhost:4000/endpoint')  
}

setInterval(sendValidRequest, 1000)

setInterval(sendInvalidRequest, 1500)