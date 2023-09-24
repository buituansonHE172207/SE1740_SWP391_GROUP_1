package com.kas.online_book_shop.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.kas.online_book_shop.model.Book;
import com.kas.online_book_shop.model.BookCategory;
import com.kas.online_book_shop.model.BookCollection;

public interface BookRepository extends JpaRepository<Book, Long> {
    Page<Book> findAll(Pageable pageable);
    Page<Book> findByCategoryInAndPriceBetween(List<BookCategory> categories, int min, int max, Pageable pageable);
    Page<Book> findByCollectionsAndPriceBetween(BookCollection collection, int min, int max, Pageable pageable);
    Page<Book> findByTitleContaining(String title, Pageable pageable);
    Boolean existsByISBN(String ISBN);
}
