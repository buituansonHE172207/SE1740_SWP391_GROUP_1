package com.kas.online_book_shop.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kas.online_book_shop.model.BookCollection;

public interface BookCollectionRepository extends JpaRepository<BookCollection, Long> {
    
}
