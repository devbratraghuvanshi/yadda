"use strict";

var Yadda = require('yadda');
var English = Yadda.localisation.English;
var Dictionary = Yadda.Dictionary;
var assert = require('assert');
module.exports = (function() {

    var wall;
    var dictionary = new Dictionary().define('NUM', /(\d+)/);
    var library = English.library(dictionary)

    .given("$NUM green bottles are standing on the wall", function(number, next) {
        wall = new Wall(number);
        next();
    })
    .when("$NUM green bottle accidentally falls", function(number, next) {
        wall.fall(number);
        next();
    })
    .then("there are $NUM green bottles standing on the wall", function(number, next) {
        assert.equal(number, wall.bottles);
        next();
    });

    var Wall = function(bottles) {
        this.bottles = bottles;
        this.fall = function(n) {
            this.bottles -= n;
        };
    };

    return library;
})();
