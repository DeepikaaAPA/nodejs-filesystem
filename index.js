const fs = require("fs");

// import the express module
const express = require("express");

// create an express application
const app = express();

// use the express middleware for parsing json data
app.use(express.json());

// Define a route handler for the default "GET" request "/"
app.get("/createFile", (request, response) => {
  // your logic goes here to get the current timestamp and format it
  // and make it as a file name and the value to be written in the file
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
});

app.get("/getAllFiles", (request, response) => {
  const data = [];

  const directoryPath = "./files";

  // Use fs.readdir to read the contents of the directory asynchronously
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.error("Error reading directory:", err);
      response.send("Error reading directory");
      return;
    }

    console.log("Files and folders in the directory:", files);
    let fileContent = "";
    files.forEach((file) => {
      try {
        fileContent = fs.readFileSync(directoryPath + "\\" + file, "utf-8");
        console.log(`Contents of ${file}:`, fileContent);
        data.push({
          name: file,
          date: new Date(fileContent),
        });
      } catch (err) {
        console.error(`Error reading ${file}:`, err);
      }
    });
    // Sorting the array based on the 'date' property
    data.sort((a, b) => a.date - b.date);
    console.log(data);
    response.send(data);
  });
});

// start the server and listen on port 3001
app.listen(3001, () => {
  console.log(`Server running on port 3001 at http://127.0.0.1:3001`);
});
