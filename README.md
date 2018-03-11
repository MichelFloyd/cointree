### Cointree
A cryptocurrency treemap visualization built with [Meteor](https://www.meteor.com/) using the [pup boilerplate](http://cleverbeagle.com/pup), [react](https://reactjs.org/), and [D3js](https://d3js.org/).

This application demonstrates several useful patterns in Meteor including:
* polling a 3rd party HTTP endpoint for data [coinmarketcap](https://coinmarketcap.com)
* doing bulk mongodb inserts to avoid excessive refreshes on the client as cryptocurrency data is updated one currency at a time
* using D3 in combination with react

This project was inspired by one of the early financial industry examples of the treemap, the [map of the market](http://www.bewitched.com/marketmap.html) from smartmoney.com which regrettably isn't live anymore.

![cointreemap screenshot](cointreemap.png)
