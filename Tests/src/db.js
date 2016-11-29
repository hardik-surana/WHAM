var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/CS5500';

function insertUser (db, callback) {
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
       assert.equal(err, null);
       callback(dbresult);
   });
};

function insertPreference (db, callback) {
   db.collection('user_preference').insertOne({
       "username": username, 
       "preference": [
           preferences
       ]
   }, function(err, dbresult) {
       assert.equal(err, null);
       callback(dbresult);
   });
};

function findUser (db, callback) {
   var cursor =db.collection('user_detail').find({
       "username": username
   });
   cursor.each(function(err, doc) {
      assert.equal(err, null);
       if (doc != null) {
           console.dir(doc);
      }
        else {       
            callback(doc);
            console.log("no record found")
      }
   });
};

function findUserPreference (db, callback) {
   var cursor =db.collection('user_preference').find({
       "username": username
   } );
   cursor.each(function(err, doc) {
      assert.equal(err, null);
       if (doc != null) {
           console.dir(doc.preference);
      }
        else {       
            callback(doc);
            console.log("no record found")
      }
   });
};

function updateDetail (db, callback) {
   db.collection('user_detail').updateOne(

       { "username" : username },
       { 
           $set: { "zip": 12345 },
       }, function(err, dbresult) {
       assert.equal(err, null);
       callback(dbresult);
   });
};

function updatePreference (db, callback) {
   db.collection('user_preference').updateOne(

       { "username" : username },
       { 
           $set: { "preference": ["parks", "concerts"] },
       }, function(err, dbresult) {
       assert.equal(err, null);
       callback(dbresult);
   });
};

function removeUser (db, callback) {
   db.collection('user_detail').deleteMany(
      { "username": username },
      function(err, dbresult) {
       assert.equal(err, null);
       callback(dbresult);
   });
};

function removePreference (db, callback) {
   db.collection('user_preference').deleteMany(
      { "username": username },
      function(err, dbresult) {
       assert.equal(err, null);
       callback(dbresult);
   });
};

//MongoClient.connect(url, function(err, db) {
//  assert.equal(null, err);
//
//  removePreference(db, function() {
//      db.close();
//  });
//});

//MongoClient.connect(url, function(err, db) {
//  assert.equal(null, err);
//
//  updatePreference(db, function() {
//      db.close();
//  });
//});

//MongoClient.connect(url, function(err, db) {
//  assert.equal(null, err);
//
//  updateDetail(db, function() {
//      db.close();
//  });
//});

//MongoClient.connect(url, function(err, db) {
//  assert.equal(null, err);
//  findUser("bruce@mail.com", db, function() {
//      db.close();
//  });
//});

//MongoClient.connect(url, function(err, db) {
//  assert.equal(null, err);
//  findUserPreference("bruce_wayne@mail.com", db, function() {
//      db.close();
//  });
//});

//MongoClient.connect(url, function(err, db) {
//  assert.equal(null, err);
//  insertPreference(db, function() {
//      db.close();
//  });
//});

