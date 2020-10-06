import { Router } from 'express';
import UsersController from './controllers/UsersController';
import ClassesController from './controllers/ClassesController';
import ConnectionsController from './controllers/ConnectionsController';

const router = Router();

router.post('/users', UsersController.create);
router.get('/users', UsersController.index);
router.put('/users/:id', UsersController.update);
router.delete('/users/:id', UsersController.delete);

router.get('/classes', ClassesController.index);
router.post('/classes', ClassesController.create);
// router.put('/classes', ClassesController.update);
// router.delete('/classes', ClassesController.delete);

router.post('/connections', ConnectionsController.create);
router.get('/connections', ConnectionsController.index);

export default router;
