package src

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

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
	todo, err := t.repo.GetByID(uint(id))
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
	todo, err := t.repo.GetByID(uint(id))
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Todo not found"})
		return
	}

	t.repo.Delete(todo.ID)
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

func (t *TodoController) GetById(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	todo, err := t.repo.GetByID(uint(id))
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Todo not found"})
		return
	}

	c.JSON(http.StatusOK, todo)
}
