'use struct';
// Import necessary libraries

import * as  request from 'request-promise';
import ProcessMovies from './processMovies';

const returnFields = ({ Price }) => ({ Price });
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

  getMovieDetails(cinema: string, id: string){
    return request({
      method: 'GET',
      uri: `${this.baseURL}/${cinema}/movie/${id}`,
      headers: {
        'x-access-token': this.accessToken
      },
      timeout: this.timeout
    })
  }

  generateMovieDetails = async (body): Promise<Object> => {
    try{
      let result = {};
      const cinemasAvailable = Object.keys(body)
      const returnedPromise = cinemasAvailable.map(cinema => this.getMovieDetails(cinema, body[cinema]))
      const results = await Promise.all(returnedPromise);

      // const cinemaworldMovies = returnFields(JSON.parse(results[index]));
      // const filmworldMovies = returnFields(JSON.parse(results[1]));
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
      // console.log(this._cache)
      const code = 0;
      return {cinemas: result, code}

    }catch(err) {
      let log = '';
      const cinemasAvailable = Object.keys(body)
      if(err.name == 'StatusCodeError')
        log = err.statusCode;
      else if(err.name == 'RequestError' && err.message.includes('ESOCKETTIMEDOUT'))
        log = err.message;
      else{
        console.log(err)
        throw new Error(err);
      }

      let result = {};
      if(Object.entries(this._cache).length !== this.cinemas.length){
        result = {code: 3};
      }
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


