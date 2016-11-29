describe("server", function() {
	var sv;

	beforeEach(function() {
		sv = new server();
	});

	describe("insertUser testing", function() {

		it("should insert user", function() {

			var result;

			setTimeout(function() {
	            sv.insertUser(db, function(err,result2) {
					//console.log(result2);
					result = result2;
				});

	            

	        }, 10000);

	        expect(result).toEqual(undefined);

		});

	});

	describe("insertPreference testing", function() {

		it("should insert user preference", function() {

			var result;

			setTimeout(function() {
	            sv.insertPreference(db, function(err,result2) {
					//console.log(result2);
					result = result2;
				});

	            

	        }, 10000);

	        expect(result).toEqual(undefined);

		});

	});

	describe("findUser testing", function() {

		it("should find user", function() {

			var result;

			setTimeout(function() {
	            sv.findUser(db, function(err,result2) {
					//console.log(result2);
					result = result2;
				});

	            

	        }, 10000);

	        expect(result).toEqual(undefined);

		});

	});

	describe("findPreference testing", function() {

		it("should find user preference", function() {

			var result;

			setTimeout(function() {
	            sv.findUserPreference(db, function(err,result2) {
					//console.log(result2);
					result = result2;
				});

	            

	        }, 10000);

	        expect(result).toEqual(undefined);

		});

	});

	describe("updateDetail testing", function() {

		it("should update user", function() {

			var result;

			setTimeout(function() {
	            sv.updateDetail(db, function(err,result2) {
					//console.log(result2);
					result = result2;
				});

	            

	        }, 10000);

	        expect(result).toEqual(undefined);

		});

	});

	describe("updatePreference testing", function() {

		it("should update user preference", function() {

			var result;

			setTimeout(function() {
	            sv.updatePreference(db, function(err,result2) {
					//console.log(result2);
					result = result2;
				});

	            

	        }, 10000);

	        expect(result).toEqual(undefined);

		});

	});

	describe("removeUser testing", function() {

		it("should remove user", function() {

			var result;

			setTimeout(function() {
	            sv.removeUser(db, function(err,result2) {
					//console.log(result2);
					result = result2;
				});

	            

	        }, 10000);

	        expect(result).toEqual(undefined);

		});

	});

	describe("removePreference testing", function() {

		it("should remove user preference", function() {

			var result;

			setTimeout(function() {
	            sv.removePreference(db, function(err,result2) {
					//console.log(result2);
					result = result2;
				});

	            

	        }, 10000);

	        expect(result).toEqual(undefined);

		});

	});

});