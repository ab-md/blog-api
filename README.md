# Blog API

A RESTful Blog API built with Node.js, Express.js, MongoDB and Mongoose.

## Tech Stack

-   Node.js
-   Express.js
-   MongoDB
-   Mongoose
-   Zod
-   JWT
-   Multer
-   bcrypt
-   dotenv

## Features

### Authentication & Users

-   User registration and login
-   JWT-based authentication
-   Role-based authorization
-   User profile update
-   Password change
-   Profile avatar upload
-   Admin role management

### Posts

-   Create, read, update and delete posts
-   Get a post by slug
-   Assign categories
-   Assign author/editor
-   Published and pending status

### Categories

-   Create, read, update and delete categories
-   Get a category by slug
-   Category image upload

### Comments

-   Create, read, update and delete comments
-   Comment moderation
-   Published and pending status

## Authentication

The API uses JWT for authentication.

Authenticated requests send the token through the `Authorization`
header:

``` http
Authorization: Bearer <token>
```

Protected routes verify the token before continuing.

## Validation

Request bodies are validated with Zod before reaching the controller.

Invalid input is returned as a structured validation error.

## File Upload

File uploads are handled with Multer and stored locally on the server.

## Architecture

``` text
Client
  ↓
Route
  ↓
Middleware
  ↓
Validation
  ↓
Controller
  ↓
Model / Mongoose
  ↓
MongoDB
```

## Project Structure

``` text
src/
├── config/
├── controllers/
├── middlewares/
├── models/
├── routes/
├── utils/
└── app.js
```

## API Overview

### Authentication

  Method   Endpoint           Access
  -------- ------------------ --------
  POST     `/auth/register`   Public
  POST     `/auth/login`      Public

### Users

  Method   Endpoint       Access
  -------- -------------- ---------------
  GET      `/users`       Admin
  GET      `/users/:id`   Authenticated
  PATCH    `/users/:id`   Authenticated
  DELETE   `/users/:id`   Admin

### Posts

  Method   Endpoint         Access
  -------- ---------------- ----------------------------
  GET      `/posts`         Public
  GET      `/posts/:slug`   Public
  POST     `/posts`         Authenticated / Authorized
  PATCH    `/posts/:slug`   Authenticated / Authorized
  DELETE   `/posts/:slug`   Authenticated / Authorized

### Categories

  Method   Endpoint              Access
  -------- --------------------- ------------
  GET      `/categories`         Public
  GET      `/categories/:slug`   Public
  POST     `/categories`         Authorized
  PATCH    `/categories/:slug`   Authorized
  DELETE   `/categories/:slug`   Authorized

### Comments

  Method   Endpoint          Access
  -------- ----------------- ----------------------------
  GET      `/comments/:id`   Public
  POST     `/comments`       Authenticated
  PATCH    `/comments/:id`   Authenticated / Authorized
  DELETE   `/comments/:id`   Authenticated / Authorized

## Environment Variables

Create a `.env` file in the project root:

``` env
PORT=3000
MONGO_URI=mongodb://localhost:27017/blog
JWT_SECRET=your_secret_key
```

Never commit `.env` or other sensitive credentials.

## Installation

``` bash
npm install
```

## Run

Development:

``` bash
npm run dev
```

Production:

``` bash
npm start
```

## Purpose

This project was built as a backend practice project to understand API
design, MongoDB/Mongoose, validation, authentication, authorization,
file uploads and error handling.

The API is designed to be consumed by a separate frontend application.
