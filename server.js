//depenencies 
var bodyparser = require("body-parser");
var mongoose = require("mongoose");
var logger = require("morgan");

//initialize express app
var express = require("express");
var app = express();

app.use(logger("dev"));
app.use(
    bodyparser.urlencoded({
        extended: false
    })
);

app.use(express.static(process.cwd() + "/public"));

//Require set up handlebars
var exphdbs = require("express-handlebars");
app.engine(
    "handlebars",
    exphdbs({
        defaultLayout: "main"
    })
);

app.set("view-engine", "handlebars");

//Connecting to Mongodb
//mongoose.connect("mongodb://localhost/scraped_news");
const MONGODB_URI =
    process.env.MONGODB_URI || "mongodb://localhost/scaper_news";
mongoose.connect(MONGODB_URI, { useNewUrlParserz: true });

var db= mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
    console.log("Connected to Mongoose");
});

var routes = require("./controller/controller.js");
app.use("/", routes);
//Create localhost port
var port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log("Listening on PORT" + port);
});