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


app.post("/register", async (req, res) => {
    const { account, pincode } = req.body;
    if (!account || !pincode) {
        return res.status(422).send("all fields are required");
    }
    const existingAccount = await kn("accounts").where({ account }).first();
    if (existingAccount) {
        return res.status(422).send("account already exists");
    }
    await kn('accounts').insert({account, pincode });
    res.json({message: "user Registered"});
});



app.listen(port, () => {
  console.log("listening to port" + port);
});
