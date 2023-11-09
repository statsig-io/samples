package src

import (
	"database/sql"

	_ "github.com/mattn/go-sqlite3"
)

type TodoRepository struct {
	db *sql.DB
}

func NewTodoRepository(db *sql.DB) *TodoRepository {
	return &TodoRepository{db: db}
}

func (r *TodoRepository) Create(todo *Todo) error {
	_, err := r.db.Exec("INSERT INTO todos (task, description, completed, edited, serialNumber, lastViewed, createdDate, modifiedDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
		todo.Task, todo.Description, todo.Completed, todo.Edited, todo.SerialNumber, todo.LastViewed, todo.CreatedDate, todo.ModifiedDate)
	return err
}

func (r *TodoRepository) GetByID(id uint) (*Todo, error) {
	row := r.db.QueryRow("SELECT id, task, description, completed, edited, serialNumber, lastViewed, createdDate, modifiedDate FROM todos WHERE id = ?", id)

	var todo Todo
	err := row.Scan(&todo.ID, &todo.Task, &todo.Description, &todo.Completed, &todo.Edited, &todo.SerialNumber, &todo.LastViewed, &todo.CreatedDate, &todo.ModifiedDate)
	if err != nil {
		return nil, err
	}

	return &todo, nil
}

func (r *TodoRepository) GetAll() ([]Todo, error) {
	rows, err := r.db.Query("SELECT id, task, description, completed, edited, serialNumber, lastViewed, createdDate, modifiedDate FROM todos")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var todos []Todo
	for rows.Next() {
		var todo Todo
		err = rows.Scan(&todo.ID, &todo.Task, &todo.Description, &todo.Completed, &todo.Edited, &todo.SerialNumber, &todo.LastViewed, &todo.CreatedDate, &todo.ModifiedDate)
		if err != nil {
			return nil, err
		}
		todos = append(todos, todo)
	}

	return todos, nil
}

func (r *TodoRepository) Update(todo *Todo) error {
	_, err := r.db.Exec("UPDATE todos SET task = ?, description = ?, completed = ?, edited = ?, serialNumber = ?, lastViewed = ?, modifiedDate = ? WHERE id = ?",
		todo.Task, todo.Description, todo.Completed, todo.Edited, todo.SerialNumber, todo.LastViewed, todo.ModifiedDate, todo.ID)
	return err
}

func (r *TodoRepository) Delete(id uint) error {
	_, err := r.db.Exec("DELETE FROM todos WHERE id = ?", id)
	return err
}
