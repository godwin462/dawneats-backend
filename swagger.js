const swaggerAutogen = require("swagger-autogen")({ openapi: "3.0.0" });
const env = process.env.NODE_ENV || "development";

const endpointsFiles = ["./index.js"];

const doc = {
  info: {
    title: "DawnEats API",
    description: "DawnEats API Documentation",
    version: "1.0.0",
  },
  host:
    env === "production"
      ? "https://dawneats-backend.onrender.com"
      : "http://localhost:8080",
  basePath: "/",
  schemes: ["https", "http"],
  consumes: ["application/json"],
  produces: ["application/json"],
};

const outputFile = "./swagger.json";
/* NOTE: If you are using the express Router, you must pass in the 'routes' only the
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, endpointsFiles, doc);
