import {Router} from 'express';
import {GetAllQuestionsController, CreateQuestionController, GetQuestionsByTopicController} from '../controllers/create.controllers';
import {protectRoute} from '../middleware/protectRoute'

const router = Router();

router.get('/all', protectRoute, GetAllQuestionsController.getAll);
router.get('/topic', protectRoute, GetQuestionsByTopicController.getByTopic);
router.post('/create/:id', protectRoute, CreateQuestionController.create);


const createRoute = router;
export default createRoute;