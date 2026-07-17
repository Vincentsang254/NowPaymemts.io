# API DOCUMENTATION

Base URL: `/api`

---

## AUTHENTICATION ENDPOINTS

### POST /auth/register

Register a new user account.

**Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phoneNumber": "+1234567890",
  "password": "SecurePassword123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Account Registered Successfully.",
  "data": {
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "userType": "customer"
    },
    "token": "jwt-token"
  }
}
```

---

### POST /auth/login

Login to user account.

**Body:**
```json
{
  "email": "john@example.com",
  "password": "SecurePassword123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login Successfully",
  "data": {
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "userType": "customer"
    },
    "token": "jwt-token"
  }
}
```

---

### GET /auth/me

Get current authenticated user.

**Auth:** Required (Bearer token)

**Response:**
```json
{
  "success": true,
  "message": "Operation completed successfully.",
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "userType": "customer"
  }
}
```

---

### POST /auth/logout

Logout current user.

**Auth:** Required

---

## USER ENDPOINTS

### GET /users/profile/:userId

Get user profile by ID.

**Response:**
```json
{
  "success": true,
  "message": "Profile retrieved successfully",
  "data": {
    "id": 1,
    "name": "John Doe",
    "bio": "Love hiking and cooking",
    "age": 28,
    "location": "New York, NY",
    "profilePic": "https://...",
    "photos": "https://..., https://..."
  }
}
```

---

## MATCHING ENDPOINTS

### GET /matching/discover

Get users to discover and like.

**Auth:** Required

**Query Parameters:**
- `limit` (optional): Number of users to return (default: 10)
- `offset` (optional): Pagination offset (default: 0)

**Response:**
```json
{
  "success": true,
  "message": "Users discovered successfully",
  "data": [
    {
      "id": 2,
      "name": "Jane Smith",
      "bio": "Artist and traveler",
      "age": 26,
      "location": "New York, NY",
      "profilePic": "https://...",
      "photos": "https://..., https://...",
      "interests": "art, travel, cooking",
      "gender": "female"
    }
  ]
}
```

---

### POST /matching/like

Like a user.

**Auth:** Required

**Body:**
```json
{
  "likedUserId": 2
}
```

**Response:**
```json
{
  "success": true,
  "message": "User liked successfully",
  "data": {
    "like": {
      "id": 1,
      "userId": 1,
      "likedUserId": 2,
      "createdAt": "2026-07-17T10:00:00Z"
    },
    "isMatch": false
  }
}
```

**On Match Response:**
```json
{
  "success": true,
  "message": "Match found!",
  "data": {
    "like": { ... },
    "isMatch": true
  }
}
```

---

### POST /matching/unlike

Unlike a user.

**Auth:** Required

**Body:**
```json
{
  "likedUserId": 2
}
```

**Response:**
```json
{
  "success": true,
  "message": "User unliked successfully",
  "data": {
    "likedUserId": 2
  }
}
```

---

### GET /matching/likes

Get users this user has liked.

**Auth:** Required

**Response:**
```json
{
  "success": true,
  "message": "User likes retrieved successfully",
  "data": [
    {
      "id": 1,
      "userId": 1,
      "likedUserId": 2,
      "createdAt": "2026-07-17T10:00:00Z",
      "liked": {
        "id": 2,
        "name": "Jane Smith",
        "age": 26,
        "profilePic": "https://..."
      }
    }
  ]
}
```

---

### GET /matching/likes-received

Get likes received from other users.

**Auth:** Required

**Response:**
```json
{
  "success": true,
  "message": "Received likes retrieved successfully",
  "data": [
    {
      "id": 2,
      "userId": 3,
      "likedUserId": 1,
      "createdAt": "2026-07-17T10:00:00Z",
      "liker": {
        "id": 3,
        "name": "Alex Johnson",
        "age": 29,
        "profilePic": "https://..."
      }
    }
  ]
}
```

---

### GET /matching/matches

Get all matches (mutual likes).

**Auth:** Required

**Response:**
```json
{
  "success": true,
  "message": "User matches retrieved successfully",
  "data": [
    {
      "id": 1,
      "userId": 1,
      "matchedUserId": 2,
      "status": "accepted",
      "createdAt": "2026-07-17T10:00:00Z",
      "user": { ... },
      "matchedUser": {
        "id": 2,
        "name": "Jane Smith",
        "age": 26,
        "profilePic": "https://..."
      },
      "otherUser": { ... }
    }
  ]
}
```

---

### GET /matching/check-match/:userId

Check if matched with a specific user.

**Auth:** Required

**Response:**
```json
{
  "success": true,
  "message": "Match status retrieved",
  "data": {
    "isMatch": true
  }
}
```

---

## PAYMENT ENDPOINTS

### POST /payment/nowpayments/create

Create a payment.

**Auth:** Required

**Body:**
```json
{
  "amount": 99.99,
  "subscriptionType": "premium"
}
```

---

### POST /payment/nowpayments/webhook

NOWPayments webhook for payment status updates.

**Headers:**
- `x-nowpayments-sig`: Webhook signature

---

## ERROR RESPONSES

All errors follow this format:

```json
{
  "success": false,
  "message": "Operation specific error message",
  "data": null,
  "error": "Detailed error message"
}
```

**Status Codes:**
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `500` - Server Error
