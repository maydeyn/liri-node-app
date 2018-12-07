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
      //=====CONCERTS=====
      case "concert":
        axios
          .get(
            "https://rest.bandsintown.com/artists/" +
              user.search +
              "/events?app_id=" +
              band
          )
          .then(function(bandRes) {
            console
              .log
              // "Venue: " + bandRes.data.keys(venue)
              // "\nLocation: " +
              // bandRes.data.venue.city +
              // ", " +
              // bandres.data.venue.country +
              // "\nDate: " +
              // bandRes.data.datetime.moment().format("MMM Do YY")
              ();
          });

        break;
      //=====SPOTIFY=====
      case "song":
        console.log("SONG");

        break;

      //=====MOVIES=====
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
              movieRes.data.Ratings[1] + // help
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
