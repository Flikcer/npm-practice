const path = require("path");
const express = require("express");
const app = express();

const PORT = process.env.PORT || 8000;

//path to index upon url req to '/' and '/index.html' () and ? make the html optional
app.get("^/$|/index(.html)?", (req, res) => {
  try {
    //same thing as commented code but this allows for any type of pathing so it doesnt break wehn deploying to certain places or building
    res.status(200).sendFile(path.join(__dirname, "views", "index.html"));
    //res.status(200).sendFile("./views/index.html", { root: __dirname });
  } catch (err) {
    console.error(err);
  }
});

app.get("/new-page(.html)?", (req, res) => {
  try {
    res.status(200).sendFile(path.join(__dirname, "views", "new-page.html"));
  } catch (err) {
    console.error(err);
  }
});

app.get("/old-page(.html)?", (req, res) => {
  try {
    //dont have to use status here, will take it in as first param
    res.redirect(301, "/new-page.html");
  } catch (err) {
    console.error(err);
  }
});

app.get("/*", (req, res) => {
  //send to 404 with proper code
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

app.get(
  "/hello(.html)?",
  (req, res, next) => {
    console.log("attempted to load hello");
    //moves on to next expression
    next();
  },
  (req, res) => {
    res.send("Hello");
  }
);

// chaining route handlers
const one = (req, res, next) => {
  console.log("one");
  next();
};

const two = (req, res, next) => {
  console.log("two");
  next();
};

const three = (req, res) => {
  console.log("three");
  res.send("Finished!");
};

app.get("/chain(.html)?", [one, two, three]);

app.get("/*", (req, res) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
