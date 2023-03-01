const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My API",
      version: "1.0.0",
      description: "My API description",
      contact: {
        name: "Your name",
        email: "your.email@example.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Local server",
      },
    ],
  },
  // Path to the API docs
  apis: ["./routes/*.js"],
};

module.exports = swaggerOptions;
