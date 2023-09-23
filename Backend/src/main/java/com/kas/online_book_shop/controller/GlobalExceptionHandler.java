package com.kas.online_book_shop.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.kas.online_book_shop.exception.ISBNDuplicateException;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ISBNDuplicateException.class)
    public ResponseEntity<String> handleISBNDuplicateException(ISBNDuplicateException ex) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(ex.getMessage());
    }
}
