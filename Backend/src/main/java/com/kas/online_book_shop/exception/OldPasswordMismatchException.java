package com.kas.online_book_shop.exception;

public class OldPasswordMismatchException extends RuntimeException {
    public OldPasswordMismatchException(String message) {
        super(message);
    }
}
