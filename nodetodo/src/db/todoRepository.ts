import { Todo } from "../model/Todo";
import { db } from "./db";

/**
 * Repository class to perform database related
 *  CRUD opertion for TODOS
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
        function (error: any) {
          if (error) {
            reject(error);
          } else {
            db.get(
              "SELECT * FROM todos WHERE id = last_insert_rowid()",
              (err: any, row: any) => {
                if (err) {
                  console.error(err.message);
                  reject(err);
                }
                console.log(row);
                resolve(row);
              }
            );
          }
        }
      );
    });
  }

  async getById(id: number) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM todos WHERE id = ?`;
      db.get(query, [id], function (error: any, row: any) {
        if (error) {
          console.log(error);
          reject(error);
        } else {
          if (row) {
            (row.completed = row.completed === 1 ? true : false),
              (row.edited = row.edited === 1 ? true : false),
              (row.lastViewed = row.lastViewed === 1 ? true : false);
          }
          resolve(row);
        }
      });
    });
  }

  async deleteById(id: number) {
    return new Promise((resolve, reject) => {
      const query = `DELETE FROM todos WHERE id = ?`;
      db.run(query, [id], function (error: any) {
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
        todo.serialNumber,
        todo.lastViewed ? 1 : 0,
        todo.modifiedDate,
        todo.id,
      ];

      db.run(query, values, function (error: any) {
        if (error) {
          console.log(error);
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
      db.all(query, function (error: any, rows: any) {
        if (error) {
          console.log(error);
          reject(error);
        } else {
          const results = rows.map(
            (row: {
              id: number;
              task: string;
              description: string;
              completed: number;
              edited: number;
              serialNumber: number;
              lastViewed: number;
              createdDate: Date;
              modifiedDate: Date;
            }) => ({
              id: row.id,
              task: row.task,
              description: row.description,
              completed: row.completed === 1 ? true : false,
              edited: row.edited === 1 ? true : false,
              lastViewed: row.lastViewed === 1 ? true : false,
              serialNumber: row.serialNumber,
              createdDate: row.createdDate,
              modifiedDate: row.modifiedDate,
            })
          );
          resolve(results);
        }
      });
    });
  }
}
