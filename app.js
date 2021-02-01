const express = require('express');
const bodyParser = require('body-parser')
const session = require ('express-session');

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('shoeChecker.db');

const {body, validationResult} = require('express-validator');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const bcrypt = require('bcrypt');
const saltRounds = 10;

const app = express();
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static(__dirname + "/public"));


app.use(session({
  secret: 'SomeLongStringThatIHaveJustTyped',
  resave: false,
  saveUninitialized: false,
}))
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(
  function(username, password, done) {

    const query = db.prepare('SELECT staff_id, password FROM users WHERE staff_id = $1;');
    query.get(username, function(err, row){
      if (err) { return done(err); }
      if (!row) { return done(null, false, { message: 'User Not Found '}); }
      bcrypt.compare(password, row.password, function(err, result){
        if (result==true){
          done(null, { username: row.staff_id });
        }
        else {
          return done(null, false, {message: "Incorrect Password"});
      
        }
      })
    })
  }
));

passport.serializeUser(function(user, done){
  return done(null, user.username);
});
passport.deserializeUser(function(username, done){
  const query = db.prepare('Select staff_id FROM users WHERE staff_id = $1;');
  query.get(username, function(err, row){
    if (!row) {
      return done(null, false);
    }
    return done(null, row);
  });
});

//-------------------SQL Statements----------------------------
const checkbrand = "select * from products where product_brand = $2;";
const checksize = "select * from products where product_size = $2;";
const checkid = "select * from products where product_id = $2;";
const addnewuser = 'Insert INTO users (staff_name, staff_email, password) values ($1, $2, $3);';
const checkuser = 'select staff_id, staff_name from users where staff_name = $1;';
const checkproduct = "select product_brand, product_size, product_quantity from products where product_brand = $1 AND product_size = $2;";
const updateproduct = "UPDATE products SET product_quantity = $1 WHERE product_brand = $2 AND product_size = $3;";
const insertproduct = "Insert INTO products(product_brand, product_size, product_quantity) values($1, $2, $3);";
const updateuserpassword = 'UPDATE users set password = $1 WHERE staff_id = $2 ';
const findinguser= 'SELECT staff_id, password FROM users WHERE staff_id = $1;';
const findingstaff = "select * from users where staff_id = $1";
const deletestaff = "DELETE FROM users WHERE staff_id = $1;";
const aquery5 = "select staff_id, password from users where staff_id = $1"

app.listen(3000, function(){
  console.log('Server running on port 3000');
});

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.get('/productChecker', isAuthenticated(), function(req,res){
  res.sendFile(__dirname + '/productChecker.html');
});

app.get("/addingUser", isAuthenticated(), function(req, res) {
  res.sendFile(__dirname + "/adduser.html");
});

app.get("/addingProduct", isAuthenticated(), function(req, res) {
  res.sendFile(__dirname + "/addproduct.html");
});

app.get("/deletingUser", isAuthenticated(), function(req, res){
  res.sendFile(__dirname + "/deleteUser.html");
});

app.get("/updateUser", isAuthenticated(), function(req, res){
  res.sendFile(__dirname + "/updateuser.html");
})

app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

app.post('/insertDetails', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { 
      console.log(err);
      return next(err); 
    }
    if (!user) { 
      console.log(info);
      return res.redirect('/'); 
    }
    req.logIn(user, function(err) {
      if (err) { 
        console.log(err)
        return next(err); }

      return res.redirect('/productChecker');
      
    });
  })(req, res, next);
});

function isAuthenticated() {
  return function(req, res, next) {
      if (req.isAuthenticated()) {
          return next()
      }
      res.redirect('/');
  }
}

app.post('/insertDetails', [
  body('username').isLength({min: 1, max: 4}), 
  body('password').isLength({min: 5, max:15})
  ], 
  function(req, res){
    const validErrors = validationResult(req);
    if (!validErrors.isEmpty()){
      console.log(validErrors);
      res.status(400).json({errors: validErrors.array()});
    } else{
      const username = req.body.username;
      const password = req.body.password;
      console.log(`${username}, ${password}`);

      
      res.json({});
    }
  }
);

app.post('/productChecker', function(req, res){
  const validErrors = validationResult(req);
    if (!validErrors.isEmpty()){
      console.log(validErrors);
      res.status(400).json({errors: validErrors.array()});
    } 
    else{
        const search_by = req.body.search_by;
        const uservalue = req.body.uservalue;

        if (search_by == "Brand") {
          const product_brand = req.body.uservalue;
          const search = db.prepare(checkbrand);
          search.all(`${product_brand}`,function(error, rows) {
            if (error) {
              console.log(error);
              res.status(400).json(error);
            }  
            else {
              console.log(rows);
              res.status(200).json(rows);
            }
          });
        }
        
        if (search_by == "Size") {
            const product_size = req.body.uservalue;
            const search = db.prepare(checksize);
            search.all(`${product_size}`,function(error, rows) {
            if (error) {
              console.log(error);
              res.status(400).json(error);
            }  
            else {
              console.log(rows);
              res.status(200).json(rows);
            }
          });
        }

        if (search_by == "Id") {
          const product_id = req.body.uservalue;
          const search = db.prepare(checkid);
          search.all(`${product_id}`,function(error, rows) {
            if (error) {
              console.log(error);
              res.status(400).json(error);
            }  
            else {
              console.log(rows);
              res.status(200).json(rows);
            }
          });
        }
    
  }
});       

app.post('/adduser', [
  body('staff_name').isLength({min: 1, max: 50}),
  body('staff_email').isEmail(),
  body('password').isLength({min:5, max:15}),
  body('conf_password').isLength({min:5, max:15})
],function(req, res){

  const validErrors = validationResult(req);
  if (!validErrors.isEmpty()){
    console.log(validErrors);
    res.status(400).json({errors: validErrors.array()});
  }
  else {
    const staff_name = req.body.staff_name;
    const staff_email = req.body.staff_email;
    const password = req.body.password;
    const conf_password = req.body.conf_password;
    if(password == conf_password){
      bcrypt.hash(password, saltRounds, function(err, hash) {
        
        const insert = db.prepare(addnewuser);
        insert.run(staff_name, staff_email, hash);
        insert.finalize();
        console.log(`${staff_name}, ${staff_email}, ${password}, ${conf_password}`);
        
        const search = db.prepare(checkuser);
  
        search.all(`${staff_name}`, function(error, rowS) {
          if (error) {
            console.log(error);
            res.status(400).json(error);
          } else {
            
            console.log(rowS);
            res.status(200).json(rowS);
          }
        });
      })
    }
    else{
      console.log("Passwords are not the same");
    }
  }

}); 

app.post('/addProduct', [
  body('NewPName').isLength({min: 0, max: 50}),
  body('NewPSize').isFloat(),
  body('NewPQuan').isInt()

 ], function(req, res){
  const validErrors = validationResult(req);
  if (!validErrors.isEmpty()){
    console.log(validErrors);
    res.status(400).json({errors: validErrors.array()});
  }
  else {
    const NewPName = req.body.NewPName;
    const NewPSize = parseFloat(req.body.NewPSize);
    const NewPQuan = parseFloat(req.body.NewPQuan);

    const checkz = db.prepare(checkproduct);
    
    checkz.get(NewPName, NewPSize, function(errs, rows){
      if (errs){
        console.log(errs);
        res.status(400).json(errs);
      }
      else {
        if(rows){
          const quanx = rows.product_quantity + NewPQuan;
          console.log(quanx);

          const updateprod = db.prepare(updateproduct);
          updateprod.run(quanx, NewPName, NewPSize);
          updateprod.finalize(function(err, rows) {
            console.log(err);
          });
          console.log("Data updated");
          res.status(200).json({});
        }else{
          const insertprod = db.prepare(insertproduct);
          insertprod.run(NewPName, NewPSize, NewPQuan);
          insertprod.finalize();
          res.status(200).json({});
        }
      } 
    });
  }
});

app.post('/byeUser', [
  body('userID').isInt(),
  body('password').isLength({min:5, max:15})
  ], function(req, res){
  const userID = req.body.userID;
  const password = req.body.password;
  const check = db.prepare(aquery5);

  check.get(userID, function(errs, rows){
    if(errs){
      console.log(errs);
      res.status(400).json(errs);
    }
    else{
      if(rows){
        bcrypt.compare(password, rows.password, function(err, result){
          if (result==true){
          const query = db.prepare(deletestaff); 
          query.run(userID);
          query.finalize();
          res.status(200).json({});
          }else{
            res.status(400).json(err);
          }
        })
      }
      else{
        console.log("User doesn't exist");
        res.status(400).json(errs);
      }
    }
  })
});

app.post('/updatingUser', [
  body('userID').isInt(),
  body('password').isLength({min:5, max:15}),
  body('newpassword').isLength({min:5, max:15}),
  body('confnewpassword').isLength({min: 5, max:15})
  ], function(req, res){
  const userID = req.body.userID;
  const password = req.body.password;
  const newpassword = req.body.newpassword;
  const confnewpassword = req.body.confnewpassword;
  const check = db.prepare(findingstaff);
  check.get(userID, function(errs, rows){
    if(errs){
      console.log(errs);
      res.status(400).json(errs);
    }
    else{
      if(newpassword == confnewpassword){
        if(rows){
          const query = db.prepare(findinguser);
          query.get(userID, function(err, row){
            if (err) { return done(err); }
            if (!row) { return done(null, false, { message: 'User Not Found '}); }
            bcrypt.compare(password, row.password, function(err, result){
              if (result==true){
                bcrypt.hash(newpassword, saltRounds, function(err, hash) {
                  const update = db.prepare(updateuserpassword);
                  update.run(hash, userID);
                  update.finalize();
                  console.log("updated");
                  res.status(200).json({});
                })
              }
              else {
                return null, false, {message: "Incorrect Password"};
        
              }
            })
          })
        }
        else{
          console.log("User doesn't exist");
        }
      }else{
        console.log("Passwords not the same");
      }
    }
  })
});