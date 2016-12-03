/*
 AUTHOR:     HARDIK SURANA & SUDHANSHU JOSHI
 FILE TYPE:  JAVASCRIPT
 DISCLAIMER: THIS CODE HAS BEEN DONE AS A PART OF DATABASE MANAGEMENT COURSE
 TERM:       FALL 2016
 PROFESSOR:  KENNETH BACKLWASKI
 UNIVERSITY: NORTHEASTERN UNIVERSITY, BOSTON

 */
function getLocation() {
    
    var x = document.getElementById('map');
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(displaymap,showError);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showError(error) {
    var x = document.getElementById('map');
    switch (error.code) {
        case error.PERMISSION_DENIED:
            x.innerHTML = "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            x.innerHTML = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            x.innerHTML = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            x.innerHTML = "An unknown error occurred."
            break;
    }
}


function displaymap(position) {
	
    mylat = position.coords.latitude;
    mylong = position.coords.longitude;
    var myLatLng = { lat: mylat, lng: mylong };

    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 16,
        center: new google.maps.LatLng(mylat, mylong),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    addMarker(myLatLng);
    if (localStorage.getItem('session') == 'true') {
        getEventsWithPreferences(JSON.parse(sessionStorage.getItem('userDetail')).preference);
    }
    else
    {
        getEvents();
    }
}

function addMarker(myLatLng)
{
	var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: 'Your Location'
	});

}