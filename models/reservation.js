import mongoose, { Schema } from "mongoose";

const reservationSchema = new Schema(
  {
    name: String,
    phone: String,
    email: String,
    numberOfPeople: Number,
    numberOfChildren: Number,
    date: String,
    start: String,
    durationInHours: Number,
    specialRequests: String,
    code: String,
    status: String,
  },
  {
    timestamps: true,
  }
);

const Reservation = mongoose.models.Reservation || mongoose.model("Reservation", reservationSchema);

export default Reservation;