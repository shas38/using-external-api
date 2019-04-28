'use struct';
// Import necessary libraries
import * as  request from 'request-promise';
import ProcessMovies from './processMovies';

// Class for processing movie names
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
    Function for fetching movie names from the API
    The function takes the name of a cinema
    The function returns a json string of the following format
    {
      "Movies": [
          {
              "Title": <Title>,
              "Year": <Year>,
              "ID": <ID>,
              "Type": <Type>,
              "Poster": <Poster>
          }
      ]
    }
  */
  private getMovies(cinema: string): any{
    return request({
      method: 'GET',
      uri: `${this.baseURL}/${cinema}/movies`,
      headers: {
        'x-access-token': this.accessToken
      },
      timeout: this.timeout
    })
  }

  /*
    Async function for fetching and formatting movie names
    The function does not take any argument
    The function returns a promise of json object of the following format
    {
      "movies": {
          <Movie Name>: {
              <cinema name>: <Movie ID>,
          }
      },
      "code": <Code for Client app to check error status>
    }
  */
  generateMovieList = async (): Promise<Object> => {
    try{
      let movies = {}
      // Make a GET request for each one of the cinemas
      const returnedPromise = this.cinemas.map(cinema => this.getMovies(cinema))
      // Wait for the promises to be resolved
      let results = await Promise.all(returnedPromise);
      // Foramt movie names and ID's
      this.cinemas.forEach((cinema, i)  => {
        JSON.parse(results[i])['Movies'].forEach(movie => {
          if(movie['Title'] in movies)
            movies[movie['Title']][cinema] = movie['ID']
          else{
            movies[movie['Title']] = {}
            movies[movie['Title']][cinema] = movie['ID']
          }
        })
      })
      // Add the movie names to the cache for later requests
      this._cache = movies
      // Send a code of 0
      const code = 0;
      return {movies, code};
    }catch(err) {
      // If there is an error check the reason behind the error
      let log = ''
      // If its a server side error
      if(err.name == 'StatusCodeError')
        log = err.statusCode
      // If its a timeout error
      else if(err.name == 'RequestError' && err.message.includes('ESOCKETTIMEDOUT'))
        log = err.message
      // For any other error throw an error and let the next function deal with it
      else{
        console.log(err)
        throw new Error(err);
      }
      // If the cache is empty then send a code of 3 else set code to 2
      let code = Object.entries(this._cache).length === 0  ? 3 : 2;
      return {movies: this._cache, code}; // Reply with the result object
    }
  }
}


