describe("gmaps", function(){
	var gm;

	beforeEach(function() {
		gm = new gmaps();
	});

	describe("getLocation testing", function() {
		it("means x is null", function() {
			gm.getLocation();

			expect(gm.x).toBeNull();
		});
	});

	describe("displaymap testing", function() {
		it("should call addMarker", function() {
		  var position = {coords:{latitude: -34.397, longitude: 150.644}};
		  var pos = {lat: -34.397, lng: 150.644};
		  spyOn(gm, 'addMarker');

		  gm.displaymap(position);

		  expect(gm.addMarker).toHaveBeenCalledWith(pos);
		});

		it("should match variables", function() {
		  var position = {coords:{latitude: -34.397, longitude: 150.644}};
		  //var pos = {lat: -34.397, lng: 150.644};
		  //spyOn(player, 'addMarker');

		  gm.displaymap(position);

		  expect(gm.mylat).toEqual(-34.397);
		  expect(gm.mylong).toEqual(150.644);
		});

		it("should call getEvents()", function() {
			var position = {coords:{latitude: -34.397, longitude: 150.644}};

			spyOn(gm, 'getEvents');
			gm.displaymap(position);

			expect(gm.getEvents).toHaveBeenCalled();
		});

		it("should call getEventsWithPreferences()", function() {
			var position = {coords:{latitude: -34.397, longitude: 150.644}};
			
			spyOn(gm, 'getEventsWithPreferences');
			gm.displaymap(position);

			expect(gm.getEventsWithPreferences).toHaveBeenCalled();
		});
	});

});