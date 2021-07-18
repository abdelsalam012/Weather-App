// Setup empty JS object to act as endpoint for all routes
projectData = {};


// Express to run server and routes
const express = require('express');
const bodyParser = require ('body-parser');
const cors = require('cors');
const fetch = require('node-fetch');



// Start up an instance of app
const app = express();



/* Dependencies */
/* Middleware*/

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



// Cors for cross origin allowance
app.use(cors());


// Initialize the main project folder
app.use(express.static('website'));


// Spin up the server
//local server will be  http://localhost:3000/

const port =  3000;


// Callback to debug

try {
    app.listen(port, () => console.log(`server is running on localhost: ${port}`));
    
} catch (error) {
    console.log(error)
    
}

// Initialize all route with a callback function

// ----- Finished -------//


// Callback function to complete GET '/all'
app.get('/getInfo', sendData)

function sendData (request, response) {
    response.send(projectData)
}


// Post Route

app.post('/postInfo', addData)

function addData(request, response) {
// Add Temperature to the projectData{} 
    projectData.temperature = request.body.temperature;
// Add city to the projectData{} 
    projectData.cityname =request.body.cityname;
// Add date to the projectData{} 
    projectData.date = request.body.date;
// Add feeling to the projectData{} 
    projectData.feelings = request.body.feelings;
    
    response.end();
    console.log(projectData);
}
