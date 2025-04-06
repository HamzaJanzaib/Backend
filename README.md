# Uber Backend API Documentation

This document provides information about the backend API endpoints for the Uber application.

## Base URL

The base URL for the API is `https://uber-backend.onrender.com`.

## Authentication

The API uses JWT (JSON Web Token) for authentication. When a user registers or logs in, a token is returned that should be included in the Authorization header for subsequent requests.

## Endpoints

### User Registration

Register a new user in the system.

**URL**: `/users/register`

**Method**: `POST`

**Authentication required**: No

**Request Body**:

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}
```

**Data Constraints**:

- `fullname.firstname` (required): Must be at least 3 characters long
- `fullname.lastname` (optional): If provided, must be at least 3 characters long
- `email` (required): Must be a valid email format and at least 5 characters long
- `password` (required): Must be at least 6 characters long

**Success Response**:

- **Code**: 201 Created
- **Content Example**:

```json
{
  "user": {
    "_id": "60d21b4667d0d8992e610c85",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "socketId": null
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Responses**:

- **Code**: 400 Bad Request
  - **Condition**: If validation fails (e.g., firstname too short, invalid email format)
  - **Content Example**:

```json
{
  "errors": [
    {
      "value": "Jo",
      "msg": "First name must be at least 3 characters",
      "param": "fullname.firstname",
      "location": "body"
    }
  ]
}
```

- **Code**: 500 Internal Server Error
  - **Condition**: If there's a server error during user creation
  - **Content Example**:

```json
{
  "message": "Error message details"
}
```

### User Login

Authenticate a user and receive a JWT token.

**URL**: `/users/login`

**Method**: `POST`

**Authentication required**: No

**Request Body**:

```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

**Data Constraints**:

- `email` (required): Must be a valid email format
- `password` (required): Must be at least 6 characters long

**Success Response**:

- **Code**: 200 OK
- **Content Example**:

```json
{
  "user": {
    "_id": "60d21b4667d0d8992e610c85",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "socketId": null
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Responses**:

- **Code**: 400 Bad Request
  - **Condition**: If validation fails (e.g., invalid email format)
  - **Content Example**:

```json
{
  "errors": [
    {
      "value": "invalid-email",
      "msg": "Invalid email format",
      "param": "email",
      "location": "body"
    }
  ]
}
```

- **Code**: 401 Unauthorized
  - **Condition**: If the email or password is incorrect
  - **Content Example**:

```json
{
  "message": "Invalid email or password"
}
```

- **Code**: 500 Internal Server Error
  - **Condition**: If there's a server error during authentication
  - **Content Example**:

```json
{
  "message": "Error message details"
}
```

### User Profile

Retrieve the profile information of the authenticated user.

**URL**: `/users/profile`

**Method**: `GET`

**Authentication required**: Yes

**Success Response**:

- **Code**: 200 OK
- **Content Example**:

```json
{
  "user": {
    "_id": "60d21b4667d0d8992e610c85",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "socketId": null
  }
}
```

**Error Responses**:

- **Code**: 401 Unauthorized
  - **Condition**: If the user is not authenticated
  - **Content Example**:

```json
{
  "message": "Unauthorized access"
}
```

- **Code**: 500 Internal Server Error
  - **Condition**: If there's a server error while fetching the profile
  - **Content Example**:

```json
{
  "message": "Error message details"
}
```

### User Logout

Log out the currently authenticated user.

**URL**: `/users/logout`

**Method**: `POST`

**Authentication required**: Yes

**Success Response**:

- **Code**: 200 OK
- **Content Example**:

```json
{
  "message": "Logged out successfully"
}
```

**Error Responses**:

- **Code**: 401 Unauthorized
  - **Condition**: If the user is not authenticated
  - **Content Example**:

```json
{
  "message": "Unauthorized access"
}
```

- **Code**: 500 Internal Server Error
  - **Condition**: If there's a server error during logout
  - **Content Example**:

```json
{
  "message": "Error message details"
}
```

## Data Models

### User Model

```javascript
{
  fullname: {
    firstname: String, // required, min length 3
    lastname: String   // optional, min length 3 if provided
  },
  email: String,       // required, unique, min length 5
  password: String,    // required, not returned in queries
  socketId: String     // optional
}
```

## Authentication

After registration or login, the returned JWT token should be included in the Authorization header for protected routes:

```
Authorization: Bearer <token>
```

## Error Handling

The API returns appropriate HTTP status codes and error messages in JSON format.

## Rate Limiting

Currently, there are no rate limits implemented.

## Notes

- All timestamps are returned in ISO 8601 format: `YYYY-MM-DDTHH:MM:SSZ`
- All responses are in JSON format
