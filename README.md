# SkillSwap

A production-ready full-stack MERN application that enables users to exchange skills through a peer-to-peer learning platform.

Instead of purchasing online courses, users can teach the skills they already possess in exchange for learning new ones from others. SkillSwap provides intelligent matching, swap requests, real-time messaging, notifications, ratings, and an administrative dashboard to create a secure and collaborative learning community.

---

# Features

## Authentication & Security

* JWT Authentication
* HTTP-only Cookie Authentication
* Role-Based Authorization
* Password Hashing using bcrypt
* Protected Routes
* Request Validation with Zod
* Secure REST APIs

---

## User Profiles

* Create and manage profile
* Update profile information
* Avatar support
* Bio & location
* Skills to Teach
* Skills to Learn
* Public profile pages
* Trust Score system

---

## Skill Management

* Browse available skills
* Search skills
* Skill categories
* Request new skills
* Admin approval workflow
* Skill management dashboard

---

## Smart Matching

Find users based on:

* Skills offered
* Skills requested
* Location
* Mutual compatibility

---

## Skill Swaps

* Send swap requests
* Accept requests
* Reject requests
* Complete swaps
* View swap history
* Track current swaps

---

## Real-Time Chat

Powered by Socket.IO

* Instant messaging
* Dedicated chat room for each swap
* Persistent chat history
* Real-time communication

---

## Notifications

* Real-time notifications
* Swap request notifications
* Chat notifications
* Read/Unread status
* Notification counter

---

## Rating & Trust System

* Rate completed swaps
* User reviews
* Automatic trust score updates

---

## Dashboard

### User Dashboard

* Statistics overview
* Recent swaps
* Notifications
* Quick actions
* Recent chats

### Admin Dashboard

* User management
* Skill approval
* Platform statistics
* Activity monitoring

---

# Tech Stack

## Frontend

* React 19
* TypeScript
* Vite
* React Router
* Tailwind CSS
* Zustand
* Axios
* Socket.IO Client
* React Hook Form
* React Toastify
* Lucide React

---

## Backend

* Node.js
* Express.js
* TypeScript
* MongoDB
* Mongoose
* Socket.IO
* JWT
* bcrypt
* Zod
* Swagger API Documentation

---

## Architecture

```
Client (React)
        │
        │
 REST API + Socket.IO
        │
        ▼
Express Server
        │
 ├── Authentication
 ├── Users
 ├── Skills
 ├── Swaps
 ├── Chat
 ├── Notifications
 ├── Ratings
 └── Admin
        │
        ▼
MongoDB
```

---

# Project Structure

```
SkillSwap
│
├── client
│   ├── src
│   │   ├── components
│   │   ├── features
│   │   ├── hooks
│   │   ├── layouts
│   │   ├── pages
│   │   ├── services
│   │   ├── store
│   │   ├── types
│   │   └── utils
│
├── server
│   ├── src
│   │   ├── config
│   │   ├── controllers
│   │   ├── middleware
│   │   ├── models
│   │   ├── routes
│   │   ├── sockets
│   │   ├── validators
│   │   ├── utils
│   │   └── seeds
│
└── README.md
```

---

# REST API

## Authentication

```
POST    /api/auth/register
POST    /api/auth/login
POST    /api/auth/logout
GET     /api/auth/me
```

---

## Users

```
GET     /api/users/me
PATCH   /api/users/me
GET     /api/users/search
GET     /api/users/:id
```

---

## Skills

```
GET     /api/skills
POST    /api/skills/request
GET     /api/skills/pending
PATCH   /api/skills/:id/approve
DELETE  /api/skills/:id/reject
```

---

## Swaps

```
POST    /api/swaps/send
GET     /api/swaps
GET     /api/swaps/:id
PATCH   /api/swaps/:id/accept
PATCH   /api/swaps/:id/reject
PATCH   /api/swaps/:id/complete
```

---

## Chat

```
GET     /api/chat
GET     /api/chat/:swapId
```

---

## Notifications

```
GET     /api/notifications
GET     /api/notifications/unread-count
PATCH   /api/notifications/:id/read
PATCH   /api/notifications/read-all
DELETE  /api/notifications/:id
```

---

## Ratings

```
POST    /api/ratings
GET     /api/ratings/:userId
```

---

# Installation

## Clone Repository

```bash
git clone https://github.com/<your-username>/SkillSwap.git
cd SkillSwap
```

---

## Backend Setup

```bash
cd server

npm install
```

Create a `.env` file:

```env
PORT=5000

MONGODB_URI=

JWT_SECRET=

CLIENT_URL=http://localhost:5173
```

Run the backend:

```bash
npm run dev
```

---

## Frontend Setup

```bash
cd client

npm install

npm run dev
```

---

## Run Both Applications

From the project root:

```bash
pnpm dev
```

---

# Current Modules

* Authentication
* User Profiles
* Skill Management
* Smart Matching
* Skill Swaps
* Real-Time Chat
* Notifications
* Ratings
* Dashboard
* Admin Panel

---

# Feature Improvements Expected

* Cloudinary Image Uploads
* OAuth (Google & GitHub)
* Video Calling
* AI-Based Skill Recommendations
* Online Presence
* Typing Indicators
* Read Receipts
* Push Notifications
* Email Notifications
* Advanced Search Filters
* Mobile Responsiveness
* Unit Testing
* Integration Testing
* Docker Deployment
* CI/CD Pipeline

---


