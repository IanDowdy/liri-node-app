# liri-node-app
A simple app through node.js that allows you to easily search for upcoming concerts by chosen artists,
search specific songs through Spotify, search for information about specific movies, and a weird button that took 
a while to get functioning properly.

>"easily search"
_____________________________________________________________________________________________________________________
## Operation

When using node on your terminal:

__**node liri {typeOfSearch} {userInput}**__

### {typeOfSearch}
Located at **process.argv[2]**, this position should be filled by one of the **four** available options:

* spotify-this-song
* concert-this
* movie-this
* do-what-it-says

Type as-is with no curly brackets.
_____________________________________________________________________________________________________________________

### {userInput}
Located at **process.argv[3]**, this position by the custom input relevant to the type of search. __It is important to note that when searching for items longer than one word you must encapsulate the words in quotations.__ The following are examples demonstrate potential searches in each category:

## EX 1
__node liri spotify-this-song "a faint illusion"__

## EX 2
__node liri concert-this muse__

## EX 3
__node liri movie-this "no country for Old men"__

## EX 4 
__node liri do-what-it-says__

___________________________________________________________________________________________________________________________________

...and that's it!!
__node__ and __liri__ will always be the same, the third slot has four options, and the user input section will contain the thing it is you want to search.






