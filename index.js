// import the express module
const express = require("express");
const fs = require("fs");
// create an express application
const app = express();
const path = require("path");
const getAllFiles = (request, response) => {
  response.sendFile(path.join(__dirname, "/files/8-18-2024, 12-03-26 AM.txt"));
};
const createFile = (request, response) => {
  //  logic goes here to get the current timestamp and format it
  // and make it as a file name and to be written in the file
  let current_date = new Date();
  let file_name = current_date
    .toLocaleString()
    .replaceAll("/", "-")
    .replaceAll(":", "-");

  // create a file in a folder called as files
  fs.writeFile(`files/${file_name}.txt`, current_date.toISOString(), () => {
    response.send(`${file_name}.txt created successfully`);
    console.log(`files/${file_name}.txt created successfully`);
  });
};
app.use(express.static("files"));
// use the express middleware for parsing json data
app.use(express.json());
// Define a route handler for the  "GET" request "/createFile"
app.get("/createFile", createFile);
// Define a route handler for the  "GET" request "/getAllFiles"
app.get("/getAllFiles", getAllFiles);
// start the server and listen on port 3000
app.listen(3000, () => {
  console.log(`Server running on port 3000 at http://127.0.0.1:3000`);
});
