//Code structure referenced from https://kinsta.com/knowledgebase/javascript-http-request/

//Create a new XMLHttpRequest object and store it in a variable called xhr
const xhr2 = new XMLHttpRequest();
/* Specified the request type (GET) and the endpoint where the request will be sent to, in this 
case get disaster reports to get the number of disasters reported*/
xhr2.open("GET", "http://ciygqqnpfv.a.pinggy.link/getdisasters/");
xhr2.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
//Send the request to the server
xhr2.send(JSON.stringify({}));
//Ensure answer is received in json format
xhr2.responseType = "json";
//Onload event listener to receive the server's response

xhr2.onload = () => {
    if (xhr2.readyState == 4 && xhr2.status == 200) {
    const data = xhr2.response;
    console.log(data);
  } else {
    console.log(`Error: ${xhr2.status}`);
  }
};