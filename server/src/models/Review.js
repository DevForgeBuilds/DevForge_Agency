import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
    clientName: { type: String, required: true, trim: true },
    company: { type: String, default: '' },
    email: { type: String, default: '' },
    message: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5, default: 5 },
    photo: { type: String, default: '' },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
}, { timestamps: true });

export default mongoose.model('Review', reviewSchema);
