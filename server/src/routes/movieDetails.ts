// This file handles the /api/profits route
"use strict";
// Import necessary libraries
import * as express from "express";
import ProcessMovieDetails from '../services/processMovieDetails';
// Use the express router function to create a new route
const router = express.Router();
const timeout = 2000;
/*
  Post route for retriving the best possible buy and sell price for the given data
  This route takse the interval fromDate and toDate as well as a list of currencies as the post body.
  It returns an object of the following structure
  {
    <CurrencyName>:
    {
      buy: {date: <Date of the best price>, time: '<Time of the best buy price>', price: <The price of the currency>},
      sell: {date: <Date of the best sell>, time: '<Time of the best buy sell>', price: <The price of the currency>},
      profit: <The actul profit made>
    }
  }
*/
const processMovieDetails = new ProcessMovieDetails()
.setAccessToken('sjd1HfkjU83ksdsm3802k')
.setBaseURL('http://webjetapitest.azurewebsites.net/api')
.SetCinemas(['cinemaworld', 'filmworld'])
.SetTimeout(timeout)

router.post('/', async (req, res, next) => {
  try{
    const result = await processMovieDetails.generateMovieDetails(req.body);
    // console.log(name)
    res.status(200).json(result);
  } catch(err) {
    console.log(err.statusCode)
    console.log(err)
    // If there is an error then pass the error to the next function
    return next(err);
  }
})



// Export router as the default object
export default router;
