import express from 'express';
import {getAllQuestions, getQuestionsWithSameTopic, create, QuestionTextAlreadyExists} from "../models/question.models";

export class GetAllQuestionsController{
    static async getAll(req: express.Request, res: express.Response){
        try {
            // Get all questions
            const quiz = await getAllQuestions();

            // Send response
            // res.status(200).json(questions);
            res.status(200).render('getQuiz',{
                quiz: quiz,
                user: req.params.user
            })
        } catch (error) {
            console.log(`Error on getting all questions: ${error}`);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}


export class CreateQuestionController{
    static async create(req: express.Request, res: express.Response){
        try {
            const { topic, questions} = req.body;
            

            // Check if all required fields are present
            if (!topic || !questions ) {
                return res.status(400).json({ message: 'All fields are required' });
            }

            const questionExists = await QuestionTextAlreadyExists(questions[0].questionText)
            
            if(questionExists){
                return res.status(400).json({ message: "question already exist please try another one" });
            }
            

            // Create a new question
            const newQuestion = await create({ topic, questions});

            // Send response
            res.status(201).json(newQuestion);
        } catch (error) {
            console.log(`Error on creating question: ${error}`);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

}


export class GetQuestionsByTopicController{
    static async getByTopic(req: express.Request, res: express.Response){
        try {
            const { topic } = req.body;

            // Get questions by topic
            const questions = await getQuestionsWithSameTopic(topic);

            // Send response
            res.status(200).json(questions);
        } catch (error) {
            console.log(`Error on getting questions by topic: ${error}`);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

