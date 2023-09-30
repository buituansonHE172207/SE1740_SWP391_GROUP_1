package com.kas.online_book_shop.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.kas.online_book_shop.enums.BookState;
import com.kas.online_book_shop.model.Book;
import com.kas.online_book_shop.model.BookCategory;
import com.kas.online_book_shop.model.BookCollection;

public interface BookRepository extends JpaRepository<Book, Long> {
    Page<Book> findAll(Pageable pageable);

    Page<Book> findByCategoryInAndStateAndPriceBetween(List<BookCategory> categories, BookState bookState, int min,
            int max, Pageable pageable);

    Page<Book> findByCategoryInAndState(List<BookCategory> categories, BookState bookState, int min, int max,
            Pageable pageable);

    Page<Book> findByCollectionsAndStateAndPriceBetween(BookCollection collection, BookState bookState, int min,
            int max, Pageable pageable);

    Page<Book> findByCollectionsAndPriceBetween(BookCollection collection, int min, int max, Pageable pageable);

    Page<Book> findByTitleContainingAndState(String title, BookState bookState, Pageable pageable);

    Page<Book> findByTitleContaining(String title, Pageable pageable);

    Page<Book> findByState(BookState bookState, Pageable pageable);

    Boolean existsByISBN(String ISBN);
}
