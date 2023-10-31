package com.statsig.todo;


import com.statsig.todo.util.Util;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.concurrent.ExecutionException;


@SpringBootApplication
public class TodoApplication {

	/**
	 *
	 * @param args
	 * @throws ExecutionException
	 * @throws InterruptedException
	 */
	public static void main(String[] args) throws Exception {
		SpringApplication.run(TodoApplication.class, args);
		Util.initializeStatsig();
	}




}
