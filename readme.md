# Digital Diner

A mini-restaurant ordering prototype built with the MERN + PostgreSQL stack.

## Table of Contents

- [Digital Diner](#digital-diner)
  - [Table of Contents](#table-of-contents)
  - [Description](#description)
  - [Tech Stack](#tech-stack)
  - [Setup \& Running Locally](#setup--running-locally)
    - [Backend](#backend)
    - [Frontend](#frontend)
  - [Database Design](#database-design)
  - [API Endpoints](#api-endpoints)
    - [Menu (`/api/menu`)](#menu-apimenu)
    - [Orders (`/api/orders`)](#orders-apiorders)
  - [Deployment](#deployment)
  - [Assumptions \& Challenges](#assumptions--challenges)

---

## Description

Digital Diner allows users to browse a menu, manage a shopping cart, and place pickup orders without payment processing. It includes an admin interface for CRUD operations on menu items.

---

## Tech Stack

- **Frontend:** React, Vite, Tailwind CSS, React Router
- **Backend:** Node.js, Express
- **Databases:** MongoDB (menu items), PostgreSQL (orders)
- **ORM/Drivers:** Mongoose, `pg`
- **Deployment:** Netlify (frontend), e.g., Heroku/Render/Fly.io (backend)

---

## Setup & Running Locally

### Backend

1. Clone the repository and navigate to the server folder:
   ```bash
   git clone <YOUR_REPO_URL>
   cd digital-diner/server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with:
   ```env
   MONGODB_URI=<your-mongodb-connection-string>
   POSTGRES_URI=<your-postgres-connection-string>
   PORT=5000
   ```
4. Ensure MongoDB and PostgreSQL are running:
   - **MongoDB:** `mongod` or Atlas cluster
   - **PostgreSQL:** local service or hosted (ensure the `POSTGRES_URI` is reachable)
5. Start the server:
   ```bash
   npm run start
   ```
   You should see:
   ```text
   MongoDB connected
   PostgreSQL connected
   Server running on port 5000
   ```

### Frontend

1. In a new terminal, navigate to the client folder:
   ```bash
   cd ../client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file (optional) to set API URL:
   ```env
   VITE_API_URL=http://localhost:5000
   ```
4. Start the dev server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Database Design

- **MongoDB** for **menu items**: flexible document schema, easy schema evolution for item details (images, descriptions, optional fields).
- **PostgreSQL** for **orders**: relational integrity, structured data for user contact, order history, and JSONB for cart items.

Justification: menu items change frequently in shape and content, whereas orders require ACID properties and consistent record-keeping.

---

## API Endpoints

### Menu (`/api/menu`)

| Method | Endpoint           | Description                             |
| ------ | ------------------ | --------------------------------------- |
| GET    | `/`                | Fetch all menu items (no filter)        |
| GET    | `/category?category=<name>` | Fetch items by category          |
| GET    | `/:id`             | Fetch single item by ID                 |
| POST   | `/`                | Create a new menu item                  |
| PUT    | `/:id`             | Update an existing menu item            |
| DELETE | `/:id`             | Delete a menu item                      |

### Orders (`/api/orders`)

| Method | Endpoint           | Description                             |
| ------ | ------------------ | --------------------------------------- |
| POST   | `/`                | Place a new order                       |
| GET    | `/:phone`          | Fetch orders by phone number            |

---

## Deployment

- **Frontend:** [Netlify Deployment Link](https://your-netlify-app.netlify.app)
- **Backend:** Running on Heroku/Render at `https://your-backend.herokuapp.com`

---

## Assumptions & Challenges

- **No authentication**: orders are tied to a phone number only.
- **Image hosting**: assumes menu item images are externally hosted.
- **Quantity updates**: in-cart quantity managed client-side without stock tracking.
- **Challenges:** handling CORS with Vite proxy, managing two DB connections, and ensuring consistent error handling.

---
