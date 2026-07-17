# DATABASE SCHEMA

## Users Model

**Table:** `Users`

| Field | Type | Constraints | Description |
|-------|------|-----------|---|
| id | INTEGER | PRIMARY KEY, AUTO_INCREMENT | Unique user identifier |
| name | STRING(100) | NOT NULL | User's full name |
| email | STRING(255) | NOT NULL, UNIQUE | User's email address |
| phoneNumber | STRING(30) | | User's phone number |
| password | STRING(255) | NOT NULL | Hashed password |
| userType | ENUM | customer, admin, vip | User role type |
| profilePic | STRING(255) | | URL to profile picture |
| bio | TEXT | | User's biography |
| interests | TEXT | | Comma-separated interests |
| preferences | TEXT | | User preferences (stored as JSON) |
| photos | TEXT | | Comma-separated photo URLs |
| gender | ENUM | male, female, other | User's gender |
| age | INTEGER | | User's age |
| location | STRING(150) | | User's location |
| verified | BOOLEAN | DEFAULT: false | Email verification status |
| verificationCode | STRING(20) | | Email verification code |
| passwordResetToken | STRING(255) | | Password reset token |
| passwordResetExpires | DATE | | Password reset token expiration |
| createdAt | DATE | TIMESTAMPS | Account creation date |
| updatedAt | DATE | TIMESTAMPS | Last update date |
| deletedAt | DATE | PARANOID | Soft delete date |

---

## Likes Model

**Table:** `Likes`

| Field | Type | Constraints | Description |
|-------|------|-----------|---|
| id | INTEGER | PRIMARY KEY, AUTO_INCREMENT | Unique like identifier |
| userId | INTEGER | NOT NULL, FK → Users.id | User who liked |
| likedUserId | INTEGER | NOT NULL, FK → Users.id | User being liked |
| createdAt | DATE | TIMESTAMPS | Like creation date |
| updatedAt | DATE | TIMESTAMPS | Last update date |

**Indexes:**
- UNIQUE (userId, likedUserId) - Ensures one user can only like another once

**Relationships:**
- belongsTo Users (as: "liker", foreignKey: "userId")
- belongsTo Users (as: "liked", foreignKey: "likedUserId")

---

## Matches Model

**Table:** `Matches`

| Field | Type | Constraints | Description |
|-------|------|-----------|---|
| id | INTEGER | PRIMARY KEY, AUTO_INCREMENT | Unique match identifier |
| userId | INTEGER | NOT NULL, FK → Users.id | First user in match |
| matchedUserId | INTEGER | NOT NULL, FK → Users.id | Second user in match |
| status | ENUM | pending, accepted, rejected | Match status |
| createdAt | DATE | TIMESTAMPS | Match creation date |
| updatedAt | DATE | TIMESTAMPS | Last update date |

**Indexes:**
- UNIQUE (userId, matchedUserId) - Ensures unique match pair

**Relationships:**
- belongsTo Users (as: "user", foreignKey: "userId")
- belongsTo Users (as: "matchedUser", foreignKey: "matchedUserId")

---

## Payments Model

**Table:** `Payments`

| Field | Type | Constraints | Description |
|-------|------|-----------|---|
| id | INTEGER | PRIMARY KEY, AUTO_INCREMENT | Unique payment identifier |
| reference | STRING(100) | NOT NULL, UNIQUE | Payment reference |
| paymentId | STRING(100) | | NOWPayments payment ID |
| transactionId | STRING(150) | | Blockchain transaction ID |
| amount | DECIMAL(10,2) | NOT NULL | Payment amount (USD) |
| priceCurrency | STRING(10) | | Price currency code |
| payCurrency | STRING(10) | | Crypto currency code |
| payAmount | DECIMAL(20,8) | | Crypto amount paid |
| payAddress | STRING(255) | | Payment wallet address |
| paymentUrl | TEXT | | NOWPayments payment URL |
| network | STRING(50) | | Blockchain network |
| status | ENUM | pending, waiting, confirming, confirmed, sending, finished, failed, expired, cancelled | Payment status |
| paidAt | DATE | | Payment completion date |
| provider | ENUM | NOWPayments | Payment provider |
| userId | INTEGER | NOT NULL, FK → Users.id | Associated user |
| createdAt | DATE | TIMESTAMPS | Payment creation date |
| updatedAt | DATE | TIMESTAMPS | Last update date |

