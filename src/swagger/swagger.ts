import swaggerJsdoc from "swagger-jsdoc";

// Definición de la configuración de Swagger
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de Bichitos Pet Shop",
      version: "1.0.0",
      description: "Documentación de la API para Bichitos Pet Shop.",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Servidor de desarrollo",
      },
    ],
  },
  apis: ["./swagger/*.json"], // Cambia esta ruta según la ubicación de tus archivos de rutas
};

const specs = swaggerJsdoc(swaggerOptions);

export default specs;
