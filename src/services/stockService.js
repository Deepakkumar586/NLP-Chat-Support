const db = require("../config/db");

const getStock = ({ productId, brand }) => {
  return new Promise((resolve, reject) => {
    let query = "SELECT * FROM stock WHERE 1=1";
    const params = [];

    if (productId) {
      query += " AND name LIKE ?";
      params.push(`%${productId}%`);
    }

    if (brand) {
      query += " AND name LIKE ?";
      params.push(`%${brand}%`);
    }

    db.all(query, params, (err, rows) => { 
      if (err) return reject(err);
      resolve(rows);
    });
  });
};

module.exports = { getStock };