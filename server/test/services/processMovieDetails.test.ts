// Script for unit testing ProcessMovieDetails class
'use struct';
// Import necessary libraries
import * as chai from 'chai';
import * as nock from 'nock';
import * as dotenv from 'dotenv';
import ProcessMovieDetails from "../../src/services/processMovieDetails"

// Use expect from chai for assertion
const expect = chai.expect;
// Mock data for the test
const returnData = {
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

// Initialise dotenv
const result = dotenv.config()
if (result.error) {
  console.log(result.error)
}
// Test ProcessMovieNames class
describe("Test ProcessMovieNames class", function(){
  // Initialise the unit under test
  const processMovieDetails = new ProcessMovieDetails()
  .setAccessToken(process.env.accessToken)
  .setBaseURL('http://webjetapitest.azurewebsites.net/api')
  .SetCinemas(['filmworld'])
  .SetTimeout(1000)
  // Initialise the mock server
  before(function(){
    nock('http://webjetapitest.azurewebsites.net/api')
    .get('/filmworld/movie/fw0076759')
    .socketDelay(3000)
    .reply(200, returnData);
  })

  it('should return a code of 3', async function  () {

    // Compare the result
    const result = await processMovieDetails.generateMovieDetails({"filmworld": "fw0076759"});
    // console.log(result)
    expect(result['code']).to.be.equal(3)
  });
  // Initialise the mock server
  before(function(){
    nock('http://webjetapitest.azurewebsites.net/api')
    .get('/filmworld/movie/fw0076759')
    .reply(200, returnData);
  })

  it('should return the the movie price for filmworld with a code of 0', async function  () {
    // Compare the result
    const result = await processMovieDetails.generateMovieDetails({"filmworld": "fw0076759"});
    expect(result['cinemas']).to.deep.equal(
      {
        "filmworld": {
            "Price": "29.5"
        }
    })
    expect(result['code']).to.be.equal(0)
  });
  // Initialise the mock server
  before(function(){
    nock('http://webjetapitest.azurewebsites.net/api')
    .get('/filmworld/movie/fw0076759')
    .socketDelay(3000)
    .reply(200, returnData);
  });

  it('should return a code of 2 and the movie price for filmworld', async function  () {

    // Compare the result
    const result = await processMovieDetails.generateMovieDetails({"filmworld": "fw0076759"});
    expect(result['cinemas']).to.deep.equal(
      {
        "filmworld": {
            "Price": "29.5"
        }
    })
    expect(result['code']).to.be.equal(2)
  });

});
