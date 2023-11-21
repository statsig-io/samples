package src

import (
	"encoding/json"
	"fmt"
	"os"
	"time"
)

// TodoRepository handles data storage and retrieval using JSON flat files
type TodoRepository struct {
	filePath string
}

func NewTodoRepository(filePath string) *TodoRepository {
	return &TodoRepository{filePath: filePath}
}

func (r *TodoRepository) GetAll() ([]Todo, error) {
	data, err := os.ReadFile(r.filePath)
	if err != nil {
		return nil, err
	}

	var todos []Todo
	err = json.Unmarshal(data, &todos)
	if err != nil {
		return nil, err
	}

	return todos, nil
}

func (r *TodoRepository) GetByID(id uint) (*Todo, error) {
	todos, err := r.GetAll()
	if err != nil {
		return nil, err
	}

	for _, todo := range todos {
		if todo.ID == id {
			return &todo, nil
		}
	}

	return nil, fmt.Errorf("TODO with ID %d not found", id)
}

func (r *TodoRepository) Create(todo *Todo) (*Todo, error) {
	todos, err := r.GetAll()
	if err != nil {
		return nil, err
	}

	todo.ID = uint(len(todos) + 1)
	todo.CreatedDate = time.Now()
	todo.ModifiedDate = time.Now()

	todos = append(todos, *todo)
	r.saveToFile(todos)

	return todo, nil
}

func (r *TodoRepository) Update(todo *Todo) error {
	todos, err := r.GetAll()
	if err != nil {
		return err
	}

	for i, t := range todos {
		if t.ID == todo.ID {
			todos[i] = *todo
			todos[i].ModifiedDate = time.Now()
			return r.saveToFile(todos)
		}
	}

	return fmt.Errorf("TODO with ID %d not found", todo.ID)
}

func (r *TodoRepository) Delete(id uint) error {
	todos, err := r.GetAll()
	if err != nil {
		return err
	}

	var newTodos []Todo
	for _, todo := range todos {
		if todo.ID != id {
			newTodos = append(newTodos, todo)
		}
	}

	return r.saveToFile(newTodos)
}

func (r *TodoRepository) saveToFile(todos []Todo) error {
	data, err := json.Marshal(todos)
	if err != nil {
		return err
	}

	err = os.WriteFile(r.filePath, data, 0644)
	if err != nil {
		return err
	}

	return nil
}
