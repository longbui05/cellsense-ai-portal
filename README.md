# CellSense AI Portal

## Overview

CellSense AI Portal is an AI-powered smartphone information website that helps users search, compare, and explore smartphones with the assistance of an AI chatbot.

---

# Features

## User Features

* User Registration
* User Login
* View Smartphone List
* Search Smartphones
* Filter by Brand
* Filter by Price
* Filter by RAM
* Filter by Storage
* Pagination
* View Phone Details
* Compare Two Smartphones
* Add to Favorites
* AI Assistant

## Admin Features

* Add New Phone
* Edit Phone Information
* Delete Phone

---

# Technologies Used

## Frontend

* React.js
* React Router DOM
* Bootstrap 5
* Axios
* SweetAlert2

## Backend

* Node.js
* Express.js
* MySQL
* JWT Authentication
* bcrypt
* Multer
* OpenRouter AI API

---

# Requirements

* Node.js (v18 or later)
* MySQL Server / XAMPP
* Visual Studio Code

---

# Installation

## Clone the project

```bash
git clone <repository-url>
```

---

## Install Backend

```bash
cd backend
npm install
```

---

## Install Frontend

```bash
cd frontend
npm install
```

---

# Environment Configuration

Create a `.env` file inside the **backend** folder.

```env
PORT=5000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=cellsense_ai

JWT_SECRET=your_secret_key

OPENROUTER_API_KEY=your_openrouter_api_key
```

---

# Database

Import the provided SQL file before running the project.

Database name:

```text
cellsense_ai
```

SQL file:

```text
database/cellsense_ai.sql
```

Main tables:

* brands
* phones
* users
* favorites
* reviews

---

# Project Structure

```text
cellsense-ai-portal/

├── frontend/
├── backend/
├── database/
└── README.md
```

---

# Author

CellSense AI Portal

AI-Powered Smartphone Information Website
