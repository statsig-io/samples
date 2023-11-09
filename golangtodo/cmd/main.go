package main

import (
	"fmt"
	"log"

	"database/sql"

	"github.com/gin-gonic/gin"
	_ "github.com/mattn/go-sqlite3"
	statsig "github.com/statsig-io/go-sdk"
	"statsig.com/main/src"
)

/*
*

	Sample code for SDK integration

*
*/
func main() {

	fmt.Println("Sample todo application with Statsig SDK")
	statsig.Initialize("secret-9lbe9aax4FWPyJiLrKfo8GAj1cXX2UUqoDBcG4B7rKW")

	user := statsig.User{
		UserID:  "go_lang_user",
		Email:   "golanguser@statsig.com",
		Country: "IN",
	}
	feature := statsig.CheckGate(user, "sample_feature_gate")
	if feature {
		fmt.Println("Gate enabled")
	} else {
		fmt.Println("Gate disabled")
	}

	config := statsig.GetConfig(user, "warning_banner")
	json := config.Value
	fmt.Print(json)

	statsig.LogEvent(statsig.Event{
		User:      user,
		EventName: "SERVER_TODO_CREATED",
		Value:     "TODO_1234",
		Metadata:  map[string]string{"id": "9", "task": "TODO_1"},
	})

	db, err := sql.Open("sqlite3", "todo.db")
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	// Create the todos table if it does not exist
	_, err = db.Exec(`
		CREATE TABLE IF NOT EXISTS todos (
			id INTEGER PRIMARY KEY,
			task TEXT,
			description TEXT,
			completed BOOLEAN,
			edited BOOLEAN,
			serialNumber INTEGER,
			lastViewed BOOLEAN,
			createdDate TIMESTAMP,
			modifiedDate TIMESTAMP
		)
	`)
	if err != nil {
		log.Fatal(err)
	}

	todoRepository := src.NewTodoRepository(db)

	r := gin.Default()
	todoController := src.NewTodoController(todoRepository)

	// newTodo := &src.Todo{
	// 	Task:         "Complete project",
	// 	Description:  "Finish the project by the deadline",
	// 	Completed:    false,
	// 	Edited:       false,
	// 	SerialNumber: 1,
	// 	LastViewed:   true,
	// 	CreatedDate:  time.Now(),
	// 	ModifiedDate: time.Now(),
	// }

	r.POST("/todos", todoController.Create)
	r.PUT("/todos/:id", todoController.Update)
	r.DELETE("/todos/:id", todoController.Delete)
	r.GET("/todos", todoController.GetAll)
	//r.GET("/todos/:id", todoController.GetById)

	r.Run(":8080")

}
