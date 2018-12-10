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
            console.log("bye bye!");
            process.exit();
          } else if (user.command === "do-what-it-says") {
            doWhatItSays();
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
          doWhatItSays();
          break;
      }
    });
}

//do what it says
function doWhatItSays(searchTerm) {
  fs.readFile("random.txt", "utf8", function(error, data) {
    if (error) {
      return console.log(error);
    }
    console.log(data);
    process.exit();
  });
}

// bands in town concert
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
      }
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
      restartPrompt();
    });
}

function fetchSong(searchTerm) {
  if (!searchTerm) {
    searchTerm = "The Sign Ace of Base";
  }
  spotify.search({ type: "track", query: searchTerm, limit: 5 }, function(
    error,
    data
  ) {
    if (error) {
      return console.log("Error occurred: " + error);
    }
    var songRes = data.tracks.items;
    // for (var i = 0; i < songRes.length; i++) {
    console.log(
      "Artist(s): " +
        songRes[0].artists[0].name +
        "\nSong: " +
        songRes[0].name +
        "\nOpen in Spotify: " +
        songRes[0].external_urls.spotify +
        "\nAlbum: " +
        songRes[0].album.name +
        "\n============================"
    );
    // }
    restartPrompt();
  });
}

// omdb movies
function fetchMovie(searchTerm) {
  if (!searchTerm) {
    searchTerm = "Mr. Nobody";
    console.log(
      "If you haven't watched 'Mr. Nobody', then you should: http://www.imdb.com/title/tt0485947/" +
        "\nIt's on Netflix!"
    );
  }
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
          movieRes.data.Actors +
          "\n================================================"
      );

      restartPrompt();
    });
}

// asks user if they want to go back to main menu or exit after each search
function restartPrompt() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "Would you like to search for something else?",
        name: "resetOptions",
        choices: ["Yes, bring me back to the menu!", "No, exit."]
      }
    ])
    .then(function(resetPrompt) {
      if (resetPrompt.resetOptions === "Yes, bring me back to the menu!") {
        userPrompt();
      } else {
        console.log("bye bye!");
        process.exit();
      }
    });
}
userPrompt();
