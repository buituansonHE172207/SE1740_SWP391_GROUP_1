package com.kas.online_book_shop.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kas.online_book_shop.model.BookCategory;
import com.kas.online_book_shop.service.BookCategoryService;

import lombok.RequiredArgsConstructor;

@RestController
@CrossOrigin(origins = { "http://localhost:3000", "http://localhost:3001", "http://localhost" })
@RequiredArgsConstructor
@RequestMapping("/api/v1/book-category")
public class BookCategoryController {

    private final BookCategoryService bookCategoryService;

    @GetMapping()
    public ResponseEntity<List<BookCategory>> getBookCategories() {
        var bookCategories = bookCategoryService.getAllBookCategories();
        return ResponseEntity.ok(bookCategories);
    }

    @GetMapping("/{id}")
    public ResponseEntity<BookCategory> getBookCategoryById(@PathVariable Long id) {
        return ResponseEntity.ok(bookCategoryService.getBookCategoryById(id));
    }

    @PostMapping("")
    public ResponseEntity<BookCategory> saveBookCategory(@RequestBody BookCategory bookCategory) {
        return ResponseEntity.status(HttpStatus.CREATED).body(bookCategoryService.saveBookCategory(bookCategory));
    }

    @PutMapping()
    public ResponseEntity<BookCategory> updateBookCategory(@RequestBody BookCategory bookCategory) {
        return ResponseEntity.ok(bookCategoryService.updateBookCategory(bookCategory));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBookCategory(@PathVariable Long id) {
        bookCategoryService.deleteBookCategory(id);
        return ResponseEntity.noContent().build();
    }
}
