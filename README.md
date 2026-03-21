# Booking App Server

A RESTful API for managing hotel bookings built with Node.js, Express, TypeScript, and PostgreSQL.

---

## Tech Stack

| | |
|---|---|
| **Runtime** | Node.js |
| **Framework** | Express 5 |
| **Language** | TypeScript |
| **Database** | PostgreSQL (`pg`) |
| **Validation** | Joi |
| **Authentication** | JWT + Bcrypt |
| **Dev Tools** | ts-node, nodemon |

---

## Getting Started

### Prerequisites

- Node.js v18+
- PostgreSQL
- npm

### Installation

```bash
git clone https://github.com/cjcaber09/booking-app-server.git
cd booking-app-server
npm install
```

### Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3000
DATABASE_URL=postgresql://user:password@localhost:5432/booking_db
JWT_SECRET=your_jwt_secret
```

### Scripts

```bash
npm run dev        # Start development server with nodemon
npm run build      # Compile TypeScript to dist/
npm start          # Run compiled production server
npm run seed       # Seed the database
npm run dropdb     # Drop the database
npm run watch      # Watch and recompile TypeScript
```

---

## Project Structure

```
src/
├── config/
│   ├── migrations/       # Database migration files
│   ├── db.ts             # PostgreSQL pool connection
│   ├── dbdrop.ts         # Drop database script
│   └── seed.ts           # Seed database script
├── controller/
│   ├── bookings.controller.ts
│   ├── payment_methods.controller.ts
│   ├── rooms.controller.ts
│   └── users.controller.ts
├── middleware/
│   ├── admin.middleware.ts           # Admin role guard
│   └── authentication.middleware.ts  # JWT auth guard
├── models/
│   ├── bookings.model.ts
│   ├── payment_methods.models.ts
│   ├── rooms.model.ts
│   └── users.model.ts
├── router/
│   ├── bookings.routes.ts
│   ├── payment_methods.routes.ts
│   ├── rooms.routes.ts
│   └── users.router.ts
├── types/
│   ├── bookings.types.ts
│   ├── express.d.ts               # Express Request augmentation
│   ├── payment_methods.types.ts
│   ├── rooms.types.ts
│   └── users.types.ts
├── utils/
│   ├── destructuring.ts
│   └── utils.ts
├── validation/
│   ├── bookings.validation.ts
│   ├── payment_methods.validation.ts
│   ├── payments.validation.ts
│   ├── rooms.validation.ts
│   ├── user.middleware.ts
│   └── users.validation.ts
└── server.ts
```

---

## API Endpoints

### Users

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/v1/users/register` | Register a new user | Public |
| POST | `/api/v1/users/login` | Login and receive JWT | Public |
| GET | `/api/v1/users` | Get all users | Admin |
| GET | `/api/v1/users/:id` | Get user by ID | Auth |
| PUT | `/api/v1/users/:id` | Update user | Auth |
| DELETE | `/api/v1/users/:id` | Delete user | Admin |

### Rooms

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/v1/rooms` | Get all rooms | Public |
| GET | `/api/v1/rooms/:id` | Get room by ID | Public |
| POST | `/api/v1/rooms` | Create a room | Admin |
| PUT | `/api/v1/rooms/:id` | Update a room | Admin |
| DELETE | `/api/v1/rooms/:id` | Delete a room | Admin |

### Bookings

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/v1/bookings` | Get all bookings | Admin |
| GET | `/api/v1/bookings/:id` | Get booking by ID | Auth |
| GET | `/api/v1/bookings/check` | Check room availability | Auth |
| POST | `/api/v1/bookings` | Create a booking | Auth |
| PUT | `/api/v1/bookings/:id` | Update a booking | Auth |
| DELETE | `/api/v1/bookings/:id` | Cancel a booking | Auth |

### Payment Methods

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/v1/payment-methods` | Get user payment methods | Auth |
| POST | `/api/v1/payment-methods` | Add a payment method | Auth |
| DELETE | `/api/v1/payment-methods/:id` | Remove a payment method | Auth |

---

## Authentication

All protected routes require a Bearer token in the `Authorization` header:

```
Authorization: Bearer <your_jwt_token>
```

The JWT payload contains:

```json
{
  "id": 1,
  "role": "guest",
  "email": "user@email.com"
}
```

Tokens are verified by `authentication.middleware.ts` and the decoded payload is attached to `req.user`.

---

## Roles & Middleware

| Middleware | File | Purpose |
|---|---|---|
| `authMiddleware` | `authentication.middleware.ts` | Verifies JWT, attaches `req.user` |
| `adminMiddleware` | `admin.middleware.ts` | Restricts route to `admin` role only |

| Role | Permissions |
|------|-------------|
| `guest` | Create/view own bookings, manage own payment methods |
| `admin` | Full access, book on behalf of guests, manage rooms and users |

Admins can create bookings on behalf of guests. The `booked_by` column in the bookings table tracks which admin made the booking.

---

## Validation

All request bodies are validated using **Joi** before reaching the controller.

Dates must be in **ISO 8601** format:

```
✅ 2026-07-12T12:00:00
✅ 2026-07-12T12:00:00.000Z
❌ July 12, 2026
❌ 07/12/2026
❌ 07-12-2026 12:00pm
```

Booking validation enforces:
- `end_date` must be after `start_date`
- `guests` must be a positive integer
- `status` is restricted to `pending`, `confirmed`, or `cancelled`
- Admins can set any status; guests are limited to `pending`

---

## Room Availability Check

**GET** `/api/v1/bookings/check`

Query params:

| Key | Example |
|-----|---------|
| `room_id` | `1` |
| `start_date` | `2026-07-12T12:00:00` |
| `end_date` | `2026-07-13T12:00:00` |

Returns `409` if the room has a conflicting booking, `200` if available.

---

## Database

Dates are stored as **`TIMESTAMPTZ`** (timestamp with time zone) to correctly handle guests across different timezones. All times are stored in UTC and localized on the frontend.

### Key Tables

```
users            - id, username, email, password, role
rooms            - id, name, description, price, capacity
bookings         - id, user_id, room_id, start_date, end_date, guests, status, booked_by, payment_method_id
payment_methods  - id, user_id, type, details
```

Run migrations via the `config/migrations/` folder and seed initial data with:

```bash
npm run seed
```

To reset the database:

```bash
npm run dropdb
```

---

## Error Responses

```json
{
  "error": "Room is not available for the selected dates"
}
```

| Status | Meaning |
|--------|---------|
| 400 | Validation error |
| 401 | Unauthorized — missing or invalid token |
| 403 | Forbidden — insufficient role |
| 404 | Resource not found |
| 409 | Conflict — e.g. room already booked |
| 500 | Internal server error |
