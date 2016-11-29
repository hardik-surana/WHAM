function server() {
}
var express = require('express')
var app = express()


//Body-Parser
var bodyParser = require('body-parser');
var multer = require('multer'); // v1.0.5
var upload = multer(); // for parsing multipart/form-data

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
//app.use(multer()); // for parsing multipart/form-data


//Client Session
var session = require('client-sessions');

//Mongo part
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/CS5500';


//DB Functions
server.prototype.insertUser = function(db, callback) {
db.collection('user_detail').insertOne({
   "username": username, 
   "password": pwd, 
   "first_name": fname,
   "last_name": lname,
   "address_line1": addrline1, 
   "address_line2": addrline1,
   "city": city, 
   "state": state, 
   "zip": zip,
   "phone": phone

}, function(err, dbresult) {
   //assert.equal(err, null);
   //return true;
   callback(err,dbresult);
});
};

server.prototype.insertPreference = function(db, callback) {
db.collection('user_preference').insertOne({
   "username": username, 
   "preference": preferences
   
}, function(err, dbresult) {
   //assert.equal(err, null);
   callback(err,dbresult);
});
};

server.prototype.findUser = function(db, callback) {
var cursor =db.collection('user_detail').find({
   "username": username
} );

cursor.next(function(err, doc) {
  //assert.equal(err, null);
       callback(err,doc);
       //console.log(doc);
});
};

server.prototype.findUserPreference = function(db, callback) {
var cursor =db.collection('user_preference').find({
   "username": username
} );
cursor.next(function(err, doc) {
  //assert.equal(err, null);
       callback(err,doc);
       //console.log(doc);
});
};

server.prototype.updateDetail = function(db, callback) {
db.collection('user_detail').updateOne(

   { "username" : username },
   { 
        $set: {"password": pwd, 
   		"first_name": fname,
   		"last_name": lname,
   		"address_line1": addrline1, 
   		"address_line2": addrline1,
   		"city": city, 
   		"state": state ,
   		"zip": zip,
   		"phone": phone}
   }, function(err, dbresult) {
   //assert.equal(err, null);
   callback(err,dbresult);
});
};

server.prototype.updatePreference = function(db, callback) {
db.collection('user_preference').updateOne(

   { "username" : username },
   { 
       $set: { "preference": preferences },
   }, function(err, dbresult) {
   //assert.equal(err, null);
   callback(err,dbresult);
});
};

server.prototype.removeUser = function(db, callback) {
db.collection('user_detail').deleteMany(
  { "username": username },
  function(err, dbresult) {
   //assert.equal(err, null);
   callback(err,dbresult);
});
};

server.prototype.removePreference = function(db, callback) {
db.collection('user_preference').deleteMany(
  { "username": username },
  function(err, dbresult) {
   //assert.equal(err, null);
   callback(err,dbresult);
});
};

//Client Session
app.use(session({
	cookieName: 'session',
	secret: 'random_string_goes_here',
	duration: 15 * 60 * 1000,
	activeDuration: 5 * 60 * 1000,
	ephemeral: true
}));


//Node Server
app.use(express.static(__dirname + "/"));


app.get('/', function (req, res) {
res.send('Hello World')
});

app.get('/bye', function (req, res) {
res.send('Leaving so soon?')
});


app.post('/newuser', function (req, res) {
	//var userHolder = req.params.username; // or req.params['username'];
	//Sample: http://localhost:3000/newuser?us=abc&pw=123&fn=abc&ln=def&adl1=st&adl2=st2&cty=Blr&ste=KA&zp=02115&ph=8579991577
	//var succObj = { key: "Status", value: "Inserted" };
	//var errObj = { key: "Status", value: "Could not insert, Dup found" };
	//var inserErrObj = { key: "Status", value: "Could not insert, other issue" };

	var succObj = { status: "success" };
	var errObj = { status: "error", message: "Could not insert, Dup found" };
	var inserErrObj = { status: "error", message: "Could not insert, other issue" };
	

	username=req.body.us;
	pwd=req.body.pw;
	fname=req.body.fn;
	lname=req.body.ln;
	addrline1=req.body.adl1;
	addrline2=req.body.adl2;
	city=req.body.cty;
	state=req.body.ste;
	zip=req.body.zp;
	phone=req.body.ph;

	console.log(req.body.us);
	console.log(req.body.pw);

	MongoClient.connect(url, function(err, db) {
	assert.equal(null, err);

	//var result3;
	insertUser(db, function(err,result2) {
	//console.log(result2);
	if(err){
		console.log(err);
		res.json(errObj);
	}
	else if(result2){
 		if(result2.result.n==1){
			res.json(succObj);
		}
		else{
			res.json(inserErrObj);
		}
	}
	else{

		res.json(errObj);
	}
 	db.close();
	});
});	

});

