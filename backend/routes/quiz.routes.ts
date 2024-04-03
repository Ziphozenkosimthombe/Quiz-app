import {Router} from 'express';
import {GetAllQuestionsController, CreateQuestionController, GetQuestionsByTopicController, GetCreateController} from '../controllers/create.controllers';
import {protectRoute} from '../middleware/protectRoute'

const router = Router();

router.get('/all', protectRoute, GetAllQuestionsController.getAll);
router.get('/topic', protectRoute, GetQuestionsByTopicController.getByTopic);
router.get('/create', protectRoute, GetCreateController.getCreate);
router.post('/create', protectRoute, CreateQuestionController.create);
router.post('/all/:id', protectRoute, GetAllQuestionsController.getAll);
router.post('/topic', protectRoute, GetQuestionsByTopicController.getByTopic)


const createRoute = router;
export default createRoute;