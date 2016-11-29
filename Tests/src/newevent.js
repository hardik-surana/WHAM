//$(document).ready(function () {
//    $("#fromdate").focusout(function () {
//        var date = $("#fromdate").val();
//        $("#todate").val(date);
//    });
//    $("#results").hide();
//})
function newevent() {
}

newevent.prototype.getEvents = function()
{
	
	//$("#searchEvent").click(searchEvent);
	/*var eventType = $("#eventType");
	var tbody = $("#container"); 
	var template = $("#template").clone();
	tbody.empty();*/
	//lat = position.coords.latitude;
    //lng = position.coords.longitude
    this.keyword = "";
    this.fromdate = "";
    this.todate = "";
    this.distance = "";
    this.clearMarkers();
    var jsn = "";
    if (this.keyword == "" && this.fromdate == "" && this.todate == "")
    {
        this.renderEvents(jsn);
    }
    else if (fromdate == "" || todate == "")
    {
        
    }
    else {
        
    }
		
}


newevent.prototype.renderEvents = function(response)
{

	
	console.log(response);
	
	this.infoWindowContent = null;
	this.i = 1;
	this.timeout = 0;
	/*for (var e in response.events.event)
	{
		var event = response.events.event[e];
		var title = event.title;
		var latitude = Number(event.latitude);
		var longitude = Number(event.longitude);
		var eventfulUrl = event.url;
		var eventid = event.id;
		var description = event.description;

		if (description == null || description == "") {

		    description = "There is no description for this event";
		}

		if (title == null || title == "") {

		    title = "There is no title for this event";
		}

		
		
		var myLatLng = { lat: latitude, lng: longitude };
		bounds.extend(new google.maps.LatLng(latitude,longitude));
		var image = {
			url: 'images/icon.png',
			// This marker is 20 pixels wide by 32 pixels high.
			size: new google.maps.Size(20, 32),
			// The origin for this image is (0, 0).
			origin: new google.maps.Point(0, 0),
			// The anchor for this image is the base of the flagpole at (0, 32).
			anchor: new google.maps.Point(0, 32)
		  };
		  var shape = {
			coords: [1, 1, 1, 20, 18, 20, 18, 1],
			type: 'poly'
		  };
		var marker = new google.maps.Marker({
		position: myLatLng,
		animation: google.maps.Animation.DROP,
		map: map,
		label: title,
		title: title
		});
		markersarray.push(marker);
		infoWindowContent[title] = '<div class="info_content">' +
'<h3>'+ title +'</h3>' +
		'<p>' + $.trim(description).substring(0, 250).split(" ").slice(0, -1).join(" ") + "<a href='eventDetails.html?eventid=" + eventid + "&location=" + mylat + "," + mylong + "' target='_blank'>...See More...</a>" + '</p>' + '</div>';
		var infoWindow = new google.maps.InfoWindow(), marker;
		
		google.maps.event.addListener(marker, 'click', (function(marker) {
			return function() {
        infoWindow.setContent(infoWindowContent[marker.getTitle()]);
        infoWindow.open(map, marker);
			}
})(marker));
map.fitBounds(bounds);
	}*/
	
	
}

newevent.prototype.getEventById = function(eventId)
{
    /*$.ajax({
        url: "http://api.eventful.com/jsonp/events/get?...&id=" + eventId +
             "&app_key=kk7Jzr3BP47vLZH6",
        dataType: "jsonp",
        success: function (response) {
            console.log(response);
            var title = response.title;
            var description = response.description;
            var venue = response.venue_name;
            var where = response.address + ", " + response.city + ", " + response.region;
            var evwhen = response.start_time;
            var evtill = response.stop_time;
            if (evtill == null) {
            	document.getElementById("todate").style.visibility = "hidden";
            }
            if (response.performers != null)
            {
            	var performers = response.performers.performer.name;
            }
            else
            {
            	var performers = "No performers info";
            	document.getElementById("perfInfo").style.visibility = "hidden";
            }
            var moreInfo = response.links.link;
            var imgLink;

            if (response.images == null)
            {
            	imgLink = "images/event.png";
            }
            else if ($.isArray(response.images.image))
            {
            	imgLink = response.images.image[0].medium.url;
            }
            else
            {
            	imgLink = response.images.image.medium.url;
            }

            console.log(evwhen);
            console.log(imgLink);

            $("#title").append("<h3>" + title + "</h3>");
            if (description == null)
            {
            	var lk = moreInfo[0];
            	$("#description").append("<p>" + lk.description + "</p>");
            	

            }
            else
            {
            	$("#description").append("<p>" + description + "</p>");
            }
            $("#venue").append("<p>" + venue + "</p>");
            $("#where").append("<p>" + where + "</p>");
            $("#fromdate").append("<p>" + evwhen + "</p>");
            $("#todate").append("<p>" + evtill + "</p>");
            $("#performers").append("<p>" + performers + "</p>");
            var lk = moreInfo[0];
        	$("#moreInfo").append("<p><a href=\"" + lk.url + "\">" + lk.description + "</a>" + "</p>");
        	

        	$("#eventimage").append("<img src=\"" + imgLink + "\">");
        	this.getDirections(response.latitude, response.longitude);
        }
    });*/

	this.getDirections("42.3341304", "-71.1015364")
}
newevent.prototype.getEventsWithPreferences = function(preferences) {
    this.len = 0;
    this.clearMarkers();

    if (preferences !== [])
    {
        var pref = "";
        for (var i = 0; i < 0 ; i++) {

            pref = pref.concat(preferences[i], ",")
        }

        this.renderEvents("");
    }
    
}

newevent.prototype.clearMarkers = function()
{
	this.markersarray = [];
    for (var i = 0; i < this.markersarray.length; i++) {
        this.markersarray[i].setMap(null);
    }
    this.markersarray.length = 0;
}

newevent.prototype.getDirections = function(latitude, longitude)
{
    /*var directionsDisplay;
    var directionsService = new google.maps.DirectionsService;
    var map;
    directionsDisplay = new google.maps.DirectionsRenderer;
    
    map = new google.maps.Map(document.getElementById('eventDetailMap'), {
        zoom: 15,
        center: { lat: Number(lat), lng: Number(long) },
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    directionsDisplay.setMap(map);

    directionsService.route({
        origin: { lat: Number(lat), lng: Number(long) },
        destination: { lat: Number(latitude), lng: Number(longitude) },
        travelMode: google.maps.TravelMode.DRIVING
    }, function (response, status) {
        if (status === google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });*/
}