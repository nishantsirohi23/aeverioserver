const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
  flightNo: String,
  origin: String,
  destination: String,
  departureDate: String,
  departureTime: String,
  arrivalDate: String,
  arrivalTime: String
});

const hotelSchema = new mongoose.Schema({
  name: String,
  city: String,
  checkIn: String,
  checkOut: String
});

const itinerarySchema = new mongoose.Schema({
  day: Number,
  title: String,
  highlight: String,
  icon: String,
  timeline: [
    {
      time: String,
      activity: String,
      type: {
        type: String,
       
        default: 'activity'
      }
    }
  ]
});

const packageSchema = new mongoose.Schema({
  title: String,
  tagline: String,
  duration: String,
  noOfAdults: Number,
  travelDate: String,
  flightDetails: {
    airline: String,
    farePerPerson: String,
    baggage: {
      checkIn: String,
      hand: String
    },
    flights: [flightSchema]
  },
  hotelDetails: [hotelSchema],
  itinerary: [itinerarySchema],
  imageUrls: [String], // ✅ Added field for image URLs
  landPackageCost: String,
  inclusions: [String],
  exclusions: [String],
  notes: [String],
  termsAndConditions: [String],
  cancellationPolicy: [String],
  bookingConditions: [String],
  additionalNotes: [String],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Package', packageSchema);
