// require packages and keys
require("dotenv").config();
debugger;

var Spotify = require("node-spotify-api");
var axios = require("axios");
var moment = require("moment");
var inquirer = require("inquirer");
var keys = require("./keys");

// var spotify = new Spotify(keys.spotify);
var band = process.env.BAND_API_KEY;
var omdb = process.env.OMDB_API_KEY;

// capture user input commands
inquirer
  .prompt([
    {
      type: "list",
      name: "command",
      message: "Pick a category: ",
      choices: ["concert", "song", "movie", "do-what-it-says"]
    },
    {
      type: "input",
      name: "search",
      message: "Type what you would like to search: "
    }
  ])
  .then(function(user) {
    switch (user.command) {
      case "concert":
        var bandUrl = "";
        console.log(user.search);

        break;
      case "song":
        console.log("SONG");

        break;
      case "movie":
        axios
          .get(
            "http://www.omdbapi.com/?t=" +
              user.search +
              "&y=&plot=short&apikey=" +
              omdb
          )
          .then(function(movieRes) {
            console.log(
              "Title: " +
                movieRes.data.Title +
                "\nYear: " +
                movieRes.data.Year +
                "\nIMDB Rating: " +
                movieRes.data.imdbRating +
                "\nRotten Tomatoes Rating: " +
                movieRes.data.Ratings[1] +
                "\nCountry: " +
                movieRes.data.Country +
                "\nLanguage: " +
                movieRes.data.Language +
                "\nPlot: " +
                movieRes.data.Plot +
                "\nActors: " +
                movieRes.data.Actors
            );
          });
        break;
      case "do-what-it-says":
        console.log("do what I say");
        break;

      default:
        console.log("please enter a command!");
        break;
    }
  });
