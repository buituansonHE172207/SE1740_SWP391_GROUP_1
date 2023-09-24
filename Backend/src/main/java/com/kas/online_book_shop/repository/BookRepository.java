package com.kas.online_book_shop.repository;

import java.util.List;
import java.util.Locale.Category;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.kas.online_book_shop.model.Book;

public interface BookRepository extends JpaRepository<Book, Long> {
    Page<Book> findAll(Pageable pageable);
    Page<Book> findCategoryIn(List<Category> categories, Pageable pageable);
    Boolean existsByISBN(String ISBN);
}
