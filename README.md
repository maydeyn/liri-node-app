# liri-node-app

## About Liri

LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a Language Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.

### How to use Liri

Users can use the following commands:

- `concert-this <artist/band name here>`

  - Name of the venue
  - Venue location
  - Date of the Event (use moment to format this as "MM/DD/YYYY")

- `spotify-this-song <song name here>`

  - Artist(s)
  - The song's name
  - A preview link of the song from Spotify
  - The album that the song is from

- `movie-this <movie name here>`
  - Title of the movie.
  - Year the movie came out.
  - IMDB Rating of the movie.
  - Rotten Tomatoes Rating of the movie.
  - Country where the movie was produced.
  - Language of the movie.
  - Plot of the movie.
  - Actors in the movie.

* `do-what-it-says`

### This app is supported by the following APIs:

- [OMDb API](http://www.omdbapi.com/)
- [Bandsintown](https://manager.bandsintown.com/support/bandsintown-api)
- [Spotify](https://developer.spotify.com/documentation/web-api/)

### This app contains the following packages:

- [axios](https://www.npmjs.com/package/axios)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [inquirer](https://www.npmjs.com/package/inquirer)
- [moment](https://www.npmjs.com/package/moment)
- [node-spotify-api](https://www.npmjs.com/package/node-spotify-api)
