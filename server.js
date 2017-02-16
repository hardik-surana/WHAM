/*
 AUTHOR:     HARDIK SURANA & SUDHANSHU JOSHI
 FILE TYPE:  JAVASCRIPT
 DISCLAIMER: THIS CODE HAS BEEN DONE AS A PART OF DATABASE MANAGEMENT COURSE
 TERM:       FALL 2016
 PROFESSOR:  KENNETH BACKLWASKI
 UNIVERSITY: NORTHEASTERN UNIVERSITY, BOSTON
 */

var express = require('express');
var app = express();


//Body-Parser
var bodyParser = require('body-parser');
var multer = require('multer'); // v1.0.5

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


//Client Session
var session = require('client-sessions');

//Mongo part
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://localhost:27017/CS5200';

//DB Functions

function insertPerson (db, callback) {
    db.collection('Person').insertOne({
        "first_name": fname,
        "last_name": lname,
        "email": email,
        "phone": phone,
        "password": pwd,
        "address_line1": adl1,
        "address_line2": adl2,
        "city": city,
        "state": state,
        "zipcode": zip,
        "is_admin": 0,
        "is_enable": 1

    }, function(err, dbresult) {
        callback(err,dbresult);
    });
}


function insertPref (db, callback)  {
    db.collection('Users').insertOne({
        "email": email,
        "preference": preferences
    
    }, function(err, dbresult) {
        callback(err,dbresult);
    });
}



function findUser (db, callback) {
   
    var cursor =db.collection('Person').find({
        "email": email,
        "is_enable": 1

    } );
    cursor.next(function(err, doc) {
        callback(err,doc);
    });
}


function findUserPreference (db, callback) {
    
    var cursor =db.collection('Users').find({
        "email": email
    } );
    
    cursor.next(function(err, doc) {
        callback(err,doc);
    });
}

function updateDetail (db, callback) {
    db.collection('Person').updateOne(

        { "email" : email },
        {
            $set: {"first_name": fname,
                "last_name": lname,
                "phone": phone,
                "password": pwd,
                "address_line1": adl1,
                "address_line2": adl2,
                "city": city,
                "state": state,
                "zipcode": zip,
                "is_admin": isadmin,
                "is_enable": isenable}
        }, function(err, dbresult) {
            callback(err,dbresult);
        });
}


function updateaccess (db, callback) {
    db.collection('Person').updateOne(

        { "email" : email },
        {
            $set: { "is_enable": isenable }
        }, function(err, dbresult) {
            callback(err,dbresult);
        });
}

function updatePreference (db, callback) {
    db.collection('Users').updateOne(

        { "email" : email },
        {
            $set: { "preference": preferences }
        }, function(err, dbresult) {
            callback(err,dbresult);
        });
}

function deleteUser (db, callback) {
    db.collection('Person').deleteMany(
        { "email": email },
        function(err, dbresult) {
            callback(err,dbresult);
        });
}

function deletePreference (db, callback) {
    db.collection('Users').deleteMany(
        { "email": email },
        function(err, dbresult) {
            callback(err,dbresult);
        });
}


///////////////////////////////////////////////////

function insertEvent(db, callback) {

    db.collection('Events').insertOne({
        "_id": id,
        "name": name,
        "description": desc,
        "date": date,
        "time": time,
        "tickets": tickets,
        "address_line1": adl1,
        "address_line2": adl2,
        "city": city,
        "state": state,
        "zipcode": zip,
        "latitute": lat,
        "longitude": lon,
        "category": catlist,
        "is_approved": 0

    }, function (err, dbresult) {
        callback(err, dbresult);
    });
}

function eventDetails (db, callback) {
    var cursor =db.collection('Events').find({
        "_id": id
    } );
    cursor.next(function(err, doc) {
        callback(err,doc);
    });
}


function approveEvent (db, callback) {
    db.collection('Events').updateOne(

        { "_id" : id },
        {
            $set: { "is_approved": 1}
        }, function(err, dbresult) {
            callback(err,dbresult);
        });
}

function deleteEvent (db, callback) {
    db.collection('Events').deleteMany(
        { "_id": id },
        function(err, dbresult) {
            callback(err,dbresult);
        });
}

///////////////////////////////////

