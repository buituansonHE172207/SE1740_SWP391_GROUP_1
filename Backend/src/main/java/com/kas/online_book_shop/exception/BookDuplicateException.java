package com.kas.online_book_shop.exception;

public class BookDuplicateException extends RuntimeException {
    public BookDuplicateException(String message) {
        super(message);
    }
}
