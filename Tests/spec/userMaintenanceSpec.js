describe("userMaintenance", function(){
	var um;
	var gm;

	beforeEach(function() {
		um = new userMaintenance();
		gm = new gmaps();
		ne = new newevent();
	});

	describe("login testing", function() {

		it("should have correct email", function() {
			um.login();
			expect(um.emailid).toEqual("cs5500@gmail.com");
			
		});

		it("should have correct password", function() {
			um.login();
			expect(um.password).toEqual("cs5500");
			
		});

		it("should connect to the right db location", function() {
			um.login();
			expect(um.root).toEqual('http://localhost:3000/login');
		});

	});

	describe("register testing", function() {

		it("should register new user on right path", function() {

			um.register();
			expect(um.root).toEqual('http://localhost:3000/newuser');

		});
		it("should register new user preferences on right path", function() {

			um.register();
			expect(um.root2).toEqual('http://localhost:3000/newpref');

		});

	});

	describe("checkUserLogin testing", function() {

		it("should call getLocation", function() {

			spyOn(gm, "getLocation");
			um.checkUserLogin(gm);
			expect(gm.getLocation).toHaveBeenCalled();

		});

	});

	describe("updateProfile testing", function() {

		it("should update user on right path", function() {
			um.updateProfile();
			expect(um.root).toEqual('http://localhost:3000/updateuser');
		});

		it("should update user preferences on right path", function() {
			um.updateProfile();
			expect(um.root2).toEqual('http://localhost:3000/updatepref');
		});

		it("should login user on right path", function() {
			um.updateProfile();
			expect(um.root3).toEqual('http://localhost:3000/login');
		});

	});

	describe("logout testing", function() {

		it("should logout user on right path", function() {
			um.logout();
			expect(um.root).toEqual('http://localhost:3000/logout');
		});

	});

	describe("checkBox_event testing", function() {

		it("should call getEventsWithPreferences", function() {

			spyOn(ne, "getEventsWithPreferences");
			um.checkBox_event(ne);
			expect(ne.getEventsWithPreferences).toHaveBeenCalledWith([]);

		});

	});

	describe("deleteUser testing", function() {

		it("should delete user on right path", function() {
			um.deleteUser();
			expect(um.root).toEqual('http://localhost:3000/removeprefcs5500@gmail.com');
		});

		it("should delete user preferences on right path", function() {
			um.deleteUser();
			expect(um.root2).toEqual('http://localhost:3000/removeuser?us=cs5500@gmail.com');
		});


	});

});