import mongoose from "mongoose";

/** question model */
const questionSchema = new mongoose.Schema({
    topic: { type: String, required: true },
    questions: [
        {
            questionText: { type: String, required: true },
            answers: { type: Array, required: true },
            correctAnswerIndex: { type: String, required: true }
        }
    ],
    createdAt: { type: Date, default: Date.now },
});

const Questions = mongoose.model('Questions', questionSchema);

export default Questions;

