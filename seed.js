import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Event from './models/Event.js';

dotenv.config();

const events = [
  {
    name: "DeepTech Demo Day",
    description: "Join us for an exciting showcase of cutting-edge deep technology innovations. Meet founders, investors, and tech enthusiasts as startups present their groundbreaking solutions in AI, quantum computing, and advanced robotics.",
    date: "2024-02-15",
    time: "14:00",
    venue: "Tech Hub, Silicon Valley",
    category: "Startup",
    seatsAvailable: 150,
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800"
  },
  {
    name: "AI Hackathon — Bengaluru Edition",
    description: "A 48-hour intensive hackathon focused on building AI-powered solutions. Compete with teams from across India, learn from industry experts, and win exciting prizes. Open to developers, designers, and innovators.",
    date: "2024-02-20",
    time: "09:00",
    venue: "Innovation Center, Bengaluru",
    category: "Hackathon",
    seatsAvailable: 200,
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800"
  },
  {
    name: "SpaceTech Innovation Challenge",
    description: "Explore the future of space technology with industry leaders. This event features talks on satellite technology, space exploration, and commercial space ventures. Network with space tech professionals and enthusiasts.",
    date: "2024-02-25",
    time: "10:00",
    venue: "Space Research Institute, Mumbai",
    category: "Startup",
    seatsAvailable: 100,
    image: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800"
  },
  {
    name: "Founder Networking Meetup",
    description: "An exclusive networking event for startup founders and entrepreneurs. Share experiences, discuss challenges, and build meaningful connections. Includes panel discussions and one-on-one networking sessions.",
    date: "2024-03-01",
    time: "18:00",
    venue: "Co-working Space, Delhi",
    category: "Meetup",
    seatsAvailable: 80,
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800"
  },
  {
    name: "Hardware Bootcamp for Students",
    description: "Learn hands-on hardware development in this intensive bootcamp designed for students. Build IoT devices, work with microcontrollers, and get mentored by hardware engineering experts. All materials provided.",
    date: "2024-03-05",
    time: "09:00",
    venue: "Engineering College, Pune",
    category: "Meetup",
    seatsAvailable: 60,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800"
  }
];

const seedEvents = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected');

    // Clear existing events
    await Event.deleteMany({});
    console.log('Events cleared');

    // Insert events
    await Event.insertMany(events);
    console.log('Events seeded successfully');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding events:', error);
    process.exit(1);
  }
};

seedEvents();


