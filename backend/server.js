// Import basic libraries and define constants
const express = require("express");
const cors = require("cors");
const crypto = require("crypto");
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
    res.set("Content-Type", "application/json");
    var disasterids = getTable("./databases/main.db", "disasters")

    var output = []
    for (var i = 0; i < disasterids.length; i++) {
        output.push(disasterids[i]["disasterid"]);
    }
    
    res.write(JSON.stringify(output));
    res.send();
});


// Gets info on a specific disaster based on a disaster ID
// Example - Request data: {"disasterid": "4215"} - Response data: {"disasterid": "4215", "name": "Example Disaster", "type": "tornado"}
app.get("/getdisasterinfo/", function (req, res) {
    var requestData = req.body;
    res.set("Content-Type", "application/json");
    var disasterid = requestData["disasterid"];

    var disaster = getRows("./databases/main.db", "disasters", {"disasterid": disasterid});
    res.write(JSON.stringify(disaster[0]));
    res.send();
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
    res.set("Content-Type", "application/json");
    var disasterid = requestData["disasterid"];

    res.write(JSON.stringify(getRows("./databases/main.db", "reports", {"disasterid": disasterid})))
    res.send();
});


// Gets report info based on a report ID
// Example - Request data: {"reportid": "657"} - Response data: {"reportid": "657", "disasterid": "123", "level": "3", "time": "415623128746129", "lat": "12.35467", "lng": "15.263738"}
app.get("/getreport/", function (req, res) {
    var requestData = req.body;
    res.set("Content-Type", "application/json");

    var reportid = requestData["reportid"];
    var report = getRows("./databases/main.db", "reports", reportid);

    res.write(JSON.stringify(report[0]));
    res.send();
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
    res.set("Content-Type", "application/json");

    var reports = getTable("./databases/main.db", "reports");
    var lat = parseFloat(requestData["lat"]);
    var lng = parseFloat(requestData["lng"]);
    var radius = parseFloat(requestData["radius"]);

    var output = [];
    for (var i = 0; i < reports.length; i++) {
        var targetLat = parseFloat(reports[i]["lat"]);
        var targetLng = parseFloat(reports[i]["lng"]);
        if (Math.abs(lat - targetLat) < radius && Math.abs(lng - targetLng) < radius) {
            output.push(reports[i]);
        }
    }

    res.write(JSON.stringify(output));
    res.send();
});


// Gets all disasters by disaster type
// Example - Request data: {"type": "tornado"} - Response data: ["213" "1231", "2321"]
app.get("/getdisastersbytype/", function (req, res) {
    var requestData = req.body;
    res.set("Content-Type", "application/json");

    var rows = getRows("./databases/main.db", "disasters", {"type": requestData["type"]});

    var output = [];
    for (var i = 0; i < rows.length; i++) {
        output.push(rows[i]["disasterid"]);
    }

    res.write(JSON.stringify(output));
    res.send();
});


// Creates a new disaster with provided name and type
// Example - Request data: {"name": "Test Disaster", "type": "tornado"} - Response data: {"disasterid": "237362"}
app.get("/createdisaster/", function (req, res) {
    var requestData = req.body;
    res.set("Content-Type", "application/json");

    crypto.randomBytes(32, function(err, buffer) {
        if (err) {
            res.write(null);
        }
        else {
            var disasterid = buffer.toString("hex");
            insertInto("./databases/main.db", "disasters", {"disasterid": disasterid, "name": requestData["name"], "type": requestData["type"]});
            var response = JSON.stringify({"disasterid": disasterid});
            console.log(response);
            res.write(response);
        }
        res.send();
    });

    
});

// Creates a new report with provided disasterid, level, time, lat, and lng
// Example - Request data: {"disasterid": 467, "level": "Test Disaster", "time": "2342334", "lat": "23.23221", "lng": "23.37383"} - Response data: {"reportid": "23672"}
app.get("/createreport/", function (req, res) {
    var requestData = req.body;
    res.set("Content-Type", "application/json");

    crypto.randomBytes(32, function(err, buffer) {
        if (err) {
            res.write(null);
        }
        else {
            var reportid = buffer.toString("hex");
            insertInto("./databases/main.db", "reports", {"reportid": reportid, "disasterid": requestData["disasterid"], "level": requestData["level"], "time": requestData["time"], "lat": requestData["lat"], "lng": requestData["lng"]});
            res.write(JSON.stringify({"reportid": reportid}));
        }
        res.send();
    });
});

app.listen(port, function() {
    console.log("Successfully listening on port " + port + "!")
});
