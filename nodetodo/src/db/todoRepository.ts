import { Todo } from "../model/Todo";
import { db } from "./db";

/**
 * Repository class to perform CRUD opertion for TODOS
 */
export class TodoRepository {
  async create(todoData: Todo) {
    return new Promise((resolve, reject) => {
      const {
        task,
        description,
        completed,
        edited,
        serialNumber,
        lastViewed,
        createdDate,
        modifiedDate,
      } = todoData;
      const query = `INSERT INTO todos (task, description,completed,edited,serialNumber,lastViewed,createdDate,modifiedDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
      db.run(
        query,
        [
          task,
          description,
          completed,
          edited,
          serialNumber,
          lastViewed,
          createdDate,
          modifiedDate,
        ],
        function (error) {
          if (error) {
            reject(error);
          } else {
            resolve(this.lastID);
          }
        }
      );
    });
  }

  async getById(id: number) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM todos WHERE id = ?`;
      db.get(query, [id], function (error, row) {
        if (error) {
          reject(error);
        } else {
          resolve(row);
        }
      });
    });
  }

  async deleteById(id: number) {
    return new Promise((resolve, reject) => {
      const query = `DELETE FROM todos WHERE id = ?`;
      db.get(query, [id], function (error) {
        if (error) {
          reject(error);
        } else {
          resolve(id);
        }
      });
    });
  }

  update(todo: Todo) {
    return new Promise((resolve, reject) => {
      const query = `
        UPDATE todos
        SET task = ?, description = ?, completed = ?, edited = ?, serialNumber = ?, lastViewed = ?, modifiedDate = ?
        WHERE id = ?
      `;
      const values = [
        todo.task,
        todo.description,
        todo.completed ? 1 : 0,
        todo.edited ? 1 : 0,
        todo.isEditing ? 1 : 0,
        todo.serialNumber,
        todo.lastViewed ? 1 : 0,
        todo.modifiedDate.toISOString(),
        todo.id,
      ];

      db.run(query, values, function (error) {
        if (error) {
          reject(error);
        } else {
          resolve(todo);
        }
      });
    });
  }

  async getAll() {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM todos`;
      db.all(query, function (error, rows) {
        if (error) {
          reject(error);
        } else {
          resolve(rows);
        }
      });
    });
  }
}
