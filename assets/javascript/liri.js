// require packages and files
require("dotenv").config();

var fs = require("fs");
var Spotify = require("node-spotify-api");
var axios = require("axios");
var moment = require("moment");
var inquirer = require("inquirer");
var keys = require("./keys");

// API keys
var spotify = new Spotify(keys.spotify);
var band = process.env.BAND_API_KEY;
var omdb = process.env.OMDB_API_KEY;

// User input
function userPrompt() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "command",
        message: "Pick a category: ",
        choices: ["concert", "song", "movie", "do-what-it-says", "exit"]
      },
      {
        when: function(user) {
          if (user.command === "exit") {
            process.exit();
          }
          if (user.command === "do-what-it-says") {
            return;
          }
        }
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
          fetchBand(user.search);
          break;

        case "song":
          fetchSong(user.search);
          break;

        case "movie":
          fetchMovie(user.search);
          break;

        case "do-what-it-says":
          doWhatItSays(user.search);
          return;
          break;
      }
    });
}

function doWhatItSays(searchTerm) {
  fs.readFile("random.txt", "utf8", function(error, data) {
    if (error) {
      return console.log(error);
    }
    console.log(data);
  });
}

function fetchBand(searchTerm) {
  axios
    .get(
      "https://rest.bandsintown.com/artists/" +
        searchTerm +
        "/events?app_id=" +
        band +
        "&date=upcoming"
    )
    .then(function(bandRes) {
      if (bandRes.data === "{warn=Not found}\n") {
        console.log("Not found");
        userPrompt();
      } else {
        for (var i = 0; i < bandRes.data.length; i++) {
          console.log(
            "Venue Name: " +
              bandRes.data[i].venue.name +
              "\nLocation: " +
              bandRes.data[i].venue.city +
              ", " +
              bandRes.data[i].venue.country +
              "\nDate: " +
              moment(bandRes.data[i].datetime).format("MM/DD/YYYY") +
              "\n============================"
          );
        }
        userPrompt();
      }
    })
    .catch(function(error) {
      console.log(error);
    });
}

function fetchSong(searchTerm) {
  spotify.search({ type: "track", query: searchTerm }, function(
    error,
    songRes
  ) {
    for (var i = 0; i < songRes.length; i++) {
      // console.log(
      //   "==============" +
      //     "\nArtist Name: " +
      //     songRes[i].artists.name +
      //     "\nSong: " +
      //     songRes[i].name +
      //     "\nOpen in Spotify: " +
      //     songRes[i].preview_url +
      //     "\nAlbum: " +
      //     songRes[i].album.name +
      //     "\n==============="
      // );
      if (error) {
        return console.log("Error occurred: " + error);
      }
    }
  });
}

function fetchMovie(searchTerm) {
  axios
    .get(
      "http://www.omdbapi.com/?t=" +
        searchTerm +
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
          movieRes.data.Ratings[1].Value +
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
}

function restart() {
  inquirer.prompt([{}]);
}
userPrompt();
