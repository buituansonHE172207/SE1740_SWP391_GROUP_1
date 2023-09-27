package com.kas.online_book_shop.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.kas.online_book_shop.model.BookCollection;

public interface BookCollectionService {
    List<BookCollection> getAllBookCollections();

    Page<BookCollection> getAllBookCollections(Pageable pageable);

    BookCollection saveBookCollection(BookCollection bookCollection);

    BookCollection updateBookCollection(BookCollection bookCollection);

    void deleteBookCollection(Long id);

    BookCollection getBookCollectionById(Long id);
}