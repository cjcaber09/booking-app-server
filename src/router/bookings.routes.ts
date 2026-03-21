import router from "express";
import { authenticateToken } from "../middleware/authentication.middleware";
import { createBooking } from "../controller/bookings.controller";
const bookingsRouter = router.Router();
import { validateBookingSchema } from "../validation/user.middleware";
import { checkRoomAvailability } from "../controller/bookings.controller";
// Define your booking routes here
bookingsRouter.post(
  "/create",
  authenticateToken,
  validateBookingSchema,
  createBooking,
);
bookingsRouter.get("/check", validateBookingSchema, checkRoomAvailability);


export default bookingsRouter;
