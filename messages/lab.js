function parse() {
	// Create instance of XHR object
	xhr = new XMLHttpRequest();

	// Set up the request
	var url = "http://tuftsdev.github.io/comp20-kallen/messages/data.json";
	xhr.open("get", url , true);

	// Execute the request
	xhr.send();

	// Set up handler for the response
	xhr.onreadystatechange = function()  {
		if (xhr.readyState == 4 && xhr.status == 200) {
			data = JSON.parse(xhr.responseText);

			var messages = "";
			for (i = 0; i < data.length; i++) {
				messages += "<p>" + data[i]['username'] + ": " + data[i]["content"] + "</p>";
			}

			document.getElementById("messages").innerHTML = messages;
			
		}
	}
}