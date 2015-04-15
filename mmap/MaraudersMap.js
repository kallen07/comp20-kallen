var myLat = 0;
var myLng = 0;
var request = new XMLHttpRequest();
var me = new google.maps.LatLng(myLat, myLng);
var myOptions = {
    	zoom: 15,
    	center: me,
    	mapTypeId: google.maps.MapTypeId.ROADMAP
    };
var map;
var marker;
var places;
var login; 
var infowindow = new google.maps.InfoWindow();
var data;  


function init()
{
	map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
	getMyLocation();
}


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


function getData() 
	{
	xhr = new XMLHttpRequest();

	var url = "https://damp-depths-5551.herokuapp.com/sendLocation";
	xhr.open("POST", url, true);

	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

	params = "login=JeremyMaletic&lat=" + myLat + "&lng=" + myLng;
	xhr.send(params);

	xhr.onreadystatechange = function()  {
    if (xhr.readyState == 4 && xhr.status == 200) {
		data = JSON.parse(xhr.responseText);
		editLogin();
		renderMap();
     }
    }
}


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
	var montharray=new Array("January","February","March","April","May",
			"June","July","August","September","October","November","December")
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



function renderMap()
{
	me = new google.maps.LatLng(myLat, myLng);
  
	map.panTo(me);

	var my_image = 'cat.jpg';
	marker = new google.maps.Marker({
		position: me,
		title: "Here I am!",
		icon: my_image,
	});
	marker.setMap(map);

	var my_marker = "<strong>" + marker.title + "</strong></br> " + login

	google.maps.event.addListener(marker, 'click', function() {
		infowindow.close();
		infowindow.setContent(my_marker);
    	infowindow.open(map, marker);
	});

	for (var i = 0; i < data.length; i++) {
		if( data[i].login != "JeremyMaletic" )
			createMarker(data[i]);
	}
}


function createMarker(person)
{
  	var place = new google.maps.LatLng(person.lat, person.lng);
  	var marker = new google.maps.Marker({
    	map: map,
    	position: place
  	});

  	var relative_dist = calcDist(person);
  	relative_dist = Math.round(relative_dist * 10000) / 10000;  

  	var info = "<strong>" + person.login + "</strong></br> " + 
  				"Distance from me: " + relative_dist + " miles";

  	google.maps.event.addListener(marker, 'click', function() {
    	infowindow.close();
    	infowindow.setContent(info);
    	infowindow.open(map, this);
  	});
}


function calcDist(person) 
{
	var lat1 = myLat * (Math.PI/180);
	var lon1 = myLng * (Math.PI/180);
	var lat2 = person.lat * (Math.PI/180);
	var lon2 = person.lng * (Math.PI/180);

	var R = 6371000; 
	var φ1 = lat1;
	var φ2 = lat2;
	var Δφ = (lat2-lat1);
	var Δλ = (lon2-lon1);

	var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
    	    Math.cos(φ1) * Math.cos(φ2) *
        	Math.sin(Δλ/2) * Math.sin(Δλ/2);
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

	var d = R * c;

	return d * 0.00062137; 
}

