const express = require("express");
const app = express();
const PORT = 3000;
const cors = require("cors");
const connect = require("./models");
connect();

const indexRouter = require("./routes/index");

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use("/", indexRouter);

app.listen(PORT, () => {
  console.log(`${PORT} is Running`);
});
