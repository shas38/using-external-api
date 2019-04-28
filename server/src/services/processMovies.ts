'use struct';

// Parent class for processing the movie API
export default class ProcessMovies {
  accessToken: string;
  baseURL: string;
  cinemas: Array<string>;
  timeout: number;
  protected _cache: object;
  // Initialise instance variables
  constructor(
    accessToken = '',
    baseURL = '',
    cinemas = [],
    timeout = 500,
    ){
    this.baseURL = baseURL;
    this.cinemas = cinemas;
    this.accessToken = accessToken;
    this.timeout = timeout;
    this._cache = {};
  }

  // Setter for setting instance variables
  setAccessToken(accessToken: string): any{
    this.accessToken = accessToken;
    return this
  }

  setBaseURL(baseURL: string){
    this.baseURL = baseURL;
    return this
  }

  SetCinemas(cinemas: Array<string>){
    this.cinemas = cinemas;
    return this
  }

  SetTimeout(timeout: number){
    this.timeout = timeout;
    return this
  }

}


