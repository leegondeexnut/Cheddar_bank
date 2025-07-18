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
    if(isNaN(parseInt(pincode)) || pincode.length !== 6) {
        return res.status(422).send("pincode must be a 6 digit number");
    }
    await kn('accounts').insert({account, pincode });
    res.json({message: "user Registered"});
});

app.post("/login", async (req, res) => {
  const {account, pincode} = req.body;
  if (!account || !pincode) {
      return res.status(422).send("all fields are required");
  }
  const existingAccount = await kn("accounts").where({ account }).first();
  if (!existingAccount) {
      return res.status(404).send("account not found");
  }
  if (existingAccount.pincode !== pincode){
    return res.status(422).send("incorrect pincode");
  }
  res.json({message: "login successful"});
})

app.post("/transaction", async (req, res) => {
    const { from_account, to_account, amount } = req.body;
    if (!from_account || !to_account || !amount) {
        return res.status(422).send("all fields are required");
    }
    if (isNaN(amount) || amount <= 0) {
        return res.status(422).send("amount must be a positive number");
    }
    
    const fromAccount = await kn("accounts").where({ id: from_account }).first();
    const toAccount = await kn("accounts").where({ id: to_account }).first();
    
    if (!fromAccount || !toAccount) {
        return res.status(404).send("one or both accounts not found");
    }
    
    if (fromAccount.amount < amount) {
        return res.status(422).send("insufficient funds");
    }
    
    await kn.transaction(async trx => {
        await trx('accounts').where({ id: from_account }).decrement('amount', amount);
        await trx('accounts').where({ id: to_account }).increment('amount', amount);
        await trx('transactions').insert({
            amount,
            from_account,
            to_account,
        });
    });
    
    res.json({message: "transaction successful"});
})






app.listen(port, () => {
  console.log("listening to port" + port);
});