**Relationships:**
- belongsTo Users (foreignKey: "userId")

---

## Payments Model

**Table:** `Payments`

| Field | Type | Constraints | Description |
|-------|------|-----------|---|
| id | INTEGER | PRIMARY KEY, AUTO_INCREMENT | Unique payment identifier |
| reference | STRING(100) | NOT NULL, UNIQUE | Payment reference |
| paymentId | STRING(100) | | NOWPayments payment ID |
| transactionId | STRING(150) | | Blockchain transaction ID |
| amount | DECIMAL(10,2) | NOT NULL | Payment amount (USD) |
| priceCurrency | STRING(10) | | Price currency code |
| payCurrency | STRING(10) | | Crypto currency code |
| payAmount | DECIMAL(20,8) | | Crypto amount paid |
| payAddress | STRING(255) | | Payment wallet address |
| paymentUrl | TEXT | | NOWPayments payment URL |
| network | STRING(50) | | Blockchain network |
| status | ENUM | pending, waiting, confirming, confirmed, sending, finished, failed, expired, cancelled | Payment status |
| paidAt | DATE | | Payment completion date |
| provider | ENUM | NOWPayments | Payment provider |
| userId | INTEGER | NOT NULL, FK → Users.id | Associated user |
| createdAt | DATE | TIMESTAMPS | Payment creation date |
| updatedAt | DATE | TIMESTAMPS | Last update date |

**Relationships:**
- belongsTo Users (foreignKey: "userId")

---

## Conversations Model

**Table:** `Conversations`

| Field | Type | Constraints | Description |
|-------|------|-----------|---|
| id | INTEGER | PRIMARY KEY, AUTO_INCREMENT | Unique conversation identifier |
| user1Id | INTEGER | NOT NULL, FK → Users.id | First user in conversation |
| user2Id | INTEGER | NOT NULL, FK → Users.id | Second user in conversation |
| lastMessage | TEXT | | Last message content |
| lastMessageAt | DATE | | Timestamp of last message |
| lastMessageUserId | INTEGER | FK → Users.id | User who sent last message |
| createdAt | DATE | TIMESTAMPS | Conversation creation date |
| updatedAt | DATE | TIMESTAMPS | Last update date |

**Indexes:**
- UNIQUE (user1Id, user2Id) - Ensures one conversation pair per users

**Relationships:**
- belongsTo Users (as: "user1", foreignKey: "user1Id")
- belongsTo Users (as: "user2", foreignKey: "user2Id")
- belongsTo Users (as: "lastMessageUser", foreignKey: "lastMessageUserId")
- hasMany Messages (foreignKey: "conversationId", as: "messages")

---

## Messages Model

**Table:** `Messages`

| Field | Type | Constraints | Description |
|-------|------|-----------|---|
| id | INTEGER | PRIMARY KEY, AUTO_INCREMENT | Unique message identifier |
| conversationId | INTEGER | NOT NULL, FK → Conversations.id | Associated conversation |
| senderId | INTEGER | NOT NULL, FK → Users.id | Message sender |
| recipientId | INTEGER | NOT NULL, FK → Users.id | Message recipient |
| content | TEXT | NOT NULL | Message content |
| isRead | BOOLEAN | DEFAULT: false | Read status |
| readAt | DATE | | Timestamp when message was read |
| createdAt | DATE | TIMESTAMPS | Message creation date |
| updatedAt | DATE | TIMESTAMPS | Last update date |

**Relationships:**
- belongsTo Conversations (foreignKey: "conversationId", as: "conversation")
- belongsTo Users (foreignKey: "senderId", as: "sender")
- belongsTo Users (foreignKey: "recipientId", as: "recipient")

---

## Models to Implement (Phase 6+)

- **Subscriptions** - Premium subscription tracking
- **Notifications** - User notifications
- **Reports** - User reports for moderation
- **Blocks** - User blocking functionality
