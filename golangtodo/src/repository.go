package src

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

type TodoRepository struct {
	db *gorm.DB
}

func NewTodoRepository() *TodoRepository {
	db, err := gorm.Open(sqlite.Open("todos.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	db.AutoMigrate(&Todo{})

	return &TodoRepository{
		db: db,
	}
}

func (r *TodoRepository) Create(todo *Todo) {
	r.db.Create(todo)
}

func (r *TodoRepository) Update(todo *Todo) {
	r.db.Save(todo)
}

func (r *TodoRepository) Delete(todo *Todo) {
	r.db.Delete(todo)
}

func (r *TodoRepository) GetById(id uint) (*Todo, error) {
	var todo Todo
	result := r.db.First(&todo, id)
	if result.Error != nil {
		return nil, result.Error
	}
	return &todo, nil
}

func (r *TodoRepository) GetAll() ([]Todo, error) {
	var todos []Todo
	result := r.db.Find(&todos)
	if result.Error != nil {
		return nil, result.Error
	}
	return todos, nil
}

type TodoController struct {
	repo *TodoRepository
}

func NewTodoController(repo *TodoRepository) *TodoController {
	return &TodoController{
		repo: repo,
	}
}

func (t *TodoController) Create(c *gin.Context) {
	var todo Todo
	if err := c.ShouldBindJSON(&todo); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	t.repo.Create(&todo)
	c.JSON(http.StatusOK, todo)
}

func (t *TodoController) Update(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	todo, err := t.repo.GetById(uint(id))
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Todo not found"})
		return
	}

	if err := c.ShouldBindJSON(&todo); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	t.repo.Update(todo)
	c.JSON(http.StatusOK, todo)
}

func (t *TodoController) Delete(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	todo, err := t.repo.GetById(uint(id))
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Todo not found"})
		return
	}

	t.repo.Delete(todo)
	c.JSON(http.StatusOK, gin.H{"message": "Todo deleted successfully"})
}

func (t *TodoController) GetAll(c *gin.Context) {
	todos, err := t.repo.GetAll()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch todos"})
		return
	}

	c.JSON(http.StatusOK, todos)
}
