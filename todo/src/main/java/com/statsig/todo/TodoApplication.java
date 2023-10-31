package com.statsig.todo;


import com.statsig.sdk.Statsig;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.concurrent.ExecutionException;
import java.util.concurrent.Future;


@SpringBootApplication
public class TodoApplication {

	@Value("${statsig.server.key}")
	private String SERVER_KEY;

	/**
	 *
	 * @param args
	 * @throws ExecutionException
	 * @throws InterruptedException
	 */
	public static void main(String[] args) throws Exception {
		SpringApplication.run(TodoApplication.class, args);
		TodoApplication todoApplication = new TodoApplication();
		todoApplication.initializeStatsig();
	}

	private void initializeStatsig() throws ExecutionException, InterruptedException{
		System.out.println("SERVER KEY IS: "+SERVER_KEY);
		Future initFuture = Statsig.initializeAsync("secret-F4JPRCLoZVaYNwzQRE1FmqcC124QRuw7ZyxjdAEx7Hv");
		initFuture.get();
	}

}
