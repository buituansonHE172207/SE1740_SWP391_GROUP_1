package com.kas.online_book_shop.service;

import java.util.List;

import com.kas.online_book_shop.model.BookCollection;

public interface BookCollectionService {
    List<BookCollection> getAllBookCollections();

    BookCollection saveBookCollection(BookCollection bookCollection);

    BookCollection updateBookCollection(BookCollection bookCollection);

    void deleteBookCollection(Long id);

    BookCollection getBookCollectionById(Long id);
}