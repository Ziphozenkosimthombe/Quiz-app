import {Router} from 'express';
import {getAllUsers, deleteUser} from '../controllers/users.controllers';
import {protectRoute} from '../middleware/protectRoute'


const router = Router();

router.get('/', getAllUsers);
router.delete('/:id', protectRoute, deleteUser);


export default router;