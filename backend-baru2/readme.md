# Binar Car Rental API

REST API for Binar Car Rental built with Express.js and PostgreSQL.

## Features

- Service Repository Pattern Implementation
- Token Based Authentication
- Role-based Access Control (Superadmin, Admin, Member)
- Car Management System

## API Documentation

- Swagger UI: http://localhost:3000/api-docs

## Superadmin Credentials

- Email: superadmin@binar.com
- Password: superadmin123

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create PostgreSQL database
4. Configure environment variables in .env file
5. Run migrations:
   ```bash
   npm run db:migrate
   ```
6. Seed the database:
   ```bash
   npm run db:seed
   ```
7. Start the server:
   ```bash
   npm run dev
   ```

## API Endpoints

### Authentication

- POST /api/v1/register - Register new user
- POST /api/v1/login - User login
- POST /api/v1/admin - Create new admin (Superadmin only)
- GET /api/v1/me - Get current user

### Cars

- GET /api/v1/cars - Get all cars (Admin/Superadmin)
- POST /api/v1/cars - Create new car (Admin/Superadmin)
- GET /api/v1/cars/available - Get available cars (Public)
- GET /api/v1/cars/:id - Get car by ID (Admin/Superadmin)
- PUT /api/v1/cars/:id - Update car (Admin/Superadmin)
- DELETE /api/v1/cars/:id - Delete car (Admin/Superadmin)
