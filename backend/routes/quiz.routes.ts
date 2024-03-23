import {Router} from 'express';
import {createQuestion} from '../controllers/create.controllers';
import {protectRoute} from '../middleware/protectRoute'

const router = Router();

router.post('/create/:id', protectRoute, createQuestion);

export default router;