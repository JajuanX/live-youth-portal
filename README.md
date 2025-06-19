# 🏀 Youth Sports Transfer Portal

A web platform that brings the excitement of collegiate-style athlete transfers to youth sports. Players can create profiles, announce commitments to new teams using dynamic templates, and share their journey with the world.

---

## 🚀 Live Demo

> Coming Soon...

---

## 📸 Project Overview

Inspired by real-life youth athletes announcing team changes on social media, this app lets players:
- Create and manage athlete profiles.
- Browse teams and request to join.
- Generate and share stylized commitment graphics.
- Interact with the community through real-time notifications.

---

## 🧱 Tech Stack

### Frontend
- **React** (Vite)
- **React Router DOM**
- **Axios**
- **SCSS Modules (BEM)**
- **Cloudinary or S3** (Image Uploads)
- **Canvas/Fabric.js** (Announcement Generator)

### Backend
- **Node.js + Express**
- **MongoDB + Mongoose**
- **JWT Authentication**
- **Multer or Cloudinary SDK** (Image Upload)
- **Nodemailer** (Email Notifications, Optional)

---

## 📦 Features (MVP)

### ✅ User Authentication
- JWT-based secure login/signup
- Role-based access (Player, Team Admin)

### ✅ Player Profiles
- Add bio, stats, position, age, and photo
- Manage commitments and announcements

### ✅ Team Management
- Teams can create profiles with logos and bios
- Accept or reject join requests

### ✅ Transfer Announcements
- Create visual transfer graphics
- Select templates, add images and text
- Download or share to social platforms

### ✅ Commitment Workflow
- Athletes send "Request to Join" to teams
- Teams review and approve
- Approved commitments trigger announcement flow

### ✅ Social Sharing
- Share announcements via Facebook, Instagram, etc.
- Downloadable graphics for printing or posting

---

## 📁 Project Structure

```bash
youth-transfer-portal/
│
├── backend/
│   ├── models/            # Mongoose Schemas
│   ├── controllers/       # Route logic and DB operations
│   ├── routes/            # Express routes
│   ├── middleware/        # Auth and error handling
│   ├── services/          # 3rd party integrations (e.g. Cloudinary)
│   └── app.js             # Express server config
│
├── frontend/
│   ├── components/        # Reusable UI components
│   ├── pages/             # Route-based views
│   ├── context/           # Global state using custom hooks
│   ├── services/          # Axios API wrappers
│   ├── scss/              # Component-level SCSS modules
│   └── main.jsx           # Entry point
│
└── README.md
