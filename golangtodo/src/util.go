package src

import (
	"fmt"

	statsig "github.com/statsig-io/go-sdk"
)

var user = statsig.User{
	UserID:  "go_lang_user",
	Email:   "golanguser@statsig.com",
	Country: "UK",
}

func InitializeSDK() {
	statsig.Initialize(SERVER_KEY)
}

func IsDeleteFeatureEnabled() bool {
	feature := statsig.CheckGate(user, "sample_feature_gate")
	fmt.Println("Delete feature enabled: ", feature)
	return feature
}

func GetDynamicConfig() {
	config := statsig.GetConfig(user, DYNAMIC_CONFIG)
	json := config.Value
	fmt.Print(json)
}

func LogEvent(tag string) {
	statsig.LogEvent(statsig.Event{
		User:      user,
		EventName: tag,
		Value:     "TODO_1234",
		Metadata:  map[string]string{"id": "9", "task": "TODO_1"},
	})
}
