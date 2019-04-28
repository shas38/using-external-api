// This file handles the /api/profits route
"use strict";
// Import necessary libraries
import * as express from "express";
import * as configs from "../../config";
import ProcessMovieDetails from '../services/processMovieDetails';
// Use the express router function to create a new route
const router = express.Router();
const config = configs[express().get('env')];
// Instantiate a new ProcessMovieDetails class and set all the parameters
const processMovieDetails = new ProcessMovieDetails()
.setAccessToken(process.env.accessToken)
.setBaseURL(config['baseURL'])
.SetCinemas(config['cinemaList'])
.SetTimeout(config['timeout'])
/*
  POST route for retriving movie price for different cinemas
  This route takse the a json object with keys as the cinema names and values as the movie ID's as the post body.
  It returns an object of the following structure
  {
    "cinemas": {
        <Cinema Name>: {
            "Price": <Movie Price>
        },
    },
    "code": <Code for Client app to check error status>
  }
*/
router.post('/', async (req, res, next) => {
  try{
    const result = await processMovieDetails.generateMovieDetails(req.body);
    res.status(200).json(result);
  } catch(err) {
    // If there is an error then pass the error to the next function
    return next(err);
  }
})



// Export router as the default object
export default router;
