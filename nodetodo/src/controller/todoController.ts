import {
  TAG_TODO_CREATE,
  TAG_TODO_DELETE,
  TAG_TODO_EDIT,
} from "../constants/AppConstant";
import { TodoRepository } from "../db/todoRepository";
import { isDeleteFeatureEnable, logEvent } from "../util/util";

const todoRepository = new TodoRepository();

/**
 * A controller class to handle
 * Create,Delete,Update,GetById,GetAll operation
 * through api's
 */
export class TodoController {
  async create(req: any, res: any) {
    try {
      const todo = await todoRepository.create(req.body);
      res.json(todo);
      logEvent(TAG_TODO_CREATE, "TODO created", todo);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to create todo" });
    }
  }

  async update(req: any, res: any) {
    try {
      const data = await todoRepository.update(req.body);
      res.json(data);
      logEvent(TAG_TODO_EDIT, "TODO edited", data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to update todo" });
    }
  }

  async getById(req: any, res: any) {
    try {
      const todo = await todoRepository.getById(req.params.id);
      res.json(todo);
    } catch (error) {
      res.status(404).json({ error: "Todo not found" });
    }
  }

  async deleteById(req: any, res: any) {
    const enableDelete = await isDeleteFeatureEnable();

    if (!enableDelete) {
      res.status(401).json({ error: "Not authorized to delete todo" });
    } else {
      try {
        const id = await todoRepository.deleteById(req.params.id);
        logEvent(TAG_TODO_DELETE, "TODO deleted", { id: id });
        res.json({ id: id });
      } catch (error) {
        console.log(error);
        res.status(404).json({ error: "Failed to delete Id" });
      }
    }
  }

  async getAll(req: any, res: any) {
    try {
      const todos = await todoRepository.getAll();
      res.json(todos);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to fetch todos" });
    }
  }
}
