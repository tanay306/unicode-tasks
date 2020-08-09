const express = require("express");
const https = require("https");
const ejs = require("ejs");

const app = express();
app.set('view engine', 'ejs');

app.get("/", function (req, res) {
  res.render("joke")
})

app.get("/joke", function (req, res) {
  const url = "https://sv443.net/jokeapi/v2/joke/Any";
  https.get(url, function (response) {
  response.setEncoding('utf8')
  var body = ""
  response.on('data', function (foundData) {
    body += foundData;
  });
  response.on("end", function () {
    var jokes = JSON.parse(body);
    res.write("<p>Category: " +jokes.category+ "<p>");
    if (jokes.type === "twopart"){
      res.write("<p>Question: " +jokes.setup+ "<p>");
      res.write("<p>Answer: " +jokes.delivery+ "<p>");
    } else if (jokes.type === "single") {
      res.write("<p>Joke: " +jokes.joke+ "<p>");
    }
    res.write("<p>Id: " +jokes.id+ "<p>");
    res.send()
  })
  response.on('error', console.error)
})
})


app.listen(3000, function () {
  console.log("Server has statrted on port 3000");
});
