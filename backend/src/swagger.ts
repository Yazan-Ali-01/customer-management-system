import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Application } from 'express';
import path from 'path';

const yamlPath = path.join(__dirname, './swagger-docs/*.yaml');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Customer Management System API',
      version: '1.0.0',
      description: 'API documentation for the Customer Management System',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
  },
  apis: [yamlPath],
};

const specs = swaggerJsdoc(options);

export default (app: Application) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};
