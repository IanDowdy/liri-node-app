//--------------Required packages-------------//
require("dotenv").config();
let fs = require("fs")
let request = require("request");
var Spotify = require('node-spotify-api');
let keys = require('./keys.js')
let moment = require("moment");
const chalk = require("chalk");

//-----------------Spotify Search function------------------//
function spotifyThis(song) {
    let spotify = new Spotify(
        keys.spotify
    );

    //Function toggle, if the node has input, run the node, if the function
    //is called by the dowhatitsays function then the random.txt file is read.
    let nodeOrRandom = function () {
        if (process.argv[3]) {
            songName = process.argv[3];
        } else {
            songName = song;
        }
    }
    //nodeOrRandom is initialized, songName is initialized but noot given a value yet since 
    //it needs to be receptive to both node input and from it's own optional argument, which is where
    // that function comes into play.
    let songName;
    nodeOrRandom()

    spotify.search({
        type: "track",
        query: songName,
    }, function (err, data) {
        if (err) {
            return err;
        } else {
            console.log("\n____________________________\n");
            console.log(chalk.bgGreen("Artist: " + data.tracks.items[0].artists[0].name));
            console.log("\n____________________________\n");
            console.log(chalk.green("Song: " + data.tracks.items[0].name));
            console.log(chalk.green("Album: " + data.tracks.items[0].album.name));
            console.log(chalk.green("Preview Link: " + data.tracks.items[0].preview_url));
            console.log("\n____________________________\n");
        }


    }
    )
}

//------------Movie search function--------------//
function movieThis() {
    const queryUrl = "http://www.omdbapi.com/?t=" + process.argv[3] + "&y=&plot=short&apikey=trilogy";

    request(queryUrl, (err, response, body) => {
        if (err)
            return err;

        if (response.statusCode === 200) {
            let json = JSON.parse(body);


            console.log("");
            console.log(chalk.bgMagenta("The film is titled " + (json.Title)));
            console.log("\n__________________________________\n");
            console.log(chalk.magenta("It was released in " + json.Year));
            console.log(chalk.magenta("This film has a rating of: " + JSON.stringify(json.Ratings[1])));
            console.log(chalk.magenta("It was released in the " + json.Country));
            console.log(chalk.magenta("It is available in " + json.Language));
            console.log("\n__________________________________\n");
            console.log(chalk.magenta("Plot: " + json.Plot));
            console.log(chalk.magenta("The film stars " + json.Actors))

        }
    })
}

//-----------concert api search----------------------------//
function concertThis() {

    const queryUrl = "https://rest.bandsintown.com/artists/" + process.argv[3] + "/events?app_id=codingbootcamp";

    request(queryUrl, function (err, response, body) {
        if (err) {
            return err;
            console.log("no band here");
        }
        if (response.statusCode === 200) {
            json = JSON.parse(body);
            let info = json[0];
            if (info === undefined) {
                console.log(chalk.bold.red("I\'m sorry, I don\'t think this artist is playing anywhere soon."));
            } else {
                console.log("\n_____________________\n");
                console.log(chalk.bold.cyan("The venue will be " + info.venue.name + " in " + info.venue.city));
                console.log(chalk.green("It starts " + moment(info.datetime).format("MM/DD/YY")));
                console.log("\n_____________________\n");
            }

        } else {
            console.log("This artist doesn\'t appear to have any upcoming events!");
        }
    })
}

//-------Basically just reruns the spotify function again with a preset request---//
function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            console.log(error);
        }
        dataArr = data.split(",");
        spotifyThis(dataArr[1]);

    })
}
//-------------Function selector-------------//
var liri = process.argv[2];
switch (liri) {
    case 'spotify-this-song':
        //console.log('working!');
        spotifyThis();
        break;
    case 'concert-this':
        //console.log("concert switch statement!");
        concertThis();
        break;
    case 'movie-this':
        //console.log('movie this switch!');
        movieThis();
        break;
    case 'do-what-it-says':
        //console.log("do what it says switch!");
        doWhatItSays();
        break;
    default:
        console.log('Your options are as follows ... spotify-this-song, concert-this, movie-this, do-what-it-says');
}







