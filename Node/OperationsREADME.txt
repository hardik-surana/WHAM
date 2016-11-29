README:

The Application:
	WHAM is a web application to search events around you according to your preferences. The application intends to provide the user a personal experience by storing his preferences in his profile. As the user is logged in the system, the application further provides him options to switch preferences and suit his mood. On the whole, the purpose is to help the user find what he/she likes.

The Technology:
Server:	The application is hosted using a NodeJS server runtime. The instructions on the usage are detailed below.
DataBase: The application uses Mongodb, a NoSQL database. All entries in this database are stored as record objects.
Front-End: The application is developed using Javascript on the Front-end, to build the user interface.
APIs: The application uses a set of Application Program Interfaces namely:
Google Maps: Provides map services based on the user's location.
Eventful: Provides the event details based on the location details.

--------------------------------------------------------
--------------------------------------------------------

Setup Instructions:
------------------

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
>mongo (This will start your mongodb server.)
>use CS5500 (<Schema name. Here CS5500>
>db.createCollection("user_detail")
>db.createCollection("user_preference")

Insert a dummy data in both the collecctions using following commands:
>db.user_detail.insert({"username" : "test_user"})
>db.user_preference.insert({"username" : "test_user"})

This commands asserts restrictions:
>db.user_detail.createIndex({"username" : 1}, {"unique":true})
>db.user_preference.createIndex({"username" : 1}, {"unique":true})

Remove the dummy data
>db.user_detail.remove({"username" : "test_user"})
>db.user_preference.remove({"username" : "test_user"})

>show dbs            (To see the available schemas)
>show collections    (To see the available collecctions)

Running the server:
Navigate to Node folder
node .\server.js

Open the web browse and navigate to the link: http://localhost:3000/index.html

----------------------------------------********************************-------------------------------------------
----------------------------------------********************************-------------------------------------------




