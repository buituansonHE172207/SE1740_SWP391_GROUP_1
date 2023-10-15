package com.kas.online_book_shop.exception;

public class ExpiredtTokenException extends RuntimeException {
    public ExpiredtTokenException(String message) {
        super(message);
    }
}
