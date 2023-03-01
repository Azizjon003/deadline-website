const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Deadline API doc",
      version: "1.0.0",
      description: "Deadline API doc for my project",
      contact: {
        name: "Azizjon",
        email: "azizjonaliqulov68@gmail.com",
      },
    },
    tags: [
      {
        name: "Users",
        description: "API for users",
      },
    ],
    servers: [
      {
        url: "http://localhost:8080",
        description: "Local server",
      },
    ],
  },
  // Path to the API docs
  apis: ["./routes/*.js"],
};
const swaggerJsdoc = require("swagger-jsdoc");

const SwaggerDoc = swaggerJsdoc(swaggerOptions);
module.exports = SwaggerDoc;
