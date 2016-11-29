describe("newevent", function() {
	var ne;

	beforeEach(function() {
		ne = new newevent();
	});

	describe("getEvents testing", function() {
		it("should call clearMarkers", function() {
			spyOn(ne, 'clearMarkers');

			ne.getEvents();

			expect(ne.clearMarkers).toHaveBeenCalled();
		});
		it("should call renderEvents", function() {
			spyOn(ne, 'renderEvents');

			ne.getEvents();

			expect(ne.renderEvents).toHaveBeenCalled();
		});
	});

	describe("renderEvents testing", function() {
		it("resets infoWindowContent to null", function() {
			ne.renderEvents("");
			expect(ne.infoWindowContent).toBeNull();
		});

		it("resets iterator to 1", function() {
			ne.renderEvents("");
			expect(ne.i).toEqual(1);
		});

		it("resets timeout to 0", function() {
			ne.renderEvents("");
			expect(ne.timeout).toEqual(0);
		});
	});

	describe("clearMarkers testing", function() {
		it("sets lenght of markersarray to 0", function() {
			ne.clearMarkers();
			expect(ne.markersarray).toEqual([]);
		});
	});

	describe("getEventById testing", function() {
		it("calls getDirections", function() {

			eventID = "E0-001-089091323-2";
			var lat = "42.3341304";
			var lng = "-71.1015364";

			spyOn(ne, 'getDirections');

			ne.getEventById(eventID);

			expect(ne.getDirections).toHaveBeenCalledWith(lat, lng);
		});
	});

	describe("getEventsWithPreferences testing", function() {
		it("calls clearMarkers", function() {
			spyOn(ne, 'clearMarkers');
			var preferences = [];
			ne.getEventsWithPreferences();
			expect(ne.clearMarkers).toHaveBeenCalled();
		});

		it("calls renderEvents", function() {
			spyOn(ne, 'renderEvents');
			var preferences = [1];
			ne.getEventsWithPreferences();
			expect(ne.renderEvents).toHaveBeenCalledWith("");
		});
	});

});