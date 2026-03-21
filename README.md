# Hotel Booking System API

A RESTful API for managing hotel bookings built with Node.js, Express, TypeScript, and PostgreSQL.

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express
- **Language**: TypeScript
- **Database**: PostgreSQL
- **Validation**: Joi
- **Authentication**: JWT

---

## Getting Started

### Prerequisites

- Node.js v18+
- PostgreSQL
- npm or yarn

### Installation

```bash
git clone https://github.com/your-repo/hotel-booking-api
cd hotel-booking-api
npm install
```

### Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3000
DATABASE_URL=postgresql://user:password@localhost:5432/hotel_db
JWT_SECRET=your_jwt_secret
```

### Run the Server

```bash
# Development
npm run dev

# Production
npm run build
npm start
```

---

## Database Schema

### Users
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(20) DEFAULT 'guest',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Rooms
```sql
CREATE TABLE rooms (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price NUMERIC(10, 2) NOT NULL,
  capacity INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Bookings
```sql
CREATE TABLE bookings (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  room_id INTEGER REFERENCES rooms(id) ON DELETE CASCADE,
  start_date TIMESTAMPTZ NOT NULL,
  end_date TIMESTAMPTZ NOT NULL,
  guests INTEGER NOT NULL,
  status VARCHAR(20) DEFAULT 'pending',
  payment_method_id INTEGER REFERENCES payment_methods(id),
  booked_by INTEGER NULL REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Payment Methods
```sql
CREATE TABLE payment_methods (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL,
  details JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## API Endpoints

### Auth

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/v1/users/register` | Register a new user | Public |
| POST | `/api/v1/users/login` | Login and get JWT token | Public |

### Bookings

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/v1/bookings` | Get all bookings | Admin |
| GET | `/api/v1/bookings/:id` | Get booking by ID | Auth |
| POST | `/api/v1/bookings` | Create a booking | Auth |
| PUT | `/api/v1/bookings/:id` | Update a booking | Auth |
| DELETE | `/api/v1/bookings/:id` | Cancel a booking | Auth |
| GET | `/api/v1/bookings/check` | Check room availability | Auth |

### Rooms

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/v1/rooms` | Get all rooms | Public |
| GET | `/api/v1/rooms/:id` | Get room by ID | Public |
| POST | `/api/v1/rooms` | Create a room | Admin |
| PUT | `/api/v1/rooms/:id` | Update a room | Admin |
| DELETE | `/api/v1/rooms/:id` | Delete a room | Admin |

### Payment Methods

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/v1/payment-methods` | Get user payment methods | Auth |
| POST | `/api/v1/payment-methods` | Add a payment method | Auth |
| DELETE | `/api/v1/payment-methods/:id` | Remove a payment method | Auth |

---

## Request & Response Examples

### Create Booking

**POST** `/api/v1/bookings`

Request body:
```json
{
  "room_id": 1,
  "start_date": "2026-07-12T12:00:00",
  "end_date": "2026-07-13T12:00:00",
  "guests": 2,
  "payment_method_id": 1
}
```

Response:
```json
{
  "success": true,
  "message": "Booking created successfully",
  "data": {
    "id": 1,
    "user_id": 1,
    "room_id": 1,
    "start_date": "2026-07-12T12:00:00.000Z",
    "end_date": "2026-07-13T12:00:00.000Z",
    "guests": 2,
    "status": "pending",
    "booked_by": null,
    "created_at": "2026-03-21T08:00:00.000Z"
  }
}
```

### Check Room Availability

**GET** `/api/v1/bookings/check?room_id=1&start_date=2026-07-12T12:00:00&end_date=2026-07-13T12:00:00`

Response:
```json
{
  "success": true,
  "message": "Room is available"
}
```

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

---

## Roles

| Role | Permissions |
|------|-------------|
| `guest` | Create/view own bookings, manage own payment methods |
| `admin` | Full access, book on behalf of guests, manage rooms |

Admins can book on behalf of guests — the `booked_by` field tracks which admin created the booking.

---

## Validation

Dates must be in **ISO 8601** format:

```
✅ 2026-07-12T12:00:00
✅ 2026-07-12T12:00:00.000Z
❌ July 12, 2026
❌ 07/12/2026
```

---

## Project Structure

```
src/
├── controllers/
│   ├── authController.ts
│   ├── bookingController.ts
│   ├── roomController.ts
│   └── paymentMethodController.ts
├── models/
│   ├── userModel.ts
│   ├── bookingModel.ts
│   ├── roomModel.ts
│   └── paymentMethodModel.ts
├── middleware/
│   ├── authMiddleware.ts
│   └── validationMiddleware.ts
├── routes/
│   ├── authRoutes.ts
│   ├── bookingRoutes.ts
│   ├── roomRoutes.ts
│   └── paymentMethodRoutes.ts
├── types/
│   ├── bookingTypes.ts
│   ├── userTypes.ts
│   └── express.d.ts
├── validation/
│   ├── bookingValidation.ts
│   └── authValidation.ts
├── config/
│   └── db.ts
└── index.ts
```

---

## Error Responses

```json
{
  "error": "Room is not available for the selected dates"
}
```

| Status Code | Meaning |
|-------------|---------|
| 400 | Bad request / validation error |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not found |
| 409 | Conflict (e.g. room already booked) |
| 500 | Internal server error |
