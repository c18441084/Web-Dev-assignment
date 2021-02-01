Authors: Niall McNamara(c18441084) & Aaron Murphy(c18385706)

1. Deployment

To deploy this application, the following node modules are required:

express
body-parse
sqlite3
bcrypt
express-validator
express-session
passport
passport-local

Install all modules using the following command:

npm install express body-parser sqlite3 bcrypt express-validator express-session passport passport-local

2. Database

The SQLite database required for this application is is included in the zip file. The name of the database is shoeChecker.db. The database is populated to simulate usage of the application. 
The database file is set in the app.js right after requiring the sqlite3 module

To recreate the database from scratch there is an SQL file included in the Zip File

3. User and Password

The app has a user with Staff Id as ‘1’ and password as ‘password’. (Both without quotations).

4. Organisation and Structure 

The code is structured in the following way:

The main routes and configurations for the server, authentication and sessions are in the app.js file included in the zip file. The Javascript files to control the behaviour of the documents are located inside the public folder. Each JS file is named related to the page they are adding the desired behaviour. 

 

