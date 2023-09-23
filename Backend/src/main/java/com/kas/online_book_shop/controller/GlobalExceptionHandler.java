package com.kas.online_book_shop.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.kas.online_book_shop.exception.AuthorNotFoundException;
import com.kas.online_book_shop.exception.BookNotFoundException;
import com.kas.online_book_shop.exception.ISBNDuplicateException;
import com.kas.online_book_shop.exception.LanguageNotFoundException;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ISBNDuplicateException.class)
    public ResponseEntity<String> handleISBNDuplicateException(ISBNDuplicateException ex) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(ex.getMessage());
    }

    @ExceptionHandler(AuthorNotFoundException.class)
    public ResponseEntity<String> authorNotFoundException(AuthorNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
    }
    
    @ExceptionHandler(BookNotFoundException.class)
    public ResponseEntity<String> bookNotFoundException(BookNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
    }
    
    @ExceptionHandler(LanguageNotFoundException.class)
    public ResponseEntity<String> languageNotFoundException(LanguageNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
    }
}
