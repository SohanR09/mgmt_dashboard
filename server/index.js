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
  "/api/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(
  port,
  console.log(
    `${new Date()}:: server runing on port "${port}"`.cyan.underline.bold
  )
);
