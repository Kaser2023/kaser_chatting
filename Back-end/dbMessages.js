// CREATE TABLE messages (
//     id SERIAL PRIMARY KEY,
//     name TEXT NOT NULL,
//     message TEXT NOT NULL,
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//   );

// export default mongoose.model('messageContent', whatsappSchema)



import mongoose from 'mongoose';

// Define the message schema
const messageSchema = new mongoose.Schema({
  key: {
    type: Number,
    // required: true,
    unique: true // Ensure the key is unique
  },
  name: { type: String, required: true },
  message: { type: String, required: true },
  timestamp: { type: String, required: true },
  received: { type: Boolean, default: false }, // Default to false
});

// Create and export the model
const Messages = mongoose.model('kasers', messageSchema);

export default Messages;
