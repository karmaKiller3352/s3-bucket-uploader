require("dotenv").config({ path: "./.env" });
const app = require("./src");
const mongoose = require("mongoose");

// Establishing database connection
mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("DB connection successful!"))
  .catch((e) => console.log("Error connecting DB!", e));

app.listen(process.env.PORT, () =>
  console.log("server is runnning at port 9000!")
);
