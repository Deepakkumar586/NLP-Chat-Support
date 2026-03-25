const extractData = (message) => {
  const msg = message.toLowerCase();

  const itemMatch = msg.match(/\d{4}/);
  const qtyMatch = msg.match(/\b\d+\b/g);

  const brandMatch = msg.match(/vivo|oppo|samsung|iphone|realme|redmi|xiaomi|iqoo/);

  const quantity = qtyMatch ? parseInt(qtyMatch[qtyMatch.length - 1]) : null;

  let intent = "UNKNOWN";
  if (msg.includes("price") || msg.includes("rate")) intent = "PRICE_CHECK";
  else if (msg.includes("stock") || msg.includes("available")) intent = "STOCK_CHECK";
  else if (msg.includes("bhej") || msg.includes("send")) intent = "ORDER";
  else if (msg.includes("block")) intent = "BLOCK";

  return {
    productId: itemMatch ? itemMatch[0] : null,
    quantity,
    brand: brandMatch ? brandMatch[0] : null,
    intent,
    confidence: 0.85
  };
};

module.exports = { extractData };