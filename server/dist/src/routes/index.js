// This file handles the root directory
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Import necessary libraries
var express = require("express");
var path = require("path");
// Use the express router function to create a new route
var router = express.Router();
/*
  get route for fetching the index.html home page
  This route does not take any arguments
  It returns the index.html page
*/
router.get('/', function (req, res, next) {
    try {
        // Send the index.html file
        res.sendFile(path.join(__dirname, '../../client/build'));
    }
    catch (err) {
        // If there is an error then pass the error to the next function
        return next(err);
    }
});
// Export router as the default object
exports.default = router;
//# sourceMappingURL=index.js.map