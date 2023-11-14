package main

import (
	"log"
	"net/http"
	"os"

	"github.com/gorilla/mux"
	"github.com/rs/cors"
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
	router := mux.NewRouter()

	// Define routes
	router.HandleFunc("/todos", todoController.GetAllTodos).Methods("GET")
	router.HandleFunc("/todos", todoController.CreateTodo).Methods("POST")
	router.HandleFunc("/todos/{id}", todoController.GetTodoByID).Methods("GET")
	router.HandleFunc("/todos", todoController.UpdateTodo).Methods("PUT")
	router.HandleFunc("/todos/{id}", todoController.DeleteTodo).Methods("DELETE")

	c := cors.New(cors.Options{
		AllowedOrigins: []string{"*"},
		AllowedMethods: []string{"GET", "POST", "PUT", "DELETE"},
	})

	handler := c.Handler(router)

	log.Fatal(http.ListenAndServe(":8080", handler))
}
