const express = require("express");
const http = require("http");
const cors = require("cors");
const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(cors());
require("dotenv").config();

const db = require("./configs/mongoose");

const userRoutes = require("./routes/userRoutes");
const mapRoutes = require("./routes/mapRoutes");

app.use("/", userRoutes);
app.use("/", mapRoutes);

const PORT = process.env.PORT;
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
