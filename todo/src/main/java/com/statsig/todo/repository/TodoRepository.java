package com.statsig.todo.repository;


import com.statsig.todo.model.Todo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface TodoRepository extends JpaRepository<Todo, Long> {
    // Custom methods, if any
}

