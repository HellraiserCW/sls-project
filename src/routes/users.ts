import { Router } from 'express';
import { listUsers } from '../controllers/list';
import { getUser } from '../controllers/get';
import { createUser } from '../controllers/create';
import { updateUser } from '../controllers/update';
import { deleteUser } from '../controllers/delete';

const router = Router();

router.get('/', listUsers);
router.get('/:id', getUser);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
