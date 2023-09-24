package com.kas.online_book_shop.exception;

public class BookCollectionNotFoundException extends RuntimeException {
    public BookCollectionNotFoundException(String message) {
        super(message);
    }
}