function addHost (db, callback) {

    db.collection('Host').insertOne({
        "user": email,
        "event": id


    }, function (err, dbresult) {
        callback(err, dbresult);
    });
}

function removeHost (db, callback) {
    db.collection('Host').deleteMany(
        { "event": id },
        function(err, dbresult) {
            callback(err,dbresult);
        });
}

function attending (db, callback) {

    db.collection('Attendance').insertOne({
        "user": email,
        "event": id

    }, function (err, dbresult) {
        callback(err, dbresult);
    });
}

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

app.post('/addperson', function (req, res) {
    //Sample: http://localhost:3000/addperson

    var succObj = { status: "success" };
    var errObj = { status: "error", message: "Could not insert, Dup found" };
    var inserErrObj = { status: "error", message: "Could not insert, other issue" };


    fname=req.body.fn;
    lname=req.body.ln;
    email=req.body.email;
    phone=req.body.ph;
    pwd = req.body.pw;
    adl1=req.body.adl1;
    adl2=req.body.adl2;
    city=req.body.cty;
    state=req.body.ste;
    zip=req.body.zp;

    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);

        insertPerson(db, function(err,result2) {
            if(err){
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

app.post('/addpref', function (req, res) {

    //Sample: http://localhost:3000/newpref

    var succObj = { status: "success" };
    var errObj = { status: "error", message: "Could not insert, Dup found" };
    var inserErrObj = { status: "error", message: "Could not insert, other issue" };


    email=req.body.email;
    preferences=req.body.pref;


    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);

        insertPref(db, function(err,result2) {
            if(err){
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
    //Sample: http://localhost:3000/login

    var errObj = { status: "error", message: "Username Not Found" };
    var pwdErrObj = { status: "error", message: "Username Found, Invalid password" };

    email=req.body.email;
    pwd=req.body.pwd;

    // sets a cookie with the user's info
    req.session.user = email;
	
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);

        findUser(db, function(err,result2) {

            if(err){
                res.json(errObj);
				
            } else if (result2){
                if(result2.password==pwd){
                    result2.status="success";
                    findUserPreference(db, function(err,result3) {

                        if(err){
                            res.json(errObj);
                        } else if(result3){
                            result3.status="success";

                            var merged_object = JSON.parse((JSON.stringify(result2) +
                            JSON.stringify(result3)).replace(/}{/g,","));
                        
                            res.json(merged_object);

                        } else {
                            res.json(errObj);
                        }
                        db.close();
                    });
                } else{
                    res.json(pwdErrObj);
                }
            } else{
                res.json(errObj);
            }
        });
    });
});

app.post('/findallusers', function (req, res) {
    //Sample: http://localhost:3000/findallusers

    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);

        db.collection('Person', function(err, collection) {
            collection.find().toArray(function(err, items) {
                res.json(items);
            });
        });
    });
});

app.post('/checkuserpref', function (req, res) {
    //Sample: http://localhost:3000/checkuserpref?us=abc

    var errObj = { status: "error", message: "Username Not Found" };

    email=req.body.email;

    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);

        findUserPreference(db, function(err,result2) {

            if(err){
                res.json(errObj);
            } else if(result2){
                result2.status="success";
                res.json(result2);
            } else{
                res.json(errObj);
            }
            db.close();
        });
    });
});

app.post('/updateuser', function (req, res) {
    //Sample: http://localhost:3000/updateuser
    //Make username non changeable

    var succObj = { status: "success" };
    var errObj = { status: "error", message: "Could not update, user not found" };
    var updErrObj = { status: "error", message: "Could not update, other issue" };

    email=req.body.email;
    fname=req.body.fn;
    lname=req.body.ln;
    email=req.body.email;
    phone=req.body.ph;
    pwd = req.body.pw;
    adl1=req.body.adl1;
    adl2=req.body.adl2;
    city=req.body.cty;
    state=req.body.ste;
    zip=req.body.zp;
    isadmin=req.body.isadmin;
    isenable=req.body.isenable;


    if (req.session && req.session.user) { // Check if session exists

        MongoClient.connect(url, function(err, db) {
            assert.equal(null, err);

            updateDetail(db, function(err,result2) {
                if(err){
                    res.json(errObj);
                } else if(result2){
                    res.json(succObj);

                } else{

                    res.json(updErrObj);
                }
                db.close();
            });
        });
    } else {
        res.redirect('/login.html');
    }

});

