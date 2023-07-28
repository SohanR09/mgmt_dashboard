const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const colors = require("colors");
const cors = require("cors");
const schema = require("./schema/schema");
const connectDB = require("./config/db");

require("dotenv").config();
const port = process.env.PORT || 5000;

const app = express();

// Connect mongo database
connectDB();

app.use(express.static(__dirname + "/public"));

app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === "development",
  })
);

app.listen(
  3000,
  console.log(
    `${new Date()}:: server runing on port "${port}"`.cyan.underline.bold
  )
);
