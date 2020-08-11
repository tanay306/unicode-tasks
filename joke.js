const express = require("express");
const https = require("https");
const ejs = require("ejs");

const app = express();
app.set('view engine', 'ejs');

app.get("/", function (req, res) {
  //simple page to click button is enough to get the joke
  res.render("joke")
})

app.get("/joke", function (req, res) {
  // declaring const url of the api
  const url = "https://sv443.net/jokeapi/v2/joke/Any";
  //using https to get the api
  https.get(url, function (response) {
    //utf8 is set as it directly converts all the data in bytes into string
  response.setEncoding('utf8')
  var body = ""
  //setting the response from the api into empty string body
  response.on('data', function (foundData) {
    body += foundData;
  });
  //json parsing the body and declaring it as a variable
  response.on("end", function () {
    var jokes = JSON.parse(body);
    //displaying the joke according to its category, joke and joke_id
    res.write("<p>Category: " +jokes.category+ "<p>");
    //if joke has a type of twopart then it will display in Q-A format otherwise normal in joke format
    if (jokes.type === "twopart"){
      res.write("<p>Question: " +jokes.setup+ "<p>");
      res.write("<p>Answer: " +jokes.delivery+ "<p>");
    } else if (jokes.type === "single") {
      res.write("<p>Joke: " +jokes.joke+ "<p>");
    }
    res.write("<p>Id: " +jokes.id+ "<p>");
    //sending all the data that is recorded
    res.send();
  });
  //if err then log err
  response.on('error', console.error)
})
})


app.listen(3000, function () {
  console.log("Server has statrted on port 3000");
});
