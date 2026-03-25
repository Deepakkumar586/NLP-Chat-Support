const express = require("express");
const app = express();
const chatRoute = require('./routes/chatRoutes');

app.use(express.json());
app.use("/api", chatRoute);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));