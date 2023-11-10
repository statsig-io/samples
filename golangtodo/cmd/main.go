package main

import (
	"log"
	"net/http"
	"os"

	"github.com/gorilla/mux"
	"statsig.com/main/src"
)

func main() {
	src.InitializeSDK()
	src.GetDynamicConfig()

	filePath := "todos.json"
	// Create an empty file for storing todos if it doesn't exist
	if _, err := os.Stat(filePath); os.IsNotExist(err) {
		file, err := os.Create(filePath)
		if err != nil {
			log.Fatal(err)
		}
		file.Close()
	}

	repo := src.NewTodoRepository(filePath)
	todoController := src.NewTodoController(repo)

	// Initialize router
	r := mux.NewRouter()

	// Define routes
	r.HandleFunc("/todos", todoController.GetAllTodos).Methods("GET")
	r.HandleFunc("/todos", todoController.CreateTodo).Methods("POST")
	r.HandleFunc("/todos/{id}", todoController.GetTodoByID).Methods("GET")
	r.HandleFunc("/todos", todoController.UpdateTodo).Methods("PUT")
	r.HandleFunc("/todos/{id}", todoController.DeleteTodo).Methods("DELETE")

	log.Fatal(http.ListenAndServe(":8080", r))
}
