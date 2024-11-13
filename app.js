const express = require("express");
const app = express();
const path = require("node:path");
const inventoryRouter = require("./routes/inventoryRouter");

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/", inventoryRouter);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`My first Express app - listening on port ${PORT}!`);
});
