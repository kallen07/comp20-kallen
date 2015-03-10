var myLat = 0;
var myLng = 0;
var request = new XMLHttpRequest();
var me = new google.maps.LatLng(myLat, myLng);
var myOptions = {
    	zoom: 15, // The larger the zoom number, the bigger the zoom
    	center: me,
    	mapTypeId: google.maps.MapTypeId.ROADMAP
    };
var map;
var marker;
var places;
var login; 
var infowindow = new google.maps.InfoWindow();
var data;   // to hold the data returned by the database API
var userArray = [];
var latArray = [];
var lngArray = [];


// initalizes the map and calls myLocation to get data to display on the map
function init()
{
	map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
	getMyLocation();
}


// gets my location, calls a function to get data from the database
function getMyLocation() 
{
	// the navigator.geolocation object is supported on your browser
	if (navigator.geolocation) { 
		navigator.geolocation.getCurrentPosition( function(position) {
			myLat = position.coords.latitude;
			myLng = position.coords.longitude;
			getData();
		});
	}
	else {
		alert("Geolocation is not supported by your web browser.  What a shame!");
	}
}


// POSTs to the database API and parses the data returned
// calls editLogin() to set the my login time, calls formatData() to format
// the data from the database, calls renderMap() to display the map on the screen
function getData() 
	{
	xhr = new XMLHttpRequest();

	var url = "https://secret-about-box.herokuapp.com/sendLocation";
	xhr.open("POST", url, true);

	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

	params = "login=JeremyMaletic&lat=" + myLat + "&lng=" + myLng;
	xhr.send(params);

	xhr.onreadystatechange = function()  {
    if (xhr.readyState == 4 && xhr.status == 200) {
		data = JSON.parse(xhr.responseText);
		console.log(data);
		editLogin();
		formatData();
		renderMap();
     }
    }
}


// edits the login time to be displayed on my personal icon
// credits to www.javascriptkit.com for skeleton of this code
function editLogin()
{
	var mydate=new Date()
	var year=mydate.getYear()
	if (year < 1000)
		year+=1900
	var month=mydate.getMonth()
	var daym=mydate.getDate()
	if ( daym < 10 )
		daym= "0" + daym
	var montharray=new Array("January","February","March","April","May","June","July","August",
						"September","October","November","December")
	var hour=mydate.getHours();
	var minute= mydate.getMinutes()
	if ( minute < 10 )
		minute = "0"+minute;
	var seconds= mydate.getSeconds();
	if ( seconds < 10 )
		seconds = "0"+seconds;
	login = "Logged in at: " + hour + ":" + minute + ":" + seconds + " on " 
			+ montharray[month] + " " + daym + ", " + year;
}


// formats the data returned from the database API into 3 parallel arrays
function formatData() 
{
	for (var i = 0; i < data.length; i++) {
		userArray[i] = data[i].login;
		latArray[i] = data[i].lat;
		lngArray[i] = data[i].lng;
	}
}


// displays the map on the screen 
function renderMap()
{
	me = new google.maps.LatLng(myLat, myLng);
  
	// Update map and go there
	map.panTo(me);

	// Create a marker
	var my_image = 'cat.jpg';
	marker = new google.maps.Marker({
		position: me,
		title: "Here I am!",
		// animation: google.maps.Animation.DROP,
		icon: my_image,
	});
	marker.setMap(map);

	console.log(login);
	var my_marker = "<strong>" + marker.title + "</strong></br> " + login + 
					"</br>" + "My latitute: " + myLat + "</br>" + "My longitute: " +
					myLng;

	// Open info window on click of marker
	google.maps.event.addListener(marker, 'click', function() {
		infowindow.close();
		infowindow.setContent(my_marker);
    	infowindow.open(map, marker);
	});

	// create markers using data from the database API
	for (var i = 0; i < data.length; i++) {
		createMarker(data[i]);
	}

	// Calling Google Places API
	/*var request = {
		location: me,
		radius: '500',
		types: ['food']
	};
	service = new google.maps.places.PlacesService(map);
	service.search(request, callback);
	*/
}

// Taken from http://code.google.com/apis/maps/documentation/javascript/places.html
/*function callback(results, status)
{
	if (status == google.maps.places.PlacesServiceStatus.OK) {
		places = results;
		for (var i = 0; i < results.length; i++) {
		createMarker(results[i]);
		}
	}
}
*/

function createMarker(place)
{
  	var placeLoc = place.geometry.location;
  	var marker = new google.maps.Marker({
    	map: map,
    	position: place.geometry.location
  	});

  	google.maps.event.addListener(marker, 'click', function() {
    	infowindow.close();
    	infowindow.setContent(place.name);
    	infowindow.open(map, this);
  	});
}


// fix this to make it work
function drop() {
  	for (var i =0; i < markerArray.length; i++) {
    	setTimeout(function() {
      	addMarkerMethod();
    	}, i * 200);
  	}
}
