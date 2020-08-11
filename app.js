const express = require("express");
const bodyParser= require("body-parser");
const ejs = require("ejs");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
let Users = [];

app.get("/", function (req, res) {
  res.render("form");
});


app.post("/", function (req, res) {
  //add new user
  const user = {
    Name: req.body.firstName + " " + req.body.lastName,
    Score: {
      Maths: parseInt(req.body.mathsMarks),
      English: parseInt(req.body.englishMarks),
    },
  };
  // console.log(user);
  //save user in user array
  Users.push(user);
  //sort function
  Users.sort(function (a, b) {
    return ((b.Score.Maths + b.Score.English)/2) - ((a.Score.Maths + a.Score.English)/2)
  })
  //redirect after sorting
  res.redirect("/")
});



app.get("/display", function (req, res) {
  //display sorted array of users
  res.send(Users)
});



app.listen(3000, function () {
  console.log("Server has statrted on port 3000");
});
