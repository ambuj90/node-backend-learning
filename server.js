const express = require("express");
const app = express();

app.use(express.json());

const fileRoutes = require("./routes/fileRoutes");
app.use("/files", fileRoutes);

app.get("/", (req, res) => {
  res.send("Mini File Manager API Running");
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
