var express = require('express');
var cors = require('cors');
var port = 3000;
var app = express();
app.use(cors());
app.use(express.json()); 

app.get('/getuser', function(req, res) {
    var requestdata = req.body;
    res.set('Content-Type', 'application/json');            //javascript object notation

    var name = requestdata["name"];

    var data = {
        "username": "",
        "id": "",
        "phone": ""
    };

    if(name == "bob"){
        data["username"] = "boblovesicecream";
        data["id"] = "12345";
        data["phone"] = "1234567890";
    };
    res.write(JSON.stringify(data));
    res.send();
});

//will get you data and post you are sending data

app.listen(port, function(){
    console.log('Server is running on port ' + port);
});