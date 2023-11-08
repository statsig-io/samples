package src

import (
	"time"
)

type Todo struct {
	ID           uint      `gorm:"primary_key" json:"id"`
	Task         string    `json:"task"`
	Description  string    `json:"description"`
	Completed    bool      `json:"completed"`
	Edited       bool      `json:"edited"`
	SerialNumber int       `json:"serialNumber"`
	LastViewed   bool      `json:"lastViewed"`
	CreatedDate  time.Time `json:"createdDate"`
	ModifiedDate time.Time `json:"modifiedDate"`
}
