package com.kas.online_book_shop.exception;

public class BookCategoryNotFoundException extends RuntimeException {
    public BookCategoryNotFoundException(String message) {
        super(message);
    }
}
