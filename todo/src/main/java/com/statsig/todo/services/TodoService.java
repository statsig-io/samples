package com.statsig.todo.services;


import com.google.gson.JsonObject;
import com.statsig.todo.model.Todo;
import com.statsig.todo.repository.TodoRepository;
import org.springframework.stereotype.Service;

import java.time.ZonedDateTime;
import java.util.*;

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

    public HashMap deleteTodo(Long id) {
        HashMap<String,String> map = new HashMap<>();
        Todo todo = getTodoById(id);
        if(!Objects.isNull(todo)){
            map.put("id",String.valueOf(todo.getId()));
            todoRepository.deleteById(id);
        }else{
            map.put("error","Failed to delete TODO");
        }
        return map;
    }

    public Todo updateTodo(Todo todo) {
        todo.setModifiedDate(ZonedDateTime.now().toLocalDateTime());
        todo.setEdited(true);
        return todoRepository.save(todo);
    }

}

