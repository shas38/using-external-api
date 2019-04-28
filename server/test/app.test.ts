// Script for unit testing all the routes inside app.ts
"use strict"
import * as request from "supertest";
import * as nock from 'nock';
import server from "../src/app"


const returnGetfilmworldData = {
  "Movies": [
      {
          "Title": "Star Wars: Episode IV - A New Hope",
          "Year": "1977",
          "ID": "fw0076759",
          "Type": "movie",
          "Poster": "http://ia.media-imdb.com/images/M/MV5BOTIyMDY2NGQtOGJjNi00OTk4LWFhMDgtYmE3M2NiYzM0YTVmXkEyXkFqcGdeQXVyNTU1NTfwOTk@._V1_SX300.jpg"
      }

  ]
};

const returnGetcinemaworldData = {
  "Movies": [
      {
          "Title": "Star Wars: Episode IV - A New Hope",
          "Year": "1977",
          "ID": "fw0076759",
          "Type": "movie",
          "Poster": "http://ia.media-imdb.com/images/M/MV5BOTIyMDY2NGQtOGJjNi00OTk4LWFhMDgtYmE3M2NiYzM0YTVmXkEyXkFqcGdeQXVyNTU1NTfwOTk@._V1_SX300.jpg"
      }

  ]
};

const returnPostfilmworldData = {
  "Title": "Star Wars: Episode IV - A New Hope",
  "Year": "1977",
  "Rated": "PG",
  "Released": "25 May 1977",
  "Runtime": "121 min",
  "Genre": "Action, Adventure, Fantasy",
  "Director": "George Lucas",
  "Writer": "George Lucas",
  "Actors": "Mark Hamill, Harrison Ford, Carrie Fisher, Peter Cushing",
  "Plot": "Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a wookiee and two droids to save the galaxy from the Empire's world-destroying battle-station, while also attempting to rescue Princess Leia from the evil Darth Vader.",
  "Language": "English",
  "Country": "USA",
  "Poster": "http://ia.media-imdb.com/images/M/MV5BOTIyMDY2NGQtOGJjNi00OTk4LWFhMDgtYmE3M2NiYzM0YTVmXkEyXkFqcGdeQXVyNTU1NTfwOTk@._V1_SX300.jpg",
  "Metascore": "92",
  "Rating": "8.7",
  "Votes": "915,459",
  "ID": "fw0076759",
  "Type": "movie",
  "Price": "29.5"
};

const returnPostcinemaworlData = {
  "Title": "Star Wars: Episode IV - A New Hope",
  "Year": "1977",
  "Rated": "PG",
  "Released": "25 May 1977",
  "Runtime": "121 min",
  "Genre": "Action, Adventure, Fantasy",
  "Director": "George Lucas",
  "Writer": "George Lucas",
  "Actors": "Mark Hamill, Harrison Ford, Carrie Fisher, Peter Cushing",
  "Plot": "Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a wookiee and two droids to save the galaxy from the Empire's world-destroying battle-station, while also attempting to rescue Princess Leia from the evil Darth Vader.",
  "Language": "English",
  "Country": "USA",
  "Awards": "Won 6 Oscars. Another 48 wins & 28 nominations.",
  "Poster": "http://ia.media-imdb.com/images/M/MV5BOTIyMDY2NGQtOGJjNi00OTk4LWFhMDgtYmE3M2NiYzM0YTVmXkEyXkFqcGdeQXVyNTU1NTcwOTk@._V1_SX300.jpg",
  "Metascore": "92",
  "Rating": "8.7",
  "Votes": "915,459",
  "ID": "cw0076759",
  "Type": "movie",
  "Price": "123.5"
};

// Unit tests for testing all the endpoints
describe("Test all the routes in app.js", function(){

  afterEach(function () {
      server.close(); // Close the imported server after the unit tests are over so that the CI/CD pipeline can continue
  });
  // Unit test for testing root endpoint
  it("loads the home page", function(done){
      request(server).get("/")
      .expect(200)
      .expect(/Compare Movie Price/)
      .end(done) // Expect to find "Currency Annalyser" in the webpage and receive a status code of 200"
  })

  before(function(){
    nock('http://webjetapitest.azurewebsites.net/api')
    .get('/filmworld/movie/fw0076759')
    .reply(200, returnPostfilmworldData);

    nock('http://webjetapitest.azurewebsites.net/api')
    .get('/cinemaworld/movie/cw0076759')
    .reply(200, returnPostcinemaworlData);

  })

  it("returns the best possible buy and sell price for the given post data", function(done){
    request(server).post("/api/movie")
    .send({
      "filmworld": "fw0076759"
    })// Add arguments to the post body
    .expect(200)
    .expect(/filmworld/)
    .end(done) // Expect to find "BTC" in the return data and receive a status code of 200"
  })

  before(function(){
    nock('http://webjetapitest.azurewebsites.net/api')
    .get('/filmworld/movies')
    .reply(200, returnGetfilmworldData);

    nock('http://webjetapitest.azurewebsites.net/api')
    .get('/cinemaworld/movies')
    .reply(200, returnGetcinemaworldData);

  })


  it("returns all the currencies", function(done){
    request(server).get("/api/movies")
    .expect(200)
    .expect(/movies/)
    .end(done) // Expect to find "ETC" in the return data and receive a status code of 200"
  })
})
