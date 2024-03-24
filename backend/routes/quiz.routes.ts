import {Router} from 'express';
import {createQuestion, getByTopic, getAll} from '../controllers/create.controllers';
import {protectRoute} from '../middleware/protectRoute'

const router = Router();

router.get('/all', protectRoute, getAll);
router.get('/topic', protectRoute, getByTopic);
router.post('/create/:id', protectRoute, createQuestion);

export default router;