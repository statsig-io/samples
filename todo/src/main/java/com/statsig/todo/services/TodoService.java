package com.statsig.todo.services;


import com.google.gson.JsonObject;
import com.statsig.todo.model.Todo;
import com.statsig.todo.repository.TodoRepository;
import com.statsig.todo.util.Constants;
import com.statsig.todo.util.Util;
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
        Todo createdTodo = todoRepository.save(todo);
        Util.logEvent(Constants.TODO_CREATED,createdTodo.toString());
        return createdTodo;
    }

    public HashMap deleteTodo(Long id) {
        HashMap<String,String> map = new HashMap<>();
        Todo deletedTodo = getTodoById(id);
        boolean isDeleteEnable = Util.getFeature();
        if(!Objects.isNull(deletedTodo) && isDeleteEnable){
            map.put("id",String.valueOf(deletedTodo.getId()));
            todoRepository.deleteById(id);
            Util.logEvent(Constants.TODO_DELETED,deletedTodo.toString());
        }else{
            map.put("error","Failed to delete TODO");
        }
        return map;
    }

    public Todo updateTodo(Todo todo) {
        todo.setModifiedDate(ZonedDateTime.now().toLocalDateTime());
        todo.setEdited(true);
        Todo updatedTodo = todoRepository.save(todo);
        Util.logEvent(Constants.TODO_EDITED,updatedTodo.toString());
        return updatedTodo;
    }

}

