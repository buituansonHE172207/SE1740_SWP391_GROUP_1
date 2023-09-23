package com.kas.online_book_shop.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kas.online_book_shop.model.BookCategory;
import com.kas.online_book_shop.service.BookCategoryService;

import lombok.RequiredArgsConstructor;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
@RequestMapping("/api/v1/book-category")
public class BookCategoryController {
    private final BookCategoryService bookCategoryService;
    @GetMapping()
    public ResponseEntity<List<BookCategory>> getBookCategories() {
        var bookCategories = bookCategoryService.getAllBookCategories();
        if (bookCategories == null) {
            return ResponseEntity.notFound().build();
        } else 
            return ResponseEntity.ok(bookCategories);
    } 
}
