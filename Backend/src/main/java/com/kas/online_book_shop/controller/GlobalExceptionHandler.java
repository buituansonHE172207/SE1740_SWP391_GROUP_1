package com.kas.online_book_shop.controller;

import org.springframework.data.mapping.PropertyReferenceException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.kas.online_book_shop.exception.BookCategoryNotFoundException;
import com.kas.online_book_shop.exception.BookCollectionNotFoundException;
import com.kas.online_book_shop.exception.BookNotFoundException;
import com.kas.online_book_shop.exception.ISBNDuplicateException;
import com.kas.online_book_shop.exception.LanguageNotFoundException;
import com.kas.online_book_shop.exception.PostNotFoundException;
import com.kas.online_book_shop.exception.SliderNotFoundException;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ISBNDuplicateException.class)
    public ResponseEntity<String> handleISBNDuplicateException(ISBNDuplicateException ex) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(ex.getMessage());
    }

    @ExceptionHandler(BookCategoryNotFoundException.class)
    public ResponseEntity<String> handleAuthorNotFoundException(BookCategoryNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
    }
    
    @ExceptionHandler(BookNotFoundException.class)
    public ResponseEntity<String> handleBookNotFoundException(BookNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
    }
    
    @ExceptionHandler(LanguageNotFoundException.class)
    public ResponseEntity<String> handleLanguageNotFoundException(LanguageNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
    }
    
    @ExceptionHandler(BookCollectionNotFoundException.class)
    public ResponseEntity<String> handleBookCollectionNotFoundException(BookCollectionNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
    }

    @ExceptionHandler(SliderNotFoundException.class)
    public ResponseEntity<String> handleSliderNotFoundException(SliderNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
    }

    @ExceptionHandler(PostNotFoundException.class)
    public ResponseEntity<String> handlePostNotFoundException(PostNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
    }

    @ExceptionHandler(PropertyReferenceException.class)
    public ResponseEntity<String> handlePropertyReferenceException(PropertyReferenceException e) {
        String errorMessage = "Lỗi: Thuộc tính không hợp lệ.";
        return new ResponseEntity<>(errorMessage, HttpStatus.BAD_REQUEST);
    }
}
