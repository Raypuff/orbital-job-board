const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json()); //req.body

//ROUTES//

//create an account

app.post("/accounts", async (req, res) => {
  try {
    const { name, id } = req.body;
    const newAccount = await pool.query(
      "INSERT INTO organization_accounts (id, name) VALUES ($1, $2) RETURNING *",
      [id, name]
    );

    res.json(newAccount);
  } catch (err) {
    console.error(err.message);
  }
});

//get all accounts
app.get("/accounts", async (req, res) => {
  try {
    const allAccounts = await pool.query("SELECT * from organization_accounts");
    res.json(allAccounts.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//get an account
app.get("/accounts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const account = await pool.query(
      "SELECT * FROM organization_accounts WHERE id = $1",
      [id]
    );

    res.json(account.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//update an account
app.put("/accounts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const updateAccount = await pool.query(
      "UPDATE organization_accounts SET name = $1 WHERE id = $2",
      [name, id]
    );
    res.json("Account was updated");
  } catch (err) {
    console.error(err.message);
  }
});

//delete an account
app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteAccount = await pool.query(
      "DELETE FROM organization_accounts WHERE id = $1",
      [id]
    );
    res.json("Account was deleted");
  } catch (err) {
    console.log(err.message);
  }
});

app.listen(5000, () => {
  console.log("server has started on port 5000");
});
