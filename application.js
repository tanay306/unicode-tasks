const express = require("express");
const bodyParser= require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

mongoose.connect("mongodb://localhost:27017/studentDB", {useNewUrlParser: true, useUnifiedTopology: true})
const studentsSchema = new mongoose.Schema ({
  Name: String,
  Score: {
    mathsMarks: Number,
    englishMarks: Number
  },
  Avg: Number
});
const Student = mongoose.model("Student", studentsSchema);
Student.find().sort({ Avg: -1 })
let Users = [];


app.get("/", function (req, res) {
  res.render("form");
});

app.post("/", function (req, res) {
  const Avgmarks = parseInt((parseInt(req.body.mathsMarks) + parseInt(req.body.englishMarks))/2)
  const newStudent = new Student({
    Name: req.body.firstName + " " + req.body.lastName,
    Score: {
      mathsMarks: parseInt(req.body.mathsMarks),
      englishMarks: parseInt(req.body.englishMarks),
    },
    Avg: Avgmarks
  });
  newStudent.save(function (err) {
    if (err) {
      console.log(err);
    } else {
      res.render("form");
      Users.push(newStudent)
    }
  });

});



app.get("/display", function (req, res) {
  let B = []
  var mysort = {Avg: -1 }
  Student.find().sort(mysort).exec(function (err, result) {
    if (err) {
      console.log(err);
    } else {
      result.forEach((i) => {
        var A = [{Name: i.Name, Score: i.Score}];
        A.forEach((j) => {
          B.push(j);
        });
      });
      res.send(B)
    }
  });

});



app.listen(3000, function () {
  console.log("Server has statrted on port 3000");
});
