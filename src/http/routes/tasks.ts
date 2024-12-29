import { Router, type Request, type Response, type NextFunction } from 'express';
import { check, validationResult } from 'express-validator';

import { TaskModel } from '../../db';

interface CreateTaskRequest {
  title: string;
  description?: string;
}

interface UpdateTaskRequest {
  title?: string;
  description?: string;
  completed?: boolean;
}

const handleValidationErrors = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }
  next();
};

const router = Router();

router.get(
  '/',
  [
    check('completed')
      .optional()
      .isIn(['true', 'false'])
      .withMessage("Completed must be 'true' or 'false'"),
  ],
  handleValidationErrors,
  async (req: Request, res: Response) => {
    const completed = req.query.completed;

    let filter = {};
    if (completed === 'true') {
      filter = { completed: true };
    } else if (completed === 'false') {
      filter = { completed: false };
    }

    const tasks = await TaskModel.find(filter);
    if (tasks.length === 0) {
      return res.status(400).json({ message: 'Tasks not found' });
    }

    return res.send(tasks);
  }
);

router.post(
  '/',
  [
    check('title').notEmpty().isString().withMessage('Title is required'),
    check('description').optional().isString().withMessage('Description must be a string'),
  ],
  handleValidationErrors,
  async (req: Request, res: Response) => {
    const { title, description } = req.body as CreateTaskRequest;

    await TaskModel.create({ title, description });

    return res.json({ message: 'Task created' });
  }
);

router.put(
  '/:id',
  [
    check('id').isMongoId().withMessage('Invalid task ID'),
    check('title').optional().isString().withMessage('Title must be a string'),
    check('description').optional().isString().withMessage('Description must be a string'),
    check('completed').optional().isBoolean().withMessage('Completed must be a boolean'),
  ],
  handleValidationErrors,
  async (req: Request, res: Response) => {
    const { title, description, completed } = req.body as UpdateTaskRequest;
    const id = req.params.id;

    const task = await TaskModel.findOneAndUpdate(
      { _id: id },
      { title, description, completed },
      { new: true }
    );
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    return res.send(task);
  }
);

router.get(
  '/:id',
  [check('id').isMongoId().withMessage('Invalid task ID')],
  handleValidationErrors,
  async (req: Request, res: Response) => {
    const id = req.params.id;

    const task = await TaskModel.findOne({ _id: id });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    return res.send(task);
  }
);

router.delete(
  '/:id',
  [check('id').isMongoId().withMessage('Invalid task ID')],
  handleValidationErrors,
  async (req: Request, res: Response) => {
    const id = req.params.id;

    const task = await TaskModel.findByIdAndDelete(id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    return res.json({ message: 'Task deleted' });
  }
);

export default router;