app.post('/newpref', function (req, res) {
	//var userHolder = req.params.username; // or req.params['username'];
	//Sample: http://localhost:3000/newpref?us=abc&pref=music,pubs,games
	// var succObj = { key: "Status", value: "Inserted" };
	// var errObj = { key: "Status", value: "Could not insert, Dup found" };
	// var inserErrObj = { key: "Status", value: "Could not insert, other issue" };

	var succObj = { status: "success" };
	var errObj = { status: "error", message: "Could not insert, Dup found" };
	var inserErrObj = { status: "error", message: "Could not insert, other issue" };
	

	username=req.body.us;
	preferences=req.body.pref;
	/*prefTemp=req.body.pref;

	preferences=prefTemp.split(",");*/

	console.log(req.body.us);
	console.log(preferences);

	MongoClient.connect(url, function(err, db) {
	assert.equal(null, err);
	
	insertPreference(db, function(err,result2) {
	//console.log(result2);
 	if(err){
		console.log(err);
		res.json(errObj);
	}
	else if(result2){
 		if(result2.result.n==1){
			res.json(succObj);
		}
		else{
			res.json(inserErrObj);
		}
	}
	else{

		res.json(errObj);
	}
 db.close();
	});
});	

});


app.post('/login', function (req, res) {
	//var userHolder = req.params.username; // or req.params['username'];
	//Sample: http://localhost:3000/login
	// var succObj = { key: "Status", value: "Found" };
	// var errObj = { key: "Status", value: "Username Not Found" };
	// var pwdErrObj = { key: "Status", value: "Username Found,Invalid password" };

	//var succObj = { status: "Success: Found" };
	var errObj = { status: "error", message: "Username Not Found" };
	var pwdErrObj = { status: "error", message: "Username Found, Invalid password" };
	
	//console.log("here");
	//console.log(req.body);

	username=req.body.email;
	pwd=req.body.pwd;

	// sets a cookie with the user's info
    req.session.user = username;

	console.log(req.body.email);
	console.log(req.body.pwd);

	MongoClient.connect(url, function(err, db) {
	assert.equal(null, err);
	
	findUser(db, function(err,result2) {
	
	if(err){
		console.log(err);
		res.json(errObj);
	}
	else if(result2){
 		if(result2.password==pwd){
			console.log("Matched");
			result2.status="success";
            
            findUserPreference(db, function(err,result3) {
	
                if(err){
                    console.log(err);
                    res.json(errObj);
                }
                else if(result3){
                    console.log("Prefes Matched");
                    result3.status="success";
                    
                    var merged_object = JSON.parse((JSON.stringify(result2) + JSON.stringify(result3)).replace(/}{/g,","));
                    
                    console.log(merged_object);
                    
                    res.json(merged_object);
    
                }
                else
                {
                    res.json(errObj);
                }
                db.close();
                });
            
		}else{
			console.log("Pwd Mismatch");
			res.json(pwdErrObj);
		}
	}
	else{

		res.json(errObj);
	}
	});
});	
	
});

app.post('/checkuserpref', function (req, res) {
	//var userHolder = req.params.username; // or req.params['username'];
	//Sample: http://localhost:3000/checkuserpref?us=abc
	// var succObj = { key: "Status", value: "Found" };
	// var errObj = { key: "Status", value: "Username Not Found" };
	//var pwdErrObj = { key: "Status", value: "Username Found,Invalid password" };

	//var succObj = { status: "Success: Found" };
	var errObj = { status: "error", message: "Username Not Found" };

	username=req.body.us;

	console.log(req.body.us);

	MongoClient.connect(url, function(err, db) {
	assert.equal(null, err);
	
	findUserPreference(db, function(err,result2) {
	
	if(err){
		console.log(err);
		res.json(errObj);
	}
	else if(result2){
 		console.log("Matched");
 		result2.status="success";
		res.json(result2);
	}
	else
	{
		res.json(errObj);
	}
	});
});	
	
});


app.post('/updateuser', function (req, res) {
	//var userHolder = req.params.username; // or req.params['username'];
	//Sample: http://localhost:3000/updateuser?us=abc&pw=123&fn=abc&ln=def&adl1=st&adl2=st2&cty=Blr&ste=KA&zp=02115&ph=8579991577
	//Make username non changeable

	// var succObj = { key: "Status", value: "Updated" };
	// var errObj = { key: "Status", value: "Could not update, user not found" };
	// var updErrObj = { key: "Status", value: "Could not update, other issue" };

	var succObj = { status: "success" };
	var errObj = { status: "error", message: "Could not update, user not found" };
	var updErrObj = { status: "error", message: "Could not update, other issue" };

	username=req.body.us;
	pwd=req.body.pw;
	fname=req.body.fn;
	lname=req.body.ln;
	addrline1=req.body.adl1;
	addrline2=req.body.adl2;
	city=req.body.cty;
	state=req.body.ste;
	zip=req.body.zp;
	phone=req.body.ph;

	console.log(req.body.us);
	//console.log(req.query.pw);

	if (req.session && req.session.user) { // Check if session exists

	MongoClient.connect(url, function(err, db) {
	assert.equal(null, err);

	//var result3;
	updateDetail(db, function(err,result2) {
	//console.log(result2);
	if(err){
		console.log(err);
		res.json(errObj);
	}
	else if(result2){
		console.log(result2);
		//if(result2.result.nModified==1){
			res.json(succObj);
		//}
		//else{
		//	res.json(errObj);
		//}
	}
	else{

		res.json(updErrObj);
	}
 	db.close();
	});
});	

	} else {
	res.redirect('/login.html');
		}

});

