const swaggerAutogen = require("swagger-autogen")({ openapi: "3.0.0" });

const doc = {
  info: {
    title: "DawnEats API",
    description: "Description",
  },
  host: "localhost:8080",
};

const outputFile = "./swagger.json";
const routes = [
  "./index.js",
];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc);
