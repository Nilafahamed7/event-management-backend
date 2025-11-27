import express from 'express';
import Booking from '../models/Booking.js';
import Event from '../models/Event.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// @route   POST /api/bookings
// @desc    Book an event
router.post('/', protect, async (req, res) => {
  try {
    const { eventId } = req.body;
    const userId = req.user._id;

    if (!eventId) {
      return res.status(400).json({ message: 'Event ID is required' });
    }

    // Check if event exists
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check if already booked
    const existingBooking = await Booking.findOne({ userId, eventId });
    if (existingBooking) {
      return res.status(400).json({ message: 'Event already booked' });
    }

    // Check seat availability
    if (event.seatsAvailable <= 0) {
      return res.status(400).json({ message: 'No seats available' });
    }

    // Create booking
    const booking = await Booking.create({ userId, eventId });

    // Update event seats
    event.seatsAvailable -= 1;
    await event.save();

    res.status(201).json({
      message: 'Event booked successfully',
      booking
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Event already booked' });
    }
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/bookings
// @desc    Get user bookings
router.get('/', protect, async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user._id })
      .populate('eventId')
      .sort({ createdAt: -1 });
    
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/bookings/check/:eventId
// @desc    Check if event is booked by user
router.get('/check/:eventId', protect, async (req, res) => {
  try {
    const booking = await Booking.findOne({
      userId: req.user._id,
      eventId: req.params.eventId
    });
    
    res.json({ booked: !!booking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;

