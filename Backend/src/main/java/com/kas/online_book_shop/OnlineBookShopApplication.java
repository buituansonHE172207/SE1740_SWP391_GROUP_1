package com.kas.online_book_shop;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class OnlineBookShopApplication {
	//private static final Logger logger = LoggerFactory.getLogger(OnlineBookShopApplication.class);
	public static void main(String[] args) {
		SpringApplication.run(OnlineBookShopApplication.class, args);
	}
}
