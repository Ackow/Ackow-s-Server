const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    message: { type: String, required: true },
    avatarIndex: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
    location: { type: String } 
});

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;
