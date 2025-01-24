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
  name: { type: String, required: true },
  message: { type: String, required: true },
  timestamp: { type: String, required: true },
  received: { type: Boolean, required: true },
});

// Create and export the model
const Messages = mongoose.model('kasers', messageSchema);

export default Messages;
