const express = require("express");
const dotEnv = require("dotenv");
const app = express();

const connectDatabase = require("./config/connectDataBase");

dotEnv.config({ path: "./config/configFile.env" });

const productsRouter = require("./routes/product");
const ordersRouter = require("./routes/orders");

//// Middleware to parse incoming JSON request bodies and make them available in req.body
app.use(express.json());

// API versioning --=>this helps manage future API changes without breaking older apps
app.use("/api/v1/", productsRouter); //Now this is in Live so now you can use the end-points.....
app.use("/api/v1/", ordersRouter);

connectDatabase();

app.listen(process.env.PORT, () => {
  console.log(
    `Server is Listening on Port No : ${process.env.PORT} In ${process.env.NODE_ENV}`,
  );
});
