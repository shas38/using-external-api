// This file handles the root directory
"use strict";
// Import necessary libraries
import * as express from "express";
import * as path from "path";
// Use the express router function to create a new route
const router = express.Router();

/*
  GET route for fetching the index.html home page
  This route does not take any arguments
  It returns the index.html page
*/
router.get('/', (req, res, next) => {
  try{
    // Send the index.html file
    res.sendFile(path.join(__dirname, '../../public'));
  } catch(err) {
    // If there is an error then pass the error to the next function
    return next(err);
  }
})

// Export router as the default object
export default router;
