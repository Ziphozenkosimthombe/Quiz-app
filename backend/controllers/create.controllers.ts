import express from 'express';
import {getAllQuestions, create, QuestionTextAlreadyExists, getCreate} from "../models/question.models";


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


export class CreateQuestionController {
    static async create(req: express.Request, res: express.Response) {
        try {
            const { topic, questionText, answer0, answer1, answer2, correctAnswerIndex, creatorId } = req.body;

            console.log(req.body)

            // Check if all required fields are present
            // if (!topic || !questionText || ![answer0, answer1, answer2, answer3, answer4].every(Boolean) || isNaN(parseInt(correctAnswerIndex))) {
            //     return res.status(400).json({ message: 'All fields are required and correctAnswerIndex must be a number' });
            // }

            if (!topic || !questionText || ![answer0, answer1, answer2] || !correctAnswerIndex) {
                return res.status(400).json({ message: 'All fields are required' });
            }

            if (isNaN(parseInt(correctAnswerIndex))){
                return res.status(400).json({message: 'correctAnswerIndex must be a number'})
            }

            const questionTextExists = await QuestionTextAlreadyExists(questionText);
            if (questionTextExists){
                return res.status(400).json({message: 'Question already exists'})
            }
            

            // Create a new question
            await create({
                topic,
                questions: [{
                    questionText,
                    answers: [answer0, answer1, answer2],
                    correctAnswerIndex: parseInt(correctAnswerIndex)
                }],
                creatorId
            });

            // Send response
            res.status(201).redirect('/api/quiz/create');
        } catch (error) {
            console.error(`Error on creating question: ${error}`);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

export class GetCreateController{
    static async getCreate(req: express.Request, res: express.Response){
        try {
            // Get all questions
            const quiz = await getCreate();

            // Send response
            res.status(200).render('createQuiz',{
                quiz: quiz,
                user: req.params.user
            });
        } catch (error) {
            console.log(`Error on getting all questions: ${error}`);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

// export class GetQuestionsByTopicController{
//     static async getByTopic(req: express.Request, res: express.Response){
//         try {
//             const { topic } = req.params;

//             // Get questions by topic
//             const quiz = await getQuestionsWithSameTopic(topic);
            
//             // Send response
//             res.status(302).render('getQuiz',{
//                 quiz: quiz,
//                 user: req.params.user
            
//             });
//         } catch (error) {
//             console.log(`Error on getting questions by topic: ${error}`);
//             res.status(500).json({ message: 'Internal server error' });
//         }
//     }
// }

