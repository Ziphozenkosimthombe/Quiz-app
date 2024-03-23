import Questions from "../models/question.models";

export const createQuestion = async (req, res) => {
    try {
        const { topic, questions} = req.body;

        // Check if all required fields are present
        if (!topic || !questions ) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const topicExists = await Questions.findOne({ topic})
        
        if(topicExists){
            return res.status(400).json({ message: "topic already exist" });
        }
        

        // Create a new question
        const newQuestion = await Questions.create({
            topic,
            questions,
        })

        // Send response
        res.status(201).json(newQuestion);
    } catch (error) {
        console.error('Error on creating question:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
