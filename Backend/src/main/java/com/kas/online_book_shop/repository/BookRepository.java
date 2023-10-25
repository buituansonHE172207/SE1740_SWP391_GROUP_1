package com.kas.online_book_shop.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.kas.online_book_shop.enums.BookState;
import com.kas.online_book_shop.model.Book;
import com.kas.online_book_shop.model.BookCategory;
import com.kas.online_book_shop.model.BookCollection;

public interface BookRepository extends JpaRepository<Book, Long> {

        Page<Book> findByCategoryInAndStateAndPriceBetween(List<BookCategory> categories, BookState bookState, int min,
                        int max, Pageable pageable);

        Page<Book> findByCollectionsAndStateAndPriceBetween(BookCollection collection, BookState bookState, int min,
                        int max, Pageable pageable);

        Page<Book> findByStateAndPriceBetween(BookState bookState, int min, int max, Pageable pageable);

        Page<Book> findByTitleContainingAndState(String title, BookState bookState, Pageable pageable);

        Page<Book> findByState(BookState bookState, Pageable pageable);

        Boolean existsByISBN(String ISBN);

        @Query("SELECT b FROM Book b " +
                        "WHERE (:title IS NULL OR b.title LIKE %:title%) " +
                        "AND (:state IS NULL OR b.state = :state) " +
                        "AND (:category IS NULL OR b.category = :category) " +
                        "AND (:collection IS NULL OR :collection MEMBER OF b.collections)")
        Page<Book> findByTitleContainingAndCategoryAndCollectionsAndState(@Param("title") String title,
                        @Param("state") BookState bookState,
                        @Param("category") BookCategory category,
                        @Param("collection") BookCollection collection,
                        Pageable pageable);

}
