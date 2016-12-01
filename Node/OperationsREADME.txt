The following installations are for local runs on a Windows Machine:

NodeJS Installation:

Download and Install Nodejs: https://nodejs.org/en/
Navigate to Node folder
npm install express
node .\server.js

Mongodb Installation:

Download and Install MongoDB: https://www.mongodb.org/downloads#production
Include the .exe in the environment variable PATH
Create a Data space directory, the location for the database.
Open a terminal and run the cmd: >mongod --dbpath <full path of dir>
Open another terminal instance and run the following cmds: 

mongo (This will start your mongodb server.)
use CS5200 (<Schema name. Here CS5200>

db.createCollection("Events")
db.createCollection("Person")
db.createCollection("Admin")
db.createCollection("Users")
db.createCollection("Attendees")

db.createCollection("counters")
db.counters.insert({_id:"personid",sequence_value:0})
db.counters.insert({_id:"eventid",sequence_value:0})

db.Events.insert({"_id" : "1"})
db.Person.insert({"_id" : "1"})

db.Events.createIndex({"_id" : 1}, {"unique":true})
db.Person.createIndex({"_id" : 1}, {"unique":true})

db.Events.remove({"_id" : "1"})
db.Person.remove({"_id" : "1"})

db.Person.insert({"email" : "abc@def.com"})
db.Person.createIndex({"email" : 1}, {"unique":true})
db.Person.remove({"email" : "abc@def.com"})

db.Person.insert({
"_id": 99999998,
"first_name": "Sudhanshu",
"last_name": "Joshi",
"email": "sudjoshi",
"phone": 1234567890,
"password": "qwerty",
"address_line1": "123 Abc Ave",
"address_line2": "Apt 2",
"city": "Boston",
"state": "MA",
"zipcode": "02115",
"is_admin": 1,
"is_enable": 1
})

db.Users.insert({
"_id": 99999998,
"preference": ["Music", "Food", "Art"]})

db.Users.insert({ "email": "sudjoshi", "preference": ["Music", "Food", "Art"]})

Running the server:
Navigate to Node folder
node .\server.js

Open the web browse and navigate to the link: http://localhost:3000/index.html
