const express = require("express");
const cors = require("cors");
const knex = require("knex");
const app = express();
const dotenv = require("dotenv")
const port = 3008;
dotenv.config();
const kn = knex({
  client: "pg",
  connection: {
    host: "localhost",
    port: parseInt(process.env.PG_PORT),
    user: process.env.PG_USER,
    password: process.env.PG_PASS,
    database: "best_banking_app",
  },
});

app.use(cors());
app.use(express.json());

app.get("/acc", async (req, res) => {
  const data = await kn("accounts").select("*");
  res.send(data);
});

//Listening to the defined Port
app.listen(port, () => {
  console.log("listening to port" + port);
});
