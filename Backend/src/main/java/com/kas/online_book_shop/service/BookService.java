package com.kas.online_book_shop.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.kas.online_book_shop.model.Book;

public interface BookService {
    Book getBookById(Long id);
    List<Book> getAllBooks();
    Page<Book> getAllBooks(Pageable pageable);
    
}