app.post('/updatepref', function (req, res) {
	//var userHolder = req.params.username; // or req.params['username'];
	//Sample: http://localhost:3000/updatepref?us=abc&pref=music,pubs,games
	//Make username non changeable

	// var succObj = { key: "Status", value: "Updated" };
	// var errObj = { key: "Status", value: "Could not update, user not found" };
	// var updErrObj = { key: "Status", value: "Could not update, other issue" };

	var succObj = { status: "success" };
	var errObj = { status: "error", message: "Could not update, user not found" };
	var updErrObj = { status: "error", message: "Could not update, other issue" };

	username=req.body.us;
	preferences=req.body.pref;
	
	console.log(req.query.us);
	console.log(preferences);

	if (req.session && req.session.user) { // Check if session exists

	MongoClient.connect(url, function(err, db) {
	assert.equal(null, err);

	//var result3;
	updatePreference(db, function(err,result2) {
	//console.log(result2);
	if(err){
		//console.log(err);
		res.json(errObj);
	}
	else if(result2){
		console.log(result2);
		if(result2.result.nModified==1){
			//res.json(succObj);
			console.log("Modified successfully")
			findUser(db, function(err,result2) {
	
				if(err){
					//console.log(err);
					res.json(errObj);
				}
				else if(result2){
					//if(result2.password==pwd){
			//console.log("Matched");
			result2.status="success";
            
            findUserPreference(db, function(err,result3) {
	
                if(err){
                    console.log(err);
                    res.json(errObj);
                }
                else if(result3){
                    console.log("Prefes Matched");
                    result3.status="success";
                    
                    var merged_object = JSON.parse((JSON.stringify(result2) + JSON.stringify(result3)).replace(/}{/g,","));
                    
                    console.log(merged_object);
                    
                    res.json(merged_object);
    
                }
                else
                {
                    res.json(errObj);
                }
                //db.close();
                });
            
		//}else{
			//console.log("Pwd Mismatch");
			//res.json(updErrObj);
		//}
	}
	else{

		res.json(errObj);
	}
	});
		}
		else{
			res.json(errObj);
		}
	}
	else{

		res.json(updErrObj);
	}
 	db.close();
	});
});	

	} else {
	res.redirect('/login.html');
		}

});

app.get('/removeuser', function (req, res) {
	//var userHolder = req.params.username; // or req.params['username'];
	//Sample: http://localhost:3000/removeuser?us=abc
	//Make username non changeable

	// var succObj = { key: "Status", value: "Removed" };
	// var errObj = { key: "Status", value: "Could not remove, user not found" };
	// var remErrObj = { key: "Status", value: "Could not remove, other issue" };

	var succObj = { status: "success", message: "User Removed" };
	var errObj = { status: "error", message: "Could not remove, user not found" };
	var remErrObj = { status: "error", message: "Could not remove, other issue" };

	username=req.query.us;
	

	MongoClient.connect(url, function(err, db) {
	assert.equal(null, err);

	//var result3;
	removeUser(db, function(err,result2) {
	//console.log(result2);
	if(err){
		console.log(err);
		res.json(errObj);
	}
	else if(result2){
		console.log(result2);
		if(result2.result.n==1){
			res.json(succObj);
		}
		else{
			res.json(errObj);
		}
	}
	else{

		res.json(remErrObj);
	}
 	db.close();
	});
});	

});

app.get('/removepref', function (req, res) {
	//var userHolder = req.params.username; // or req.params['username'];
	//Sample: http://localhost:3000/removepref?us=abc
	//Make username non changeable

	// var succObj = { key: "Status", value: "Removed" };
	// var errObj = { key: "Status", value: "Could not remove, user not found" };
	// var remErrObj = { key: "Status", value: "Could not remove, other issue" };

	var succObj = { status: "success", message: "Preference removed" };
	var errObj = { status: "error", message: "Could not remove, user not found" };
	var remErrObj = { status: "error", message: "Could not remove, other issue" };
	
	username=req.query.us;
	
	MongoClient.connect(url, function(err, db) {
	assert.equal(null, err);

	//var result3;
	removePreference(db, function(err,result2) {
	//console.log(result2);
	if(err){
		console.log(err);
		res.json(errObj);
	}
	else if(result2){
		console.log(result2);
		if(result2.result.n==1){
			res.json(succObj);
		}
		else{
			res.json(errObj);
		}
	}
	else{

		res.json(remErrObj);
	}
 	db.close();
	});
});	

});

app.get('/logout', function(req, res) {
	//Sample: http://localhost:3000/logout
	res.json({ status: "success", message: "User session ended" });
});

app.listen(3000,function(){
	console.log("Running on 3000");
});