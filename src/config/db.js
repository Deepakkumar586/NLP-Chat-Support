const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./stock.db", (err) => {
  if (err) console.log("DB Error:", err);
  else console.log("DB Connected");
});

module.exports = db;