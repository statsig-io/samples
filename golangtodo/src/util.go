package src

import (
	"fmt"
	"reflect"

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

func LogEvent(tag string, data map[string]string) {
	statsig.LogEvent(statsig.Event{
		User:      user,
		EventName: tag,
		Value:     "TODO",
		Metadata:  data,
	})
}

func structToMap(todo Todo) map[string]string {
	todoMap := make(map[string]string)
	todoType := reflect.TypeOf(todo)
	todoValue := reflect.ValueOf(todo)

	for i := 0; i < todoType.NumField(); i++ {
		field := todoType.Field(i)
		fieldValue := todoValue.Field(i).Interface()
		todoMap[field.Name] = fmt.Sprintf("%v", fieldValue)
	}

	return todoMap

}
