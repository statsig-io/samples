package com.statsig.todo.repository;


import com.statsig.todo.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Long> {
    // Custom methods, if any
}

