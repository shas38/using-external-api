'use struct';
// Import necessary libraries

import * as  request from 'request-promise';
import ProcessMovies from './processMovies';


export default class ProcessMovieNames extends ProcessMovies {

  // Initialise currencies and path
  constructor(
    accessToken = '',
    baseURL = '',
    cinemas = [],
    timeout = 500,
    ){
    super(accessToken, baseURL, cinemas, timeout);
  }

  getMovies(cinema: string){
    return request({
      method: 'GET',
      uri: `${this.baseURL}/${cinema}/movies`,
      headers: {
        'x-access-token': this.accessToken
      },
      timeout: this.timeout
    })
  }

  generateMovieList = async (): Promise<Object> => {
    try{
      let movies = {}
      const returnedPromise = this.cinemas.map(cinema => this.getMovies(cinema))
      let results = await Promise.all(returnedPromise);
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
      this._cache = movies
      const code = 0;
      return {movies, code};
    }catch(err) {
      let log = ''
      if(err.name == 'StatusCodeError')
        log = err.statusCode
      else if(err.name == 'RequestError' && err.message.includes('ESOCKETTIMEDOUT'))
        log = err.message
      else{
        console.log(err)
        throw new Error(err);
      }
      // console.log(log)

      let code = Object.entries(this._cache).length === 0  ? 3 : 2;
      return {movies: this._cache, code}; // Reply with the result object

    }
  }
}


