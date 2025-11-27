import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true
  }
}, {
  timestamps: true
});

// Prevent duplicate bookings
bookingSchema.index({ userId: 1, eventId: 1 }, { unique: true });

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;

