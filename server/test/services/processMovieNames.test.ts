// Script for unit testing ProcessMovieNames class
'use struct';
// Import necessary libraries
import * as chai from 'chai';
import * as nock from 'nock';
import * as dotenv from 'dotenv';
import ProcessMovieNames from "../../src/services/processMovieNames"
// Use expect from chai for assertion
const expect = chai.expect;
// Mock data for the test
const returnData = {
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
// Initialise dotenv
const result = dotenv.config()
if (result.error) {
  console.log(result.error)
}
// Test ProcessMovieNames class
describe("Test ProcessMovieNames class", function(){
  // Initialise the unit under test
  const processMovieNames = new ProcessMovieNames()
  .setAccessToken(process.env.accessToken)
  .setBaseURL('http://webjetapitest.azurewebsites.net/api')
  .SetCinemas(['filmworld'])
  .SetTimeout(1000)
  // Initialise the mock server
  before(function(){
    nock('http://webjetapitest.azurewebsites.net/api')
    .get('/filmworld/movies')
    .socketDelay(2000)
    .reply(200, returnData);
  })

  it('should return a code of 3', async function  () {

    // Compare the result
    const result = await processMovieNames.generateMovieList();
    expect(result['code']).to.be.equal(3)
  });
  // Initialise the mock server
  before(function(){
    nock('http://webjetapitest.azurewebsites.net/api')
    .get('/filmworld/movies')
    .reply(200, returnData);
  })

  it('should return the the available movies for filmworld with a code of 0', async function  () {

    // Compare the result
    const result = await processMovieNames.generateMovieList();
    expect(result['movies']).to.deep.equal(
      {
        "Star Wars: Episode IV - A New Hope": {
            "filmworld": "fw0076759"
        }
      })
    expect(result['code']).to.be.equal(0)
  });

  // Initialise the mock server
  before(function(){
    nock('http://webjetapitest.azurewebsites.net/api')
    .get('/filmworld/movies')
    .socketDelay(2000) // 2 seconds
    .reply(200, returnData);
  });

  it('should return a code of 2 and the the available movies', async function  () {
    // Compare the result
    const result = await processMovieNames.generateMovieList();
    expect(result['movies']).to.deep.equal(
      {
        "Star Wars: Episode IV - A New Hope": {
            "filmworld": "fw0076759"
        }
      })
    expect(result['code']).to.be.equal(2)

  });
});