app.post('/updateaccess', function (req, res) {
    //Sample: http://localhost:3000/updateaccess

    var succObj = { status: "success" };
    var errObj = { status: "error", message: "Could not update, user not found" };
    var updErrObj = { status: "error", message: "Could not update, other issue" };

    email=req.body.email;
    isenable=req.body.isenable;

    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);

        updateaccess(db, function(err,result2) {
            if(err){
                res.json(errObj);
            } else if(result2){
                res.json(succObj);
            } else{
                res.json(updErrObj);
            }
            db.close();
        });
    });
});

app.post('/updatepref', function (req, res) {
    //Sample: http://localhost:3000/updatepref?us=abc&pref=music,pubs,games
    //Make username non changeable

    var succObj = { status: "success" };
    var errObj = { status: "error", message: "Could not update, user not found" };
    var updErrObj = { status: "error", message: "Could not update, other issue" };

    email=req.body.email;
    preferences=req.body.pref;

    if (req.session && req.session.user) { // Check if session exists

        MongoClient.connect(url, function(err, db) {
            assert.equal(null, err);

            updatePreference (db, function(err,result2) {
                if(err){
                    res.json(errObj);
                } else if(result2){
                    res.json(succObj);

                } else{
                    res.json(updErrObj);
                }
                db.close();
            });
        });
    } else {
        res.redirect('/login.html');
    }

});

app.post('/removeuser', function (req, res) {
    //Sample: http://localhost:3000/removeuser?email=
    //Make username non changeable

    var succObj = { status: "success", message: "User Removed" };
    var errObj = { status: "error", message: "Could not remove, user not found" };
    var remErrObj = { status: "error", message: "Could not remove, other issue" };

    email=req.body.email;

    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);

        deleteUser(db, function(err,result2) {
            if(err){
                res.json(errObj);
            }
            else if(result2){
                if(result2.result.n==1){
                    res.json(succObj);
                } else{
                    res.json(errObj);
                }
            } else{

                res.json(remErrObj);
            }
            db.close();
        });
    });

});

app.post('/removepref', function (req, res) {
    //Sample: http://localhost:3000/removepref?id=123
    //Make username non changeable

    var succObj = { status: "success", message: "Preference removed" };
    var errObj = { status: "error", message: "Could not remove, user not found" };
    var remErrObj = { status: "error", message: "Could not remove, other issue" };

    email=req.body.email;

    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);

        deletePreference(db, function(err,result2) {
            if(err){
                res.json(errObj);
            } else if(result2){
                if(result2.result.n==1){
                    res.json(succObj);
                } else{
                    res.json(errObj);
                }
            } else{
                res.json(remErrObj);
            }
            db.close();
        });
    });

});

/////////////////////////////////////

app.post('/addevent', function (req, res) {
    //Sample: http://localhost:3000/addevent

    var succObj = { status: "success" };
    var errObj = { status: "error", message: "Could not insert, Dup found" };

    var currentdate = new Date();
    var datetime = currentdate.getDate() + ""
        + (currentdate.getMonth()+1)  + ""
        + currentdate.getFullYear() + ""
        + currentdate.getHours() + ""
        + currentdate.getMinutes() + ""
        + currentdate.getSeconds();

    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);

        id = datetime;
        name=req.body.name;
        desc=req.body.desc;
        date=req.body.date;
        time=req.body.time;
        tickets = 'https://www.google.com';
        adl1=req.body.adl1;
        adl2=req.body.adl2;
        city=req.body.cty;
        state=req.body.ste;
        zip=req.body.zp;
        lat=0;
        lon=0;
        catlist=req.body.catlist;
        email=req.body.email;

        insertEvent(db, function (err, result2) {
            if (result2.result.n ==  1) {
                addHost (db, function(err, result3){
                    if (result3.result.n ==  1) {
                        res.json(succObj);                            
                    } else {
                       res.json(errObj);
                    }
                });
            } else {
                res.json(errObj);
            }
        });
    });
});


