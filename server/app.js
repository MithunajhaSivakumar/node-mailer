const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const emailRoutes = require("./routes/emailRoute");

const app = express();

app.use(express.json());
app.use(cors()); 

mongoose
  .connect("mongodb://localhost:27017/email-sender", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

app.use("/api/email", emailRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
