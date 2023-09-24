package com.kas.online_book_shop.exception;

public class ISBNDuplicateException extends RuntimeException {
    public ISBNDuplicateException(String message) {
        super(message);
    }
}
