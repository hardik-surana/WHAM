/*
 AUTHOR:     HARDIK SURANA & SUDHANSHU JOSHI
 FILE TYPE:  JAVASCRIPT
 DISCLAIMER: THIS CODE HAS BEEN DONE AS A PART OF DATABASE MANAGEMENT COURSE
 TERM:       FALL 2016
 PROFESSOR:  KENNETH BACKLWASKI
 UNIVERSITY: NORTHEASTERN UNIVERSITY, BOSTON

 */
var markersarray = [];
	function getEvents()
	{
		
	    var city = $("#searchByCity").val();
	    clearMarkers();
	    if (city != "")
	    {
	        $.ajax({
	            //url: "http://api.eventful.com/jsonp/events/search?...&location=Boston&within=5&date=Future&app_key=kk7Jzr3BP47vLZH6",
	            url: "http://api.eventful.com/jsonp/events/search?...&location="+city+"&within=10&page_size=30&date=Future&app_key=kk7Jzr3BP47vLZH6",
	            dataType: "jsonp",
	            success: renderEvents
	        })
	    }
		else{
			//Display error here
		}
			
		}

function getEventsDb(){
	var userData = JSON.parse(sessionStorage.getItem('userDetail'));
	var city = $("#searchByCity").val();
	if (city != "")
	    {
		$.ajax({
        url: 'http://localhost:3000/findevents',
        method: 'POST',
        data: { city:city, catlist: userData.preference }
    }).then(function (data) {

        if (data.status == "error") {
            //
        }
        else {
			var tbody = $("#tableBody");
			
			$("#results").show();
            for (var e in data)
			{
				
				var object = data[e];
				var title = object.name;
				var latitude = Number(object.latitude);
				var longitude = Number(object.longitude);
				var eventfulUrl = object.tickets;
				var eventid = object._id;
				var venueaddress = object.address_line1 + ", " +object.address_line2+", " + object.city + ", " + object.state+ ", " +object.zipcode;
				var date = object.date;
				var time = object.time;
				var description = object.description;

				if (description == null || description == "") {

				    description = "There is no description for this event";
				}

				if (title == null || title == "") {

				    title = "There is no title for this event";
				}

				var tr = $("<tr>");
			    //var titleLink = $("<a>").attr("href", eventfulUrl).append(title);
				var titleLink = "<a href='eventDetails.html?eventid="+ eventid + "' target='_blank'>" + title + "</a>";
				var titleTd = $("<td style='width:200px; font-size:15px'>").append(titleLink);
				var titledesc = $("<td style='font-size:15px'>").append("Address: " + venueaddress + "</br>Date: " + date+ "</br>Time: " + time);//(jQuery.trim(description).substring(0, 200).replace('<br>', '').split(" ").slice(0, -1).join(" ") + "...");
				
				tr.append(titleTd);
				tr.append(titledesc);

				tbody.append(tr).fadeIn();
			}
        }

    });
	    }
		else{
			//Display error here
		}

}

		function renderEvents(response)
	{

			var tbody = $("#tableBody"); 
			tbody.empty();
			var template = $("#template").clone();
			var bounds = new google.maps.LatLngBounds();
			var infoWindowContent = {};
			var i = 1;
			var timeout = 0;
			$("#results").show();
			for (var e in response.events.event)
			{
				var event = response.events.event[e];
				var title = event.title;
				var latitude = Number(event.latitude);
				var longitude = Number(event.longitude);
				var eventfulUrl = event.url;
				var eventid = event.id;
				var venueaddress = event.venue_address + ", " + event.city_name + ", " + event.postal_code;
				var date = event.start_time.split(" ")[0];
				var description = event.description;

				if (description == null || description == "") {

				    description = "There is no description for this event";
				}

				if (title == null || title == "") {

				    title = "There is no title for this event";
				}

				var tr = $("<tr>");
			    //var titleLink = $("<a>").attr("href", eventfulUrl).append(title);
				var titleLink = "<a href='eventDetails.html?eventid="+ eventid + "' target='_blank'>" + title + "</a>";
				var titleTd = $("<td style='width:200px; font-size:15px'>").append(titleLink);
				var titledesc = $("<td style='font-size:15px'>").append("Venue: " + event.venue_name + "</br> Address: " + venueaddress + "</br>Date: " + date);//(jQuery.trim(description).substring(0, 200).replace('<br>', '').split(" ").slice(0, -1).join(" ") + "...");
				
				tr.append(titleTd);
				tr.append(titledesc);

				tbody.append(tr).fadeIn();
				
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
			}
			
			getEventsDb();
		}
		function clearMarkers(myLatLng)
		{
		    for (var i = 0; i < markersarray.length; i++) {
		        markersarray[i].setMap(null);
		    }
		    markersarray.length = 0;
		}
	
	function getEventById(eventId,url)
	{
	    $.ajax({
	        url: "http://api.eventful.com/jsonp/events/get?...&id=" + eventId +
                 "&app_key=kk7Jzr3BP47vLZH6",
	        dataType: "jsonp",
	        success: function (response) {
				//console.log(response);
				if(response.hasOwnProperty('status')){
					//console.log('In else');
					$.ajax({
						url: 'http://localhost:3000/eventdetails',
						method: 'POST',
						data: { id:eventId }
					}).then(function (data) {
				var title = data.name;
	            //console.log(title);
				var description = data.description;
	            var venue = data.address_line1 + ',' + data.address_line2 + ',' + data.city + ',' +data.state+ ',' +data.zipcode;
	            var evwhen = data.date;
	            var evtill = null;
				var time = data.time;
                 	
	                
	            $("#perfInfo").remove();
	            var imgLink = "images/event.jpg";
	            

	            $("#title").append("<h3>" + title + "</h3>");
	            
	            $("#description").append("<p>" + description + "</p>");
	            
	            $("#venue").append("<p>" + venue + "</p>");
	            $("#fromdate").append("<p>" + evwhen + "</p>");
	            $("#todate").append("<p>" + time + "</p>");
	            $("#performers").append("<p>" + performers + "</p>");
	            
	            $("#moreInfo").remove();

            	$("#eventimage").append("<img src=\"" + imgLink + "\">");
            	//getDirections(response.latitude, response.longitude);

            	$(".fb-share-button").attr("data-href", url.split("&"));
					});
				}
				else{
				var title = response.title;
	            var description = response.description;
	            var venue = response.venue_name;
	            var where = response.address + ", " + response.city + ", " + response.region;
	            var evwhen = response.start_time;
	            var evtill = response.stop_time;
	            if (evtill == null) {
	                //document.getElementById("todate").style.visibility = "hidden";
	                $("#todate").remove();
	            }
	            if (response.performers != null)
	            {
	            	var performers = response.performers.performer.name;
	            }
	            else
	            {
	            	
	                //document.getElementById("perfInfo").style.visibility = "hidden";
	                $("#perfInfo").remove();
	            }
	            var moreInfo = response.links.link;
	            var imgLink;

	            if (response.images == null)
	            {
	            	imgLink = "images/event.jpg";
	            }
	            else if ($.isArray(response.images.image))
	            {
	            	imgLink = response.images.image[0].medium.url;
	            }
	            else
	            {
	            	imgLink = response.images.image.medium.url;
	            }

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
            	getDirections(response.latitude, response.longitude);

            	$(".fb-share-button").attr("data-href", url.split("&"));
				}
	            
	        },
			
	    });
	}
	function getEventsWithPreferences(preferences) {
	    clearMarkers();
		
	    if (preferences !== [])
	    {
	        var pref = "";
	        for (var i = 0; i < preferences.length ; i++) {

	            pref = pref.concat(preferences[i], ",")
	        }

	        $.ajax({

	            url: "http://api.eventful.com/jsonp/events/search?...&where=" + mylat + "," + mylong + "&within=5&category=" + pref + "&page_size=30&date=Future&app_key=kk7Jzr3BP47vLZH6",
	            dataType: "jsonp",
	            success: renderEvents
	        })
	    }
			    
	}
	function getDirections(latitude, longitude)
	{
	    var directionsDisplay;
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
	    });
	}