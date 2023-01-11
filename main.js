const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const User = require("./models/Users");
const Car = require("./models/car");
const upload = require('multer');
const USer = require("./models/Users");
var path = require('path');
const PORT = 3000

const app = express()
// app.use(bodyParser.text({ type: '/' }));

app.use(bodyParser.urlencoded({ extended: true }));

//const uploaded = upload({ dest: 'uploads/' });




const storage = upload.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() +  path.extname(file.originalname));
  }
});

const uploaded = upload({ storage: storage }).single('image');




// Mongoose Connection Uri
const uri = "mongodb+srv://Hayat:Hayat123@carproject.ihmkroj.mongodb.net/?retryWrites=true&w=majority";

//Mongoose Connectivity
mongoose.set("strictQuery", false);
mongoose.connect(
  uri,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
).then((ressult) => {

});



app.post('/RegisterUser', uploaded, (req, res) => {

  var user = new User;
  user.Name = req.body.Name;
  user.Email = req.body.Email;
  user.Password = req.body.Password;
  user.UserName = req.body.UserName;
  console.log(user.UserName);
  User.find({ Email: req.body.Email }, function (err, dox) {
    if (err) {
      console.log("err");
    }
    else {
      console.log(dox.length);
      if (dox.length === 0) {
        user.save(function (err) {

          if (err) {

            res.send(JSON.stringify({ "Responce": "Failed" })); //TypeError: user.save is not a function

          }

          res.send(JSON.stringify({ "Responce": "Success" }));

        });
      }
      else {
        res.send(JSON.stringify({ "Responce": "Email already exsist" }));
      }

    }
  });


});
app.get('/GetTotalUsers',uploaded,(req,res)=>{
  
  var user=User.find();
  user.countDocuments().exec((err, count) => {
    if (err) {
        res.send(err);
        return;
    }

    res.json({ count: count });
});
})
app.get('/GetTotalCars',uploaded,(req,res)=>{
  
  var user=Car.find();
  user.countDocuments().exec((err, count) => {
    if (err) {
        res.send(err);
        return;
    }

    res.json({ count: count });
});
})
app.get('/GetImage', uploaded, (req, res) => {
  const Path =  req.query.Image;
  var resolvedPath = path.resolve(Path);
  console.log("kjbdfksjn");
  console.log(resolvedPath);
  res.sendFile(resolvedPath, function (err) {
    if (err) {
      console.log(err);
      res.status(404).end();
    } else {

      console.log('Sent:', path);
    }
  });
})

app.post('/SignIn', uploaded, (req, res) => {
  var user = new User;
  user.Email = req.body.Email;
  user.Password = req.body.Password;

  User.find({ Email: req.body.Email, Password: req.body.Password }, function (err, dox) {
    if (err) {
      console.log("err");
    }
    else {
      console.log(dox.length);
      if (dox.length === 0) {
        res.send(JSON.stringify({ "Responce": "Invalid Creditials" }));
      }
      else {
        res.send(JSON.stringify({ "Responce": "Congragulations" }));
      }

    }
  });


});


app.post('/GetImage', uploaded, function (req, res) {
  const Path =  req.body.image;
  console.log("kabjskj "+Path);
  var resolvedPath = path.resolve(Path);
  
  res.sendFile(resolvedPath, function (err) {
    if (err) {
      //console.log(err);
      res.status(404).end();
    } else {

      console.log('Sent:', path);
    }
  });
});


app.post('/AddCar', uploaded, (req, res) => {
  var car = new Car;
  car.model = req.body.model;
  car.make = req.body.make;
  car.New=req.body.New;
  car.registrationNo = req.body.RegistrationNo;
  car.color = req.body.color;
  car.categories = req.body.categories;
  console.log(car.categories);
  car.image = req.file.path;
  console.log(car.image);
  car.background = req.body.backgroundImage;
console.log('gfdhtdyh');
  //Image Upload
  uploaded(req, res, function (err) {
    if (err) {
      
      console.log(err);
    }
    else {
      console.log("Success");
    }
  });

  car.save(function (err) {

    if (err) {
      console.log("false");
      res.send(JSON.stringify({ "Responce": "Failed" })); //TypeError: user.save is not a function

    }
    else {
      console.log("true");

      res.send(JSON.stringify({ "Responce": "Success" }));
    }


  });
});

app.get('/getAllCars',uploaded,(req,res)=>{
  Car.find((err,users)=>{
    if(err){
      res.send(JSON.stringify({"Responce":"error"}));
    }
    else{
      res.send(JSON.stringify({"Responce":users}));
    }
  });
});
app.get('/fetchCarByModel', uploaded, (req, res) => {

  Car.findOne({ model: req.body.model }, function (err, doc) {
    if (err) {
      res.send({ "responce": "error" });
    }
    else {
      res.send({ "responce": doc });
    }
  });
});

app.post('/UpdateCarById', uploaded, (req, res) => {
  var car = new Car;
  car.model = req.body.model;
  car.make = req.body.make;
  car.registrationNo = req.body.RegistrationNo;
  car.color = req.body.color;
  car.categories = req.body.categories;
  car.image = req.file.path;
  car.background = req.body.backgroundImage;
  var id = req.body.id;
 
  Car.findByIdAndUpdate(req.body.id, { model: car.model, make: car.make, color: car.color, registrationNo: car.registrationNo, categories: car.categories, image: car.image, background: car.background }, function (err, doc) {
    if (err) {
      res.send({ "responce": "error" });
    }
    else {
      res.send({ "responce": "success" });
    }
  });

});



app.listen(PORT, "0.0.0.0", () =>
  console.log(`The Books API is running on: http://localhost:${PORT}.`)
)