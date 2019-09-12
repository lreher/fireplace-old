var fastn = require("fastn")(require('fastn/domComponents')())
var app = require("./app")(fastn)
var ui = require("./ui")(fastn, app)
