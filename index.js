const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
  var options = {
    url: "https://apiv2.bitcoinaverage.com/convert/global",
    method: "GET",
    qs: {
      from: req.body.crypto,
      to: req.body.fiat,
      amount: req.body.amount
    }
  };
  //   using npm request module because it is a simple way to make HTTP calls
  request(options, function(error, response, body) {
    var data = JSON.parse(body);
    var price = data.price;
    var currentDate = data.time;

    res.write("<p>The current date is " + currentDate + ".</p>");
    res.write(
      "<h1>The current price of " +
        req.body.amount +
        req.body.crypto +
        " is " +
        price +
        req.body.fiat +
        ".</h1>"
    );
    res.send();
  });
});

app.listen(3000, function() {
  console.log("Server is running on Port 3000.");
});
