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

## PAYMENT / SUBSCRIPTION ENDPOINTS

### GET /payment/plans

Get the available subscription plans.

**Auth:** Required

**Response:**
```json
{
  "success": true,
  "message": "Subscription plans retrieved successfully",
  "data": [
    {
      "id": 1,
      "tier": "free",
      "name": "Free",
      "price": "0.00"
    }
  ]
}
```

---

### GET /payment/subscription/status

Get the authenticated user's current subscription status.

**Auth:** Required

**Response:**
```json
{
  "success": true,
  "message": "User subscription retrieved successfully",
  "data": {
    "tier": "premium",
    "status": "active",
    "userId": 1,
    "plan": {
      "tier": "premium",
      "name": "Premium"
    }
  }
}
```

---

### POST /payment/subscription/activate

Activate a premium subscription for the authenticated user.

**Auth:** Required

**Body:**
```json
{
  "planTier": "premium",
  "billingCycle": "monthly",
  "paymentId": 12
}
```

**Response:**
```json
{
  "success": true,
  "message": "Subscription activated successfully",
  "data": {
    "tier": "premium",
    "status": "active"
  }
}
```

---

### POST /payment/subscription/cancel

Cancel the authenticated user's active subscription.

**Auth:** Required

**Body:**
```json
{
  "reason": "No longer needed"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Subscription cancelled successfully",
  "data": {
    "status": "cancelled"
  }
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

## MESSAGING ENDPOINTS

### POST /messaging/conversations

Get or create a conversation with another user.

**Auth:** Required

**Body:**
```json
{
  "userId": 2
}
```

**Response:**
```json
{
  "success": true,
  "message": "Conversation retrieved or created successfully",
  "data": {
    "id": 1,
    "user1Id": 1,
    "user2Id": 2,
    "lastMessage": "Hi there!",
    "lastMessageAt": "2026-07-17T14:30:00Z",
    "user1": {
      "id": 1,
      "name": "John Doe",
      "profilePic": "https://..."
    },
    "user2": {
      "id": 2,
      "name": "Jane Smith",
      "profilePic": "https://..."
    }
  }
}
```

---

### GET /messaging/conversations

Get all conversations for the authenticated user.

**Auth:** Required

**Query Parameters:**
- `limit` (optional): Number of conversations to return (default: 10)
- `offset` (optional): Pagination offset (default: 0)

**Response:**
```json
{
  "success": true,
  "message": "Conversations retrieved successfully",
  "data": [
    {
      "id": 1,
      "user1Id": 1,
      "user2Id": 2,
      "lastMessage": "See you soon!",
      "lastMessageAt": "2026-07-17T14:30:00Z",
      "user1": { ... },
      "user2": { ... }
    }
  ]
}
```

---

### GET /messaging/conversations/:conversationId/messages

Get messages in a specific conversation.

**Auth:** Required

**Query Parameters:**
- `limit` (optional): Number of messages to return (default: 50)
- `offset` (optional): Pagination offset (default: 0)

**Response:**
```json
{
  "success": true,
  "message": "Messages retrieved successfully",
  "data": [
    {
      "id": 1,
      "conversationId": 1,
      "senderId": 1,
      "recipientId": 2,
      "content": "Hi, how are you?",
      "isRead": true,
      "readAt": "2026-07-17T14:31:00Z",
      "createdAt": "2026-07-17T14:30:00Z",
      "sender": {
        "id": 1,
        "name": "John Doe",
        "profilePic": "https://..."
      }
    }
  ]
}
```

---

### POST /messaging/messages

Send a message in a conversation.

**Auth:** Required

**Body:**
```json
{
  "conversationId": 1,
  "content": "Hi there, how are you doing?"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Message sent successfully",
  "data": {
    "id": 2,
    "conversationId": 1,
    "senderId": 1,
    "recipientId": 2,
    "content": "Hi there, how are you doing?",
    "isRead": false,
    "createdAt": "2026-07-17T14:35:00Z",
    "sender": {
      "id": 1,
      "name": "John Doe",
      "profilePic": "https://..."
    }
  }
}
```

---

### POST /messaging/mark-read

Mark all messages in a conversation as read.

**Auth:** Required

**Body:**
```json
{
  "conversationId": 1
}
```

**Response:**
```json
{
  "success": true,
  "message": "Messages marked as read",
  "data": {
    "conversationId": 1
  }
}
```

---

### GET /messaging/unread-count

Get the count of unread messages for the authenticated user.

**Auth:** Required

**Response:**
```json
{
  "success": true,
  "message": "Unread count retrieved successfully",
  "data": {
    "unreadCount": 5
  }
}
```

---

### DELETE /messaging/conversations/:conversationId

Delete a conversation and all its messages.

**Auth:** Required

**Response:**
```json
{
  "success": true,
  "message": "Conversation deleted successfully",
  "data": {
    "conversationId": 1
  }
}
```

---

### GET /messaging/premium-features

Check user's premium features and messaging capabilities.

**Auth:** Required

**Response:**
```json
{
  "success": true,
  "message": "Premium features retrieved successfully",
  "data": {
    "isPremium": true,
    "features": {
      "textMessages": true,
      "voiceMessages": true,
      "videoCalls": true,
      "voiceCalls": true,
      "screenShare": true
    }
  }
}
```

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
- `403` - Forbidden
- `404` - Not Found
- `500` - Server Error
