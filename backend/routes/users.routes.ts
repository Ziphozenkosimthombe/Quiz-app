import {Router} from 'express';
import {GetAllUsersController, DeleteUserByIdController} from '../controllers/users.controllers';
import {protectRoute} from '../middleware/protectRoute'


const router = Router();

router.get('/', GetAllUsersController.getAllUsers);
router.delete('/:id', protectRoute, DeleteUserByIdController.deleteUser);


export default router;