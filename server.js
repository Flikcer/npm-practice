const path = require("path");
const express = require("express");
const app = express();

const PORT = process.env.PORT || 8000;

app.get("/", (req, res) => {
  try {
    //same thing as commented code but this allows for any type of pathing so it doesnt break wehn deploying to certain places or building
    res.status(200).sendFile(path.join(__dirname, "views", "index.html"));
    //res.status(200).sendFile("./views/index.html", { root: __dirname });
  } catch (err) {
    console.error(err);
  }
});

app.get("/new-page.html", (req, res) => {
  try {
    res.status(200).sendFile(path.join(__dirname, "views", "new-page.html"));
  } catch (err) {
    console.error(err);
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
