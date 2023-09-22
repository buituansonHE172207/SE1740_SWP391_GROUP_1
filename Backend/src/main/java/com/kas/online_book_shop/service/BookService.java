package com.kas.online_book_shop.service;

import java.util.List;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.kas.online_book_shop.model.Book;

public interface BookService {
    List<Book> findAllBooks();
    List<Book> findAllBooksByCategoryId(Long bookCategoryId);
    Page<Book> findAllBooks(Pageable pageable);

}
