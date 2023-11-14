package src

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
)

type TodoController struct {
	repo *TodoRepository
}

func NewTodoController(repo *TodoRepository) *TodoController {
	return &TodoController{repo: repo}
}

func (c *TodoController) GetAllTodos(w http.ResponseWriter, r *http.Request) {

	todos, err := c.repo.GetAll()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(todos)
}

func (c *TodoController) GetTodoByID(w http.ResponseWriter, r *http.Request) {

	params := mux.Vars(r)
	id, err := strconv.ParseUint(params["id"], 10, 64)
	fmt.Println(params)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	todo, err := c.repo.GetByID(uint(id))
	if err != nil {
		http.Error(w, err.Error(), http.StatusNotFound)
		return
	}

	json.NewEncoder(w).Encode(todo)
}

func (c *TodoController) CreateTodo(w http.ResponseWriter, r *http.Request) {
	var newTodo Todo
	err := json.NewDecoder(r.Body).Decode(&newTodo)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	todo, err := c.repo.Create(&newTodo)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(todo)
	mapTodo := structToMap(*todo)
	LogEvent(TAG_TODO_CREATE, mapTodo)

}

func (c *TodoController) UpdateTodo(w http.ResponseWriter, r *http.Request) {
	var qtodo Todo
	err := json.NewDecoder(r.Body).Decode(&qtodo)

	todo, err := c.repo.GetByID(qtodo.ID)
	if err != nil {
		http.Error(w, err.Error(), http.StatusNotFound)
		return
	}

	err = c.repo.Update(&qtodo)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(qtodo)

	mapTodo := structToMap(*todo)
	LogEvent(TAG_TODO_EDIT, mapTodo)

}

func (c *TodoController) DeleteTodo(w http.ResponseWriter, r *http.Request) {

	isDeleteEnable := IsDeleteFeatureEnabled()

	if isDeleteEnable {
		params := mux.Vars(r)
		id, err := strconv.ParseUint(params["id"], 10, 64)
		fmt.Println(params)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		err = c.repo.Delete(uint(id))
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(map[string]int{"id": int(id)})
		LogEvent(TAG_TODO_DELETE, map[string]string{"id": params["id"]})

	} else {
		w.WriteHeader(http.StatusNonAuthoritativeInfo)
		json.NewEncoder(w).Encode(map[string]string{"error": "Not authorized to delete todo"})
	}

}
