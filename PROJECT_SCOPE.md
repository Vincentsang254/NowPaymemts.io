# PROJECT_SCOPE.md

# Dating Platform

## Project Overview

This project is a modern web-based dating platform that allows users to discover, connect, and communicate with other people in a secure and user-friendly environment.

The application is designed with scalability, maintainability, and clean architecture in mind.

It follows a modern full-stack architecture using React, Node.js, Express, Sequelize, MySQL, Tailwind CSS, Redux Toolkit, shadcn/ui, and NOWPayments.

---

# Problem Statement

Many dating platforms today suffer from one or more of the following problems:

- Poor user experience
- Complicated navigation
- Slow performance
- Limited payment methods
- Expensive subscription systems
- Poor moderation tools
- Outdated interfaces
- Difficult administration

This project aims to solve these problems by building a modern, fast, secure, and easy-to-use dating platform.

---

# Objectives

The application should provide a safe environment where users can:

- Create an account
- Build a profile
- Upload profile pictures
- Discover nearby or compatible users
- Like other profiles
- Match with users
- Chat in real time
- Purchase premium subscriptions
- Manage their own profile
- Report abusive users
- Block unwanted users

Administrators should be able to:

- Manage users
- Review reports
- Manage subscriptions
- View payments
- Monitor platform statistics
- Moderate content

---

# Target Users

## Customer

A customer is a normal user who uses the platform to:

- Register
- Login
- Complete profile
- Browse profiles
- Match
- Chat
- Purchase Premium
- Edit settings

---

## Administrator

An administrator manages the platform.

Responsibilities include:

- User management
- Payment management
- Subscription management
- Reports
- Analytics
- Platform settings

---

# Core Features

## Authentication

- Register
- Login
- JWT Authentication
- Password encryption
- Protected routes

---

## Profile Management

- Edit profile
- Upload photos
- Personal information
- Interests
- Preferences

---

## Discovery

Users can browse profiles based on matching criteria.

---

## Matching

Two users become a match after liking each other.

---

## Messaging

Matched users can exchange messages in real time using Socket.IO.

---

## Notifications

Users receive notifications for:

- New matches
- New messages
- Likes
- Premium activation

---

## Premium

Premium users receive additional features.

Payments are processed using NOWPayments.

---

## Admin Dashboard

Administrators can:

- View users
- Suspend accounts
- Delete accounts
- View reports
- Manage subscriptions
- View payments

---

# Technology Stack

## Frontend

- React (Vite)
- Redux Toolkit
- React Router
- Axios
- Tailwind CSS
- shadcn/ui
- Lucide React

---

## Backend

- Node.js
- Express.js
- Sequelize
- MySQL
- JWT
- bcrypt
- Socket.IO
- Cloudinary
- NOWPayments

---

# Folder Structure

```
dating-platform/

│
├── client/
│   ├── public/
│   ├── src/
│   │
│   ├── assets/
│   ├── components/
│   │   ├── ui/
│   │   ├── common/
│   │   ├── adminView/
│   │   ├── customerView/
│   │   └── forms/
│   │
│   ├── pages/
│   │   ├── admin/
│   │   ├── customer/
│   │   └── auth/
│   │
│   ├── redux/
│   ├── App.jsx
│   └── main.jsx
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── validators/
│   ├── utils/
│   ├── sockets/
│   ├── uploads/
│   └── index.js
│
├── docs/
│
├── README.md
│
├── PROJECT_SCOPE.md
│
├── COPILOT_INSTRUCTIONS.md
│
└── package.json
```

---

# Architecture

The project follows a layered architecture.

Frontend

Pages

↓

Redux

↓

API Layer

↓

Backend

↓

Controllers

↓

Models (Sequelize)

↓

MySQL Database

---

# API Standard

Every endpoint must return:

Success

```json
{
    "success": true,
    "message": "Operation completed successfully.",
    "data": {}
}
```

Failure

```json
{
    "success": false,
    "message": "Operation failed.",
    "data": null
}
```

---

# Security

The application must implement:

- JWT Authentication
- Password hashing with bcrypt
- Protected routes
- Role-based authorization
- Input validation
- SQL injection protection through Sequelize
- Secure payment verification
- Webhook signature verification

---

# Future Features

The architecture should support future expansion, including:

- Video calling
- Voice messages
- AI profile recommendations
- AI chat moderation
- Live streaming
- Mobile applications
- Push notifications
- Multi-language support
- Advanced search filters
- Identity verification
- Premium badges

---

# Project Goal

The goal is to build a professional, scalable, secure, and maintainable dating platform that delivers an excellent user experience while following clean coding standards and modern development practices.

Every new feature should follow the project's coding standards and architecture without introducing unnecessary complexity.
