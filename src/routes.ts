import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import multer from 'multer';
import UsersController from './controllers/UsersController';
import ClassesController from './controllers/ClassesController';
import ConnectionsController from './controllers/ConnectionsController';

import multerConfig from './config/multer';

const router = Router();

const upload = multer(multerConfig);

router.post('/users', upload.single('image'),
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required(),
      bio: Joi.string().required(),
      whatsapp: Joi.number().required(),
    }),
  }, {
    abortEarly: false,
  }), UsersController.create);
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
