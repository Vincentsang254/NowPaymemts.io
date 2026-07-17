# FILES THAT MUST NEVER BE MODIFIED

Unless explicitly instructed.

## Client (frontend)
 
- src/App.jsx -> only modify when adding routes or new pages
- src/redux/slices/api.js -> only modify when adding slices; create new slices under src/redux/slices/ like userSlice.js, authSlice.js, paymentSlice.js etc and configure them in src/redux/store.js

NEVER MODIFY the following directories/files unless explicitly requested:

- src/components/adminView
- src/components/customerView
- src/components/auth
- src/components/common/check-auth.jsx

Note: An exception — provide new component code only when explicitly requested. You asked for the `src/components/customerView/customer-sidebar.jsx` component; that file may be added or updated only when you request it.
# API RESPONSE FORMAT

Every endpoint must return a consistent JSON shape and use operation-specific messages.

Success example (registration):

{
    "success": true,
    "message": "Account Registered Successfully.",
    "data": {
        "id": 1,
        "name": "John",
        "email": "john@example.com",
        "phoneNumber": "",
        "userType": "customer",
        "token": "jwt-token"
    }
}

Success example (login):

{
    "success": true,
    "message": "Login Successfully",
    "data": { ... }
}

Failure example:

{
    "success": false,
    "message": "No User Found",
    "data": null,
    "error": "<database or validation error message>"
}

Rules:
- `message` must match the operation (e.g., "Login Successfully", "Deleted Successfully", "No User Found").
- Include real database or validation error details in the `error` field when available. Do not return opaque success messages for failed or partial operations.
- Keep the top-level shape consistent across endpoints: `success`, `message`, `data`, and optionally `error`.
# COPILOT_INSTRUCTIONS.md

# Dating Platform AI Development Instructions

These instructions are **STRICT** and must be followed throughout the project.

Failure to follow these instructions may introduce bugs, break the project architecture, or make future maintenance difficult.

---

# PRIMARY GOAL

Maintain the existing architecture.

Do not redesign the project.

Do not refactor working code.

Only implement the requested feature or bug fix.

---

# TECHNOLOGY STACK

Frontend

- React (Vite)
- Redux Toolkit
- React Router
- Axios
- Tailwind CSS
- shadcn/ui

Backend

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

# PROJECT STRUCTURE

Always respect the existing folder structure.

Never reorganize folders.

Never rename folders.

Never rename existing files.

Only create new files when absolutely necessary.

---

# FILES THAT MUST NEVER BE MODIFIED

Unless explicitly instructed.

## Frontend

src/App.jsx

src/api/api.js

src/components/layout/

src/components/admin-header/

src/components/check-auth.jsx

These files already implement the application's layout and authentication flow.

Always reuse them.

Never redesign them.

---

## Backend

server/index.js

config/db.js

### server/index.js

Only modify this file when:

- Registering a new route
- Registering middleware

Do not restructure the file.

---

### config/db.js

Never modify this file.

Database configuration is considered complete.

---

# PACKAGE.JSON RULES

Never rewrite package.json.

Never replace package.json.

Never reorder dependencies.

Never remove dependencies.

Only add missing packages.

Example

Good

"jsonwebtoken": "^9.0.2"

Good

"socket.io": "^4.8.0"

Bad

- Rewriting package.json
- Updating unrelated packages
- Removing packages
- Changing scripts

---

# DATABASE RULES

Use Sequelize only.

Use MySQL only.

Never use MongoDB.

Never use Prisma.

Never use raw SQL unless explicitly requested.

---

# DATABASE NAMING

Always use camelCase.

Correct

userId

createdAt

updatedAt

paymentId

conversationId

subscriptionId

Incorrect

user_id

created_at

payment_id

---

# DATABASE TYPES

Never use JSON datatype.

Use only

STRING

TEXT

BOOLEAN

INTEGER

DATE

DECIMAL

ENUM

BIGINT

FLOAT

---

# CONTROLLERS

Business logic belongs inside controllers.

Every controller must follow this structure.

```javascript
const login = async (req, res) => {
    try {

        // Business logic

    } catch (error) {

    }
};

module.exports = {
    login
};
```

Rules

Always use async/await.

Never use .then()

Never use .catch()

Always wrap controller logic inside try/catch.

Return immediately after sending a response.

---

# SERVICES

The services folder may exist.

Do not move business logic into services.

Controllers contain business logic unless instructed otherwise.

---

# ROUTING

Never use generic ids.

Correct

/users/:userId

/profiles/:userId

/messages/:conversationId

/payments/:paymentId

Incorrect

/users/:id

---

# API RESPONSE FORMAT

Every endpoint must return

Success

{
    "success": true,
    "message": "Operation completed successfully.",
    "data": {}
}

Failure

{
    "success": false,
    "message": "Something went wrong.",
    "data": null
}

Never return inconsistent response formats.

---

# AUTHENTICATION

Use JWT.

Use bcrypt.

Use authMiddleware.

Protect private routes.

Never replace the authentication flow.

---

# UI RULES

Always use Tailwind CSS.

Always use shadcn/ui components.

Do not create custom UI components when shadcn already provides one.

Prefer

Button

Card

Dialog

DropdownMenu

AlertDialog

Avatar

Badge

Input

Textarea

Table

Tabs

Tooltip

Toast

Popover

Sheet

Select

Command

Accordion

Calendar

Checkbox

Switch

NavigationMenu

Pagination

Skeleton

Progress

Resizable

ScrollArea

Separator

Use Lucide React icons.

---

# REDUX

Use Redux Toolkit.

Create slices inside

src/redux/

Keep Redux logic separated by feature.

Example

redux/

auth/

user/

profile/

match/

message/

payment/

subscription/

notification/

admin/

---

# LAYOUT

Never redesign the application layout.

Reuse the existing

Layout

Admin Header

Sidebar

Navigation

CheckAuth

Authentication Flow

Maintain UI consistency.

---

# CODE STYLE

Use const whenever possible.

Use arrow functions.

Use camelCase.

Use meaningful variable names.

Keep functions small.

Remove unused imports.

Avoid duplicate code.

Never leave commented-out code.

---

# VALIDATION

Validate every request.

Validate body.

Validate params.

Validate query.

Return proper validation messages.

---

# ERROR HANDLING

Always use try/catch.

Never expose server errors.

Return

{
    "success": false,
    "message": "Internal server error.",
    "data": null
}

Log detailed errors on the server only.

---

# FEATURE DEVELOPMENT

Before creating new code

Search for an existing component.

Search for an existing helper.

Search for an existing utility.

Reuse code whenever possible.

Do not duplicate functionality.

---

# SHADCN/UI

Always install missing shadcn/ui components using the official CLI.

Do not manually recreate components that already exist in shadcn/ui.

---

# AI BEHAVIOR

Before editing any file

Read the existing implementation.

Understand the architecture.

Respect naming conventions.

Respect coding conventions.

Make the smallest possible change.

Never refactor unrelated code.

Never modify working functionality.

Only implement the requested feature.

If unsure, preserve the existing implementation instead of replacing it.

---

# PROJECT GOAL

Build a scalable, production-ready dating platform while preserving a clean, consistent, and maintainable codebase.

Every change should align with these instructions.
