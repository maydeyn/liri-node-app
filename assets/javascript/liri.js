// require packages and keys
require("dotenv").config();
var Spotify = require("node-spotify-api");
var axios = require("axios");
var moment = require("moment");
var inquirer = require("inquirer");
var keys = require("./keys");

var spotify = new Spotify(key.spotify);

// capture user input commands
var userCommand = process.argv[2];
switch (userCommand) {
  case "concert-this":
    console.log("concert");

    break;
  case "spotify-this-song":
    console.log("song");

    break;
  case "movie-this":
    console.log("movie");

    break;
  case "do-what-it-says":
    console.log("do what I say");
    break;

  default:
    console.log("please enter a command");
    break;
}