app.post('/findevents', function (req, res) {
    //Sample: http://localhost:3000/findevents?city=boston

    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);

        city = req.body.city;
        catlist=req.body.catlist;
        
        db.collection('Events', function(err, collection) {
            collection.find({
                "is_approved": 1,
                "city": city,
                "category": { $in: catlist}
            }).toArray(function(err, items) {
                res.json(items);
            });
        });
        
    });
});

app.post('/eventdetails', function (req, res) {
    //Sample: http://localhost:3000/eventdetails

    var errObj = { status: "error", message: "Event Not Found" };

    id=req.body.id;
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);

        eventDetails(db, function(err,result2) {

            if(err){
                res.json(errObj);
            } else if(result2){
                result2.status="success";
                res.json(result2);
            } else{
                res.json(errObj);
            }
            db.close();
        });
    });
});

app.post('/findallevents', function (req, res) {
    //Sample: http://localhost:3000/findallevents

    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);

        db.collection('Events', function(err, collection) {
            collection.find().toArray(function(err, items) {
                res.json(items);
            });
        });
    });
});

app.post('/approveevent', function (req, res) {
    //Sample: http://localhost:3000/approveevent
    //Make username non changeable

    var succObj = { status: "success" };
    var errObj = { status: "error", message: "Could not update, user not found" };
    var updErrObj = { status: "error", message: "Could not update, other issue" };

    id=req.body.id;

    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);

        approveEvent(db, function(err,result2) {
            if(err){
                res.json(errObj);
            } else if(result2){
                res.json(succObj);

            } else{

                res.json(updErrObj);
            }
            db.close();
        });
    });
});

app.post('/removeevent', function (req, res) {
    //Sample: http://localhost:3000/removeevent?id=123

    var succObj = { status: "success", message: "User Removed" };
    var errObj = { status: "error", message: "Could not remove, event not found" };
    var remErrObj = { status: "error", message: "Could not remove, other issue" };

    id=req.body.id;

    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);

        deleteEvent(db, function(err,result2) {
            if(err){
                res.json(errObj);
            } else if(result2){
                if(result2.result.n==1){
                    res.json(succObj);
                } else{
                    res.json(errObj);
                }
            } else{
                res.json(remErrObj);
            }
            db.close();
        });
    });
});


app.post('/finduserevents', function (req, res) {
    //Sample: http://localhost:3000/finduserevents

    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);

        email = req.body.email;

        db.collection('Host', function(err, collection) {
            collection.find({
                "user": email
            }).toArray(function(err, items) {
                res.json(items);
            });
        });
    });
});

app.post('/finduserevents2', function (req, res) {
    //Sample: http://localhost:3000/finduserevents

    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);

        email = req.body.email;

        var event_id = db.collection('Host').find({"user": email}).toArray();
        var aux = event_id["0"];
        var aux2 = aux.map(function (u) {
            return u.event;
        });

        db.collection('Events', function(err, collection) {
            collection.find({
                "user": {"$in" : aux2}
            }).toArray(function(err, items) {
                res.json(items);
            });
        });
    });
});


app.post('/removehost', function (req, res) {
    //Sample: http://localhost:3000/removehost?id=123

    var succObj = { status: "success", message: "User Removed" };
    var errObj = { status: "error", message: "Could not remove, event not found" };
    var remErrObj = { status: "error", message: "Could not remove, other issue" };

    id=req.body.id;

    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);

        removeHost(db, function(err,result2) {
            if(err){
                res.json(errObj);
            } else if(result2){

                if(result2.result.n==1){
                    res.json(succObj);
                } else{
                    res.json(errObj);
                }
            } else{

                res.json(remErrObj);
            }
            db.close();
        });
    });
});


app.post('/attending', function (req, res) {
    //Sample: http://localhost:3000/addevent

    var succObj = { status: "success" };
    var errObj = { status: "error", message: "Could not insert, Dup found" };

    email = req.body.email;
    id=req.body.id;

    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);

        attending(db, function (err, result2) {
            if (result2.result.n ==  1) {
                res.json(succObj);
            } else {
                res.json(errObj);
            }
        });
    });
});


process.on('uncaughtException', function (err) {
  console.log('Caught exception: ' + err);
});

app.get('/logout', function(req, res) {
    res.json({ status: "success", message: "User session ended" });
});

app.listen(3000,function(){
});

