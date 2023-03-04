const express = require("express");
const router = require("./routes/info.route");
const cors = require("cors");
const fileMiddleware = require("./middleware/file");
const sequelize = require("./db");
const app = express();

const PORT = process.env.PORT || 8080;
app.use(cors());
app.use(express.json());
app.use(fileMiddleware.single("file"));
app.use("/api", router);
async function start() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();

    app.listen(PORT, () => {
      console.log(`server stared on port  ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
}
start();
