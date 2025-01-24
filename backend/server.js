// Import basic libraries and define constants
const express = require("express");
const cors = require("cors");
const port = 3000;

// Set up express app with CORS and JSON config
const app = express();
app.use(cors());
app.use(express.json());

// Import basic sql functions from sql.js
const {
    insertInto,
    getTable,
    getRows,
    updateRow,
    deleteRow,
} = require("./sql.js");


// Gets all disaster IDs
// Example - Request data: {} - Response data: ["4215", "21782", "2912"]
app.get("/getdisasters/", function (req, res) {
    var requestData = req.body;
    var disasterids = getTable("./databases/main.db", "disasters")

    var output = []
    for (var i = 0; i < disasterids.length; i++) {
        output.push(disasterids[i]["disasterid"]);
    }
    return output;
});


// Gets info on a specific disaster based on a disaster ID
// Example - Request data: {"disasterid": "4215"} - Response data: {"disasterid": "4215", "name": "Example Disaster", "type": "tornado"}
app.get("/getdisasterinfo/", function (req, res) {
    var requestData = req.body;
    var disasterid = requestData["disasterid"];

    var disaster = getRows("./databases/main.db", "disasters", {"disasterid": disasterid});
    return disaster[0];
});


// Gets all reports associated with a specific disaster ID
/* Example - Request data: {"disasterid": "4215"} - Response data: 
[
  {
    reportid: '657',
    disasterid: '123',
    level: '3',
    time: '415623128746129',
    lat: '12.35467',
    lng: '15.263738'
  },
  {
    reportid: '645',
    disasterid: '123',
    level: '1',
    time: '3435623128746129',
    lat: '12.35477',
    lng: '15.263787'
  }
]*/
app.get("/getdisasterreports/", function (req, res) {
    var requestData = req.body;
});


// Gets report info based on a report ID
// Example - Request data: {"reportid": "657"} - Response data: {"reportid": "657", "disasterid": "123", "level": "3", "time": "415623128746129", "lat": "12.35467", "lng": "15.263738"}
app.get("/getreport/", function (req, res) {
    var requestData = req.body;
});


// Gets all reports within a radius of a certain location
/* Example - Request data: {"lat": "12.35468", "lng": "15.263740", "radius": "100"} - Response data: 
[
  {
    reportid: '657',
    disasterid: '123',
    level: '3',
    time: '415623128746129',
    lat: '12.35467',
    lng: '15.263738'
  },
  {
    reportid: '645',
    disasterid: '123',
    level: '1',
    time: '3435623128746129',
    lat: '12.35477',
    lng: '15.263787'
  }
]*/
app.get("/getreportsbylocation/", function (req, res) {
    var requestData = req.body;
});


// Creates a new disaster with provided name and type
// Example - Request data: {"name": "Test Disaster", "type": "tornado"} - Response data: {}
app.get("/createdisaster/", function (req, res) {
    var requestData = req.body;
});

// Creates a new report with provided disasterid, level, time, lat, and lng
// Example - Request data: {"disasterid": 467, "level": "Test Disaster", "time": "2342334", "lat": "23.23221", "lng": "23.37383"} - Response data: {}
app.get("/createreport/", function (req, res) {
    var requestData = req.body;
});

app.listen(port, function() {
    console.log("Successfully listening on port " + port + "!")
});
