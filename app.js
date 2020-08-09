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
  const user = {
    Name: req.body.firstName + " " + req.body.lastName,
    Score: {
      mathsMarks: parseInt(req.body.mathsMarks),
      englishMarks: parseInt(req.body.englishMarks),
    },
  };
  // console.log(user);
  Users.push(user);
  //sort function
  Users.sort(function (a, b) {
    return ((b.Score.mathsMarks + b.Score.englishMarks)/2) - ((a.Score.mathsMarks + a.Score.englishMarks)/2)
  })
  res.redirect("/")
});



app.get("/display", function (req, res) {
  res.send(Users)
});



app.listen(3000, function () {
  console.log("Server has statrted on port 3000");
});
