package com.kas.online_book_shop.service;

import java.util.List;

import com.kas.online_book_shop.model.BookCollection;

public interface CollectionService {
    List<BookCollection> findAllCollections();
}
