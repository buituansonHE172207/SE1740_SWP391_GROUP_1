package com.kas.online_book_shop.service;

import java.util.List;

import com.kas.online_book_shop.model.Book;

public interface BookService {
    List<Book> findAllBooks();
    List<Book> findAllBooksByCategoryId(Long bookCategoryId);
    List<Book> findAllBooksByCollectionId(Long collectionId);
    List<Book> findEightBestSellingBooks();
    List<Book> findEightNewestBooks();
}
