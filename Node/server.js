/**
 * Created by Hardik on 11/29/2016.
 */

var express = require('express');
var app = express();


//Body-Parser
var bodyParser = require('body-parser');
var multer = require('multer'); // v1.0.5
var upload = multer(); // for parsing multipart/form-data

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


//Client Session
var session = require('client-sessions');

//Mongo part
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/CS5200';

//DB Functions
function getNextSequence(name) {
    var ret = db.counters.findAndModify(
        {
            query: { _id: name },
            update: { $inc: { seq: 1 } },
            new: true
        }
    );

    return ret.seq;
}

function getPersonId(email) {
    var myCursor =  db.collection("Person").find({
        email : email
    });

    var myDocument = myCursor.hasNext() ? myCursor.next() : null;

    if (myDocument) {
        var id = myDocument._id;
        print (tojson(id));
    }

    return id;
}

function insertPerson (db, callback) {
    db.collection('Person').insertOne({
        "_id": getNextSequence("personid"),
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
    db.collection('User').insertOne({
        "_id": getPersonId(email),
        "preference": preferences

    }, function(err, dbresult) {
        callback(err,dbresult);
    });
}



function findUser (db, callback) {
    var cursor =db.collection('Person').find({
        "email": email
    } );

    cursor.next(function(err, doc) {
        callback(err,doc);
    });
}

function findAllUser (db, callback) {
    var cursor =db.collection('Person').find();

    cursor.next(function(err, doc) {
        callback(err,doc);
    });
}

function findUserPreference (db, callback) {
    var cursor =db.collection('Users').find({
        "_id": getPersonId(email)
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

function updatePreference (db, callback) {
    db.collection('Users').updateOne(

        { "_id" : id },
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
        { "_id": id },
        function(err, dbresult) {
            callback(err,dbresult);
        });
}


///////////////////////////////////////////////////

function insertEvent(db, callback) {
    db.collection('Events').insertOne({
        "_id": getNextSequence("eventid"),
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
        "is_approved": 0

    }, function (err, dbresult) {
        callback(err, dbresult);
    });
}

function findEvent (db, callback) {
    var cursor =db.collection('Events').find({
        "city": city
    } );

    cursor.next(function(err, doc) {
        callback(err,doc);
    });
}

function findAllEvents(db, callback) {
    var cursor =db.collection('Events').find();

    cursor.next(function(err, doc) {
        callback(err,doc);
    });
}

function approveEvent (db, callback) {
    db.collection('Events').updateOne(

        { "_id" : id },
        {
            $set: { "is_approved": isapproved}
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
            }
            else if(result2){
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

    var errObj = { status: "error", message: "Username Not Found" };

    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);

        findAllUser(db, function(err,result2) {

            if(err){
                res.json(errObj);
            } else if(result2){
                result2.status="success";
            } else{
                res.json(errObj);
            }
        });
    });
});

app.post('/checkuserpref', function (req, res) {
    //Sample: http://localhost:3000/checkuserpref?us=abc

    var errObj = { status: "error", message: "Username Not Found" };

    id=req.body.id;

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
    isenable=req.body.isenable;


    if (req.session && req.session.user) { // Check if session exists

        MongoClient.connect(url, function(err, db) {
            assert.equal(null, err);

            updateDetail(db, function(err,result2) {
                if(err){
                    res.json(errObj);
                }
                else if(result2){
                    res.json(succObj);

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
    //Sample: http://localhost:3000/updatepref?us=abc&pref=music,pubs,games
    //Make username non changeable

    var succObj = { status: "success" };
    var errObj = { status: "error", message: "Could not update, user not found" };
    var updErrObj = { status: "error", message: "Could not update, other issue" };

    id=req.body.id;
    email=req.body.email;
    preferences=req.body.pref;


    if (req.session && req.session.user) { // Check if session exists

        MongoClient.connect(url, function(err, db) {
            assert.equal(null, err);

            updatePreference (db, function(err,result2) {
                if(err){
                    res.json(errObj);
                }
                else if(result2){
                    if(result2.result.nModified==1){
                        findUser(db, function(err,result2) {

                            if(err){
                                res.json(errObj);
                            }  else if(result2){
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
                                });
                            } else {

                                res.json(errObj);
                            }
                        });
                    } else {
                        res.json(errObj);
                    }
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

    email=req.query.email;

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

    id=req.query.id;

    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);

        deletePreference(db, function(err,result2) {
            if(err){
                res.json(errObj);
            }
            else if(result2){
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

/////////////////////////////////////

app.post('/addevent', function (req, res) {
    //Sample: http://localhost:3000/addevent

    var succObj = { status: "success" };
    var errObj = { status: "error", message: "Could not insert, Dup found" };
    var inserErrObj = { status: "error", message: "Could not insert, other issue" };


    name=req.body.name;
    desc=req.body.desc;
    date=req.body.date;
    time=req.body.time;
    tickets = req.body.tickets;
    adl1=req.body.adl1;
    adl2=req.body.adl2;
    city=req.body.cty;
    state=req.body.ste;
    zip=req.body.zp;
    lat=req.body.lat;
    lon=req.body.lon;


    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);

        insertEvent(db, function(err,result2) {
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


app.post('/findevents', function (req, res) {
    //Sample: http://localhost:3000/findevents?city=boston

    var errObj = { status: "error", message: "Username Not Found" };

    city=req.body.city;

    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);

        findEvent(db, function(err,result2) {

            if(err){
                res.json(errObj);
            } else if(result2){
                result2.status="success";
                res.json(result2);
            } else{
                res.json(errObj);
            }
        });
    });
});

app.post('/findallevents', function (req, res) {
    //Sample: http://localhost:3000/findallevents

    var errObj = { status: "error", message: "Event Not Found" };

    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);

        findAllEvents(db, function(err,result2) {

            if(err){
                res.json(errObj);
            } else if(result2){
                result2.status="success";
            } else{
                res.json(errObj);
            }
        });
    });
});

app.post('/approveevent', function (req, res) {
    //Sample: http://localhost:3000/approveevent
    //Make username non changeable

    var succObj = { status: "success" };
    var errObj = { status: "error", message: "Could not update, user not found" };
    var updErrObj = { status: "error", message: "Could not update, other issue" };

    isapproved=req.body.isapproved;

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
    //Make username non changeable

    var succObj = { status: "success", message: "User Removed" };
    var errObj = { status: "error", message: "Could not remove, user not found" };
    var remErrObj = { status: "error", message: "Could not remove, other issue" };

    id=req.query.id;

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

app.get('/logout', function(req, res) {
    res.json({ status: "success", message: "User session ended" });
});

app.listen(3000,function(){
});