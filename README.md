# Uber Backend API Documentation

This document provides information about the backend API endpoints for the Uber application.

## Base URL

The base URL for the API is `https://uber-backend.onrender.com`.

## Authentication

The API uses JWT (JSON Web Token) for authentication. When a user registers or logs in, a token is returned that should be included in the Authorization header for subsequent requests.

## Endpoints

### User Routes

#### User Registration

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
- **Code**: 500 Internal Server Error

#### User Login

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

**Success Response**:

- **Code**: 200 OK

**Error Responses**:

- **Code**: 400 Bad Request
- **Code**: 401 Unauthorized
- **Code**: 500 Internal Server Error

#### User Profile

Retrieve the profile information of the authenticated user.

**URL**: `/users/profile`

**Method**: `GET`

**Authentication required**: Yes

**Success Response**:

- **Code**: 200 OK

**Error Responses**:

- **Code**: 401 Unauthorized
- **Code**: 500 Internal Server Error

#### User Logout

Log out the currently authenticated user.

**URL**: `/users/logout`

**Method**: `POST`

**Authentication required**: Yes

**Success Response**:

- **Code**: 200 OK

**Error Responses**:

- **Code**: 401 Unauthorized
- **Code**: 500 Internal Server Error

### Rider Routes

#### Create Ride Request

Create a new ride request.

**URL**: `/riders/create-ride`

**Method**: `POST`

**Authentication required**: Yes

**Request Body**:

```json
{
  "pickup": {
    "latitude": 40.7128,
    "longitude": -74.0060
  },
  "destination": {
    "latitude": 40.7484,
    "longitude": -73.9857
  }
}
```

**Success Response**:

- **Code**: 201 Created

**Error Responses**:

- **Code**: 400 Bad Request
- **Code**: 401 Unauthorized
- **Code**: 500 Internal Server Error

#### Get Active Ride

Get the active ride for the authenticated user.

**URL**: `/riders/active-ride`

**Method**: `GET`

**Authentication required**: Yes

**Success Response**:

- **Code**: 200 OK

**Error Responses**:

- **Code**: 404 Not Found
- **Code**: 500 Internal Server Error

#### Cancel Ride

Cancel an active ride.

**URL**: `/riders/cancel-ride/:rideId`

**Method**: `PUT`

**Authentication required**: Yes

**Success Response**:

- **Code**: 200 OK

**Error Responses**:

- **Code**: 404 Not Found
- **Code**: 500 Internal Server Error

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

### Ride Model

```javascript
{
  rider: ObjectId,     // reference to User model
  driver: ObjectId,    // reference to User model
  pickup: {
    latitude: Number,
    longitude: Number
  },
  destination: {
    latitude: Number,
    longitude: Number
  },
  status: String,      // enum: ['pending', 'accepted', 'in-progress', 'completed', 'cancelled']
  createdAt: Date,
  updatedAt: Date
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
