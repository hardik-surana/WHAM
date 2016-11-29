function gmaps() {
}
gmaps.prototype.getLocation = function() {
    
    this.x = document.getElementById('map');
    if (navigator.geolocation) {
        //navigator.geolocation.getCurrentPosition(displaymap,showError);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

/*gmaps.prototype.showError = function(error) {
    this.x = document.getElementById('map');
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
}*/


gmaps.prototype.displaymap = function(position) {
	
    this.mylat = position.coords.latitude;
    this.mylong = position.coords.longitude;
    var myLatLng = { lat: this.mylat, lng: this.mylong };

    /*map = new google.maps.Map(document.getElementById('map'), {
        zoom: 16,
        center: new google.maps.LatLng(mylat, mylong),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });*/

    this.session = 'true';
    this.noSession = 'false'

    this.addMarker(myLatLng);
    if (this.session == 'true') {
        this.getEventsWithPreferences();
    }
    if (this.noSession == 'false')
    {
        this.getEvents();
    }
}

gmaps.prototype.getEvents = function(myLatLng)
{
    /*var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: 'Your Location'
    });*/

}

gmaps.prototype.getEventsWithPreferences = function(myLatLng)
{
    /*var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: 'Your Location'
    });*/

}

gmaps.prototype.addMarker = function(myLatLng)
{
	/*var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: 'Your Location'
	});*/

}