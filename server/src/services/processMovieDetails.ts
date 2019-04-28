'use struct';
// Import necessary libraries

import * as  request from 'request-promise';
import ProcessMovies from './processMovies';

// Function for filtering movie details
const returnFields = ({ Price }) => ({ Price });

// Class for processing movie details
export default class ProcessMovieNames extends ProcessMovies {

  constructor(
    accessToken = '',
    baseURL = '',
    cinemas = [],
    timeout = 500,
    ){
    super(accessToken, baseURL, cinemas, timeout);
  }

  /*
    Function for fetching movie details from the API
    The function takes the name of a cinema and movie ID
    The function returns a json string with movie details
  */
  private getMovieDetails(cinema: string, id: string){
    return request({
      method: 'GET',
      uri: `${this.baseURL}/${cinema}/movie/${id}`,
      headers: {
        'x-access-token': this.accessToken
      },
      timeout: this.timeout
    })
  }

  /*
    Async function for fetching and formatting movie details
    The function takes a object of the following form
    {
      <Cinema Name>: <Movie ID>
    }
    The function returns a promise of json object of the following format
    {
      "cinemas": {
          <Cinema Name>: {
              "Price": <Movie Price>
          },
      },
      "code": <Code for Client app to check error status>
    }
  */
  generateMovieDetails = async (body): Promise<Object> => {
    try{
      let result = {};
      // Get all the cinema names from the argument
      const cinemasAvailable = Object.keys(body)
      // Make a GET request for each one of the cinemas
      const returnedPromise = cinemasAvailable.map(cinema => this.getMovieDetails(cinema, body[cinema]))
      // Wait for the promises to be resolved
      const results = await Promise.all(returnedPromise);

      // Update the cache and format movie details
      cinemasAvailable.forEach((cinema, index) => {
        const temp = returnFields(JSON.parse(results[index]));
        const id = body[cinema];
        if(cinema in this._cache)
          this._cache[cinema][id] = temp;
        else{
          this._cache[cinema] = {};
          this._cache[cinema][id] = temp;
        }
        result[cinema] = temp;
      })
      // Send a code of 0
      const code = 0;
      return {cinemas: result, code}
    }catch(err) {
      // If there is an error check the reason behind the error
      let log = '';
      // Get all the cinema names from the argument
      const cinemasAvailable = Object.keys(body)
      // If its a server side error
      if(err.name == 'StatusCodeError')
        log = err.statusCode;
      // If its a timeout error
      else if(err.name == 'RequestError' && err.message.includes('ESOCKETTIMEDOUT'))
        log = err.message;
      // For any other error throw an error and let the next function deal with it
      else{
        console.log(err)
        throw new Error(err);
      }

      let result = {};
      // If the cache is empty then send a code of 3 else set code to 2
      if(Object.entries(this._cache).length !== this.cinemas.length){
        result = {code: 3};
      }
      // IF the cache is not empty then get the data from the cache
      else if(cinemasAvailable.every(cinema => body[cinema] in this._cache[cinema])){
        cinemasAvailable.forEach(cinema => result[cinema] = this._cache[cinema][body[cinema]] )
        result = {cinemas: result, code: 2}
      }
      else{
        result = {code: 3};
      }
      return result; // Reply with the result object
    }
  }
}


