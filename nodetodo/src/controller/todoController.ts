import { TodoRepository } from "../db/todoRepository";

const todoRepository = new TodoRepository();

/**
 * A controller class to handle
 * Create,Delete,Update,GetById,GetAll operation
 * through api's
 */
export class TodoController {
  async create(req: any, res: any) {
    try {
      console.log(req.body);
      const todoId = await todoRepository.create(req.body);
      res.json({ id: todoId });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to create todo" });
    }
  }

  async update(req: any, res: any) {
    try {
      const data = await todoRepository.update(req.body);
      res.json(data);
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
    try {
      const id = await todoRepository.deleteById(req.params.id);
      res.json({ id: id });
    } catch (error) {
      res.status(404).json({ error: "Failed to delete Id" });
    }
  }

  async getAll(req: any, res: any) {
    console.log("Get All called");
    try {
      const todos = await todoRepository.getAll();
      console.log(JSON.stringify(todos));
      res.json(todos);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch todos" });
    }
  }
}
