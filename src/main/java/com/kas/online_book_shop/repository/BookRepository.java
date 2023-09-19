package com.kas.online_book_shop.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kas.online_book_shop.model.Book;

public interface BookRepository extends JpaRepository<Book, Long> {
    
}
