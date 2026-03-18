import router from "express";
import { authenticateToken } from "../middleware/authentication.middleware";
import { createBooking } from "../controller/bookings.controller";
const bookingsRouter = router.Router();

// Define your booking routes here
bookingsRouter.post("/create", authenticateToken, createBooking);

export default bookingsRouter;
