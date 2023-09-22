package com.kas.online_book_shop.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kas.online_book_shop.model.Book;
import com.kas.online_book_shop.service.BookService;

import lombok.RequiredArgsConstructor;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
@RequestMapping("/api/v1/")
public class BookController {
    private final BookService bookService;
    @GetMapping("/book")
    public List<Book> getAllBooks(){
        return bookService.findAllBooks();
    }

}
