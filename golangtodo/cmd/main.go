package main

import (
	"fmt"

	statsig "github.com/statsig-io/go-sdk"
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

}
