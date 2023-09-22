package com.kas.online_book_shop.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import com.kas.online_book_shop.model.Book;
import com.kas.online_book_shop.model.BookCategory;

import java.util.List;
import com.kas.online_book_shop.model.BookCollection;



public interface BookRepository extends JpaRepository<Book, Long> {
    List<Book> findByCategory(BookCategory category);
    Page<Book> findAll(Pageable pageable);
    List<Book> findByCollections(BookCollection collection);
}
