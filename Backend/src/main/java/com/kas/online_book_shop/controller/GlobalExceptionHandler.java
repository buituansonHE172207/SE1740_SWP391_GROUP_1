package com.kas.online_book_shop.controller;

import org.springframework.data.mapping.PropertyReferenceException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.kas.online_book_shop.exception.AccountDisabledException;
import com.kas.online_book_shop.exception.AccountInactiveException;
import com.kas.online_book_shop.exception.ISBNDuplicateException;
import com.kas.online_book_shop.exception.InsufficientStockException;
import com.kas.online_book_shop.exception.InvalidValueException;
import com.kas.online_book_shop.exception.OldPasswordMismatchException;
import com.kas.online_book_shop.exception.ResourceNotFoundException;
import com.kas.online_book_shop.exception.UnauthorizedException;
import com.kas.online_book_shop.exception.UserAlreadyExistsException;
import com.kas.online_book_shop.exception.UserNotFoundException;

import io.jsonwebtoken.ExpiredJwtException;
import jakarta.annotation.security.PermitAll;
import jakarta.validation.ConstraintViolationException;

@RestControllerAdvice()
@PermitAll
public class GlobalExceptionHandler {

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<String> handleConstraintViolationException(ConstraintViolationException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
    }

    @ExceptionHandler(ISBNDuplicateException.class)
    public ResponseEntity<String> handleISBNDuplicateException(ISBNDuplicateException ex) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(ex.getMessage());
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<String> handleResourceNotFoundException(ResourceNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
    }

    @ExceptionHandler(PropertyReferenceException.class)
    public ResponseEntity<String> handlePropertyReferenceException(PropertyReferenceException e) {
        String errorMessage = "Lỗi: Thuộc tính không hợp lệ.";
        return new ResponseEntity<>(errorMessage, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(InsufficientStockException.class)
    public ResponseEntity<String> handleInsufficientStockException(PropertyReferenceException e) {
        return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(InvalidValueException.class)
    public ResponseEntity<String> handleInvalidValueException(InvalidValueException e) {
        return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(UserAlreadyExistsException.class)
    public ResponseEntity<String> handleUserAlreadyExistsException(UserAlreadyExistsException e) {
        return new ResponseEntity<>(e.getMessage(), HttpStatus.CONFLICT);
    }

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<String> handleUserDoesNotExists(UserNotFoundException e) {
        return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(OldPasswordMismatchException.class)
    public ResponseEntity<String> handleOldPasswordMismatchException(OldPasswordMismatchException e) {
        return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(ExpiredJwtException.class)
    public ResponseEntity<String> handleExpiredJwtException(ExpiredJwtException ex) {
        return new ResponseEntity<>("JWT Token has expired.", HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<String> handleBadCredentialsException(BadCredentialsException ex) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Incorrect password.");
    }

    @ExceptionHandler(AccountDisabledException.class)
    public ResponseEntity<String> handleAccountDisabledException(AccountDisabledException ex) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Account_disabled");
    }

    @ExceptionHandler(AccountInactiveException.class)
    public ResponseEntity<String> handleAccountInactiveException(AccountInactiveException ex) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Account_not_activated");
    }

    @ExceptionHandler(UnauthorizedException.class)
    public ResponseEntity<String> handleUnauthorizedException(UnauthorizedException ex) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ex.getMessage());
    }
    /*
     * @ExceptionHandler(Exception.class)
     * public ResponseEntity<String> handleException(Exception e) {
     * return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
     * }
     */

}
