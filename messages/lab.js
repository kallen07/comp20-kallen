// Create instance of XHR object
xhr = new XMLHttpRequest();

// Set up the request
xhr.open("get", "http://tuftsdev.github.io/comp20-kallen/messages/data.json", true);

// Set up handler for the response
xhr.onreadystatechange = myCallbackFunction;

// Execute the request
xhr.send();

function myCallbackFunction() {
console.log("In my callback function, readyState = " + xhr.readyState);
	if (xhr.readyState == 4 && xhr.status == 200) {
		console.log("got data back!");
		data = JSON.parse(xhr.responseText);

		var messages;
		for (i = 0; i < data.length; i++) {
			messages += "<p>" + data[i]['username'] + " - " + data[i]["content"] + "</p>";
		}
		document.getElementById("message").innerHTML = messages;
		
		}
}