package com.kas.online_book_shop.service;

import java.util.List;

import javax.swing.plaf.nimbus.State;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.kas.online_book_shop.enums.BookState;
import com.kas.online_book_shop.model.Book;
import com.kas.online_book_shop.model.BookCategory;
import com.kas.online_book_shop.model.BookCollection;

public interface BookService {
    List<Book> getAllBooks();

    Book getBookById(Long id);

    Page<Book> getAllBooks(Pageable pageable);

    Book saveBook(Book book);

    Book updateBook(Book book);

    void deleteBook(Long id);

    Page<Book> getBookByCategoriesAndPriceRange(List<BookCategory> categories, int min, int max, Pageable pageable);

    Page<Book> getBooksByCollectionAndPriceRanges(BookCollection collection,int min, int max,Pageable pageable);

    Page<Book> getBookByState(BookState state, Pageable pageable);

    Page<Book> getBooksByName(String name, Pageable pageable);
}
