import express from 'express';
import { TodoController } from '../controller/todoController';

const todoController = new TodoController();

export const router = express.Router();

router.post('/todos', todoController.create);
router.put('/todos', todoController.update);
router.delete('/todos/:id', todoController.deleteById);
router.get('/todos/:id', todoController.getById);
router.get('/todos', todoController.getAll);

