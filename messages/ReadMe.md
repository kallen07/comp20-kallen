## ReadMe file for Comp20, Lab 6: Messages
### Kalina Allen, 03/09/2015

### Aspects that have been correctly implemented:
	+ The basics (e.g., file names, Git commit messages)
	+ Your JavaScript code that parses the JSON, modifies "messages" section of HTML
	+ The README

### Aspects that have not been correctly implemented:
	* n/a

### Collaboration/discussion:
	* n/a

### Approx. number of hours spent on the assignment:
	* 2 

### Is it possible to request the data from a different origin (e.g., http://messagehub.herokuapp.com/) or from your local machine (from file:///) from using XMLHttpRequest? Why or why not? 
	* Generally speaking, requesting data from a different origit is prohibited by the Same Origin Policy. This is for privacy reasons, e.g. to prevent cross-site scripting (XSS). "XSS enables attackers to inject client-side script into Web pages viewed by other users." reference: https://en.wikipedia.org/wiki/Cross-site_scripting
	* However Internet Explorer has exceptions where the Same Origin Policy does not apply:
		* Trust Zones: both domains are in highly trusted zones (e.g. corporate domains)
		* Port: IE only considers protocol and host (not port). So if two domains have the same protocol and host (but not necessarily the same port) then they will have the "same origin"
	* Furthermore, the Cross-Origin Resource Sharing standard allows web browsers to make requests given that they "preflight" the request with an HTTP OPTIONS method to get approval from the server
	* Note that the Same Origin Policy is not enforced for all requests. E.g. the <script> and <img> tags may fetch resources from any domain
