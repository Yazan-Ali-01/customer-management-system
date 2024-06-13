# Customer Management System

## Project Overview

This project is a Customer Management System built using Node.js, Express, TypeScript, and PostgreSQL. It follows Domain-Driven Design (DDD) principles to create a modular and maintainable architecture. The system is designed to handle a significant number of concurrent requests efficiently by implementing various optimizations such as caching, compression, rate limiting, and database indexing. Additionally, it includes Docker support for easy deployment and scalability.

## Features

- **Domain-Driven Design (DDD)**: The project is structured according to DDD principles, ensuring a clear separation of concerns and a modular architecture.
- **Authentication**: User registration, login, logout, and session management using JWT.
- **Customer Management**: CRUD operations for managing customer data.
- **API Documentation**: Comprehensive API documentation using Swagger.

## Optimizations for High Concurrency

1. **Caching**: Redis is used to cache frequently accessed data, reducing database load and improving response times.
2. **Compression**: Responses are compressed using the `compression` middleware to reduce payload size and improve network performance.
3. **Rate Limiting**: The `express-rate-limit` middleware is used to prevent abuse by limiting the number of requests a client can make in a given timeframe.
4. **Docker Replicas**: Docker and Docker Compose are used to create containerized environments with support for running multiple replicas for load balancing.
5. **Async Operations**: Asynchronous operations and non-blocking I/O are used to handle multiple requests concurrently.
6. **Database Indexing**: Database tables are indexed to speed up query performance and ensure efficient data retrieval.

## Getting Started

### Prerequisites

- Node.js
- npm or yarn
- Docker (optional)

### Running the Project Locally

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yazan-ali-01/customer-management-system.git
   cd customer-management-system
   ```
   
2. **Install Depnedencies**:
    ```
    npm install
    ```
3. **Set up environment variables**:
    Create a .env file in the root directory and add the following environment variables:
    ```bash
    POSTGRES_USER=admin
    POSTGRES_PASSWORD=admin
    POSTGRES_DB=assessment_db
    DB_HOST=localhost
    DB_PORT=5432
    REDIS_HOST=localhost
    REDIS_PORT=6379
    ```
4. **Start the PostgreSQL and Redis servers**:
Make sure you have PostgreSQL and Redis running on your local machine. You can use Docker to run them if you prefer:
  ```bash
  docker run --name postgres -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=admin -e POSTGRES_DB=assessment_db -p 5432:5432 -d postgres:13
  docker run --name redis -p 6379:6379 -d redis:6.2
```
5. **Run database migrations**:
    ```bash
    npm run migrate
    ```
6. **Seed the database**:
    ```bash
    npm run seed
    ```
7. **Start the application**:
    ```bash
    npm run dev
    ```
8. **Access the API documentation:**:
    Open your browser and navigate to http://localhost:3000/api-docs to view the Swagger documentation.

### Running the Project with Docker

1. **Clone the repository**:
    ```bash
    git clone https://github.com/yazan-ali-01/CMS-ASSESSMENT.git
    cd CMS-ASSESSMENT/backend
    ```
2. **Set up environment variables**:
  Create a .env file in the root directory and add the following environment variables:
    ```bash
    POSTGRES_USER=admin
    POSTGRES_PASSWORD=admin
    POSTGRES_DB=assessment_db
    DB_HOST=db
    DB_PORT=5432
    REDIS_HOST=redis
    REDIS_PORT=6379
    ```
3. **Build and start the Docker containers**:
  Create a .env file in the root directory and add the following environment variables:
    ```bash
    docker-compose up --build
    ```
4. **Run database migrations**:
    ```bash
    docker-compose exec app npm run migrate
    ```
5. **Seed the database**:
    ```bash
   docker-compose exec app npm run seed
    ```
6. **Access the application**:
   The application will be running at http://localhost:8080.
7. **Access the API documentation**:
   Open your browser and navigate to http://localhost:8080/api-docs to view the Swagger documentation.

### Project Structure
The project follows a DDD structure with separate layers for domain, application, infrastructure, and shared components.
- src/domain: Contains domain entities, value objects, and repository interfaces.
- src/application: Contains service classes that implement business logic.
- src/infrastructure: Contains database entities, repository implementations, and HTTP controllers.
- src/shared: Contains shared utilities, middlewares, and error handling.

### API Documentation

The API is documented using Swagger. You can access the documentation at http://localhost:8080/api-docs when running with Docker and Nginx, or at http://localhost:3000/api-docs when running locally. The documentation provides detailed information about each endpoint, including request parameters, request body, and response formats.


### Contact
For any questions or inquiries, please contact yazan.ali.dev@gmail.com.
