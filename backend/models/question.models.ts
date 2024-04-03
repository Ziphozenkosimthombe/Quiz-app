import mongoose from "mongoose";

/** question model */
const questionSchema = new mongoose.Schema({
    creatorId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    topic: { type: String, required: true },
    questions: [
        {
            questionText: { type: String, required: true },
            answers: { type: Array, required: true },
            correctAnswerIndex: {type: Number, required: true}
        }
    ],
    createdAt: { type: Date, default: Date.now },
});

const Questions = mongoose.model('Questions', questionSchema);

export default Questions;

export const getAllQuestions = () => Questions.find();
export const getQuestionsWithSameTopic = (topic: string) => Questions.find({ topic });
export const QuestionTextAlreadyExists = (questionText: string) => Questions.findOne({ questions: { $elemMatch: { questionText } }});
export const create = (values: Record<string, any>) => new Questions(values).save().then((questions) => questions.toObject());
export const getCreate = () => Questions.find().populate('creatorId', 'username').then((questions) => questions.map((question) => question.toObject()));
