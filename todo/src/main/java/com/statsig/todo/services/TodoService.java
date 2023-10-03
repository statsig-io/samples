package com.statsig.todo.services;


import com.statsig.todo.model.Todo;
import com.statsig.todo.repository.TodoRepository;
import org.springframework.stereotype.Service;

import java.time.ZonedDateTime;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Service
public class TodoService {

    private final TodoRepository todoRepository;

    public TodoService(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }

    public List<Todo> getAllTodos() {
        return todoRepository.findAll();
    }

    public Todo getTodoById(Long id) {
        return todoRepository.findById(id).orElse(null);
    }

    public Todo createTodo(Todo todo) {
        todo.setCreatedDate(ZonedDateTime.now().toLocalDateTime());
        return todoRepository.save(todo);
    }

    public void deleteTodo(Long id) {
        todoRepository.deleteById(id);
    }

    public Todo updateTodo(Todo todo) {
        todo.setModifiedDate(ZonedDateTime.now().toLocalDateTime());
        return todoRepository.save(todo);
    }

}

