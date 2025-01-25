//Code structure referenced from https://kinsta.com/knowledgebase/javascript-http-request/

//Create a new XMLHttpRequest object and store it in a variable called xhr
const xhr = new XMLHttpRequest();
/* Specified the request type (GET) and the endpoint where the request will be sent to, in this 
case get disaster reports to get the number of disasters reported*/
xhr.open("GET", "http://ciygqqnpfv.a.pinggy.link/getdisasterreports/");
xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
//Send the request to the server
xhr.send(JSON.stringify({"disasterid": "123"}));
//Ensure answer is received in json format
xhr.responseType = "json";
//Onload event listener to receive the server's response

xhr.onload = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
    const data = xhr.response;
    console.log(data);
  } else {
    console.log(`Error: ${xhr.status}`);
  }
};