// This file handles the /api/profits route
"use strict";
// Import necessary libraries
import * as express from "express";
import * as configs from "../../config";
import ProcessMovieNames from '../services/processMovieNames';
// Use the express router function to create a new route
const router = express.Router();
// Instantiate a new ProcessMovieNames class and set all the parameters
const config = configs[express().get('env')];
const processMovieNames = new ProcessMovieNames()
.setAccessToken(process.env.accessToken)
.setBaseURL(config['baseURL'])
.SetCinemas(config['cinemaList'])
.SetTimeout(config['timeout'])
/*
  GET route for retriving movie names
  This route does not take any arguments
  It returns an object of the following structure
  {
    "movies": {
        <Movie Name>: {
            <cinema name>: <Movie ID>,
        }
    },
    "code": <Code for Client app to check error status>
  }
*/
router.get('/', async (req, res, next) => {
  try{
    const result = await processMovieNames.generateMovieList();
    res.status(200).json(result);
  } catch(err) {
    // If there is an error then pass the error to the next function
    return next(err);
  }
})
// Export router as the default object
export default router;

