const { extractData } = require("../utils/nlpParser");
const { getStock } = require("../services/stockService");

exports.chatHandler = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    

    const { productId, quantity, brand, intent, confidence } = extractData(message);

   

    if (!productId && !brand) {
      return res.json({
        intent: "UNKNOWN",
        message: "Please mention product like '2003' or 'vivo'"
      });
    }

    const rows = await getStock({ productId, brand });

    if (!rows || rows.length === 0) {
      return res.json({
        intent,
        message: "No stock found"
      });
    }

    
    const results = rows.slice(0, 5).map(row => {
      let status = "AVAILABLE";

      if (quantity && quantity > row.quantity) {
        status = "PARTIAL";
      }

      let message = "";

      if (quantity) {
        if (quantity <= row.quantity) {
          message = `${quantity} pcs available for ${row.name}`;
        } else {
          message = `Only ${row.quantity} pcs available for ${row.name}`;
        }
      } else {
        message = `${row.quantity} pcs available for ${row.name}`;
      }

      return {
        product: row.name,
        availableQty: row.quantity,
        status,
        message
      };
    });

    return res.json({
      intent,
      confidence,
      count: results.length,
      results
    });

  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
