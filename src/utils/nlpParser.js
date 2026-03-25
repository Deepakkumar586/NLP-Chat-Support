const extractData = (message) => {
  const msg = message.toLowerCase().trim();


  const itemMatch = msg.match(/\d{4}/);


  const qtyMatches = msg.match(/\d+/g);
  let quantity = null;

  if (qtyMatches && qtyMatches.length > 1) {
    quantity = parseInt(qtyMatches[1]); 
  }


  const brands = ["vivo", "oppo", "samsung", "iphone", "realme", "redmi", "xiaomi", "iqoo", "oneplus"];
  const brand = brands.find(b => msg.includes(b)) || null;


  let intent = "UNKNOWN";

  if (msg.includes("price") || msg.includes("rate")) {
    intent = "PRICE_CHECK";
  }
  else if (msg.includes("stock") || msg.includes("available") || msg.includes("urgent")) {
    intent = "STOCK_CHECK";
  }
  else if (msg.includes("bhej") || msg.includes("dispatch") || msg.includes("send")) {
    intent = "ORDER";
  }
  else if (msg.includes("block")) {
    intent = "BLOCK";
  }

  return {
    productId: itemMatch ? itemMatch[0] : null,
    quantity,
    brand,
    intent,
    confidence: 0.9
  };
};

module.exports = { extractData };