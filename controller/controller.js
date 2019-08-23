var express = require("express");
var router = express.Router();
var path = require("path");

var request = require("request");
var cheerio = require("cheerio");

var Comment = require("../models/Comment.js");
var Article = require("../models/Article.js");

router.get("/scrape", function(req, res) {
    request("http://nytimes.com", function(error, response, html) {
        var $ = cheerio.load(html);
        var titleArray = [];

        $(".c-entry-box--compact__title").each(function(i, element) {
            var result = {};

            result.title = $(this)
                .children("a")
                .text();
            result.link = $(this)
            .children("a")
            .attr("href");a

        if (result.test !== "" && result.link !== "") {
            if (titlesArray.indexOf(result.title) == -1) {
                titlesArray.push(result.title);

                Article.count({ title: result.title }, function(error, test) {
                    if (test === 0 ) {
                        var entry = new Article(result);

                        entry.save(function(err, doc) {
                            if(err) {
                                console.log(err);
                                } else {
                                    console.log(doc);
                                }
                            });
                    }
                });
            } else {
                console.log("Article already exsists");
            }
        } else {
            console.log("Not saved to DB, missing data");
        }
        });
        res.redirect("/");
    });
});

router.get("/articles", function(req, res) {
    Article.find()
    .sort({ _id: -1 })
    .exec(function(err, doc) {
        if (err) {
            console.log(err);
        } else {
            res.json(doc);
        }
    });
});


        