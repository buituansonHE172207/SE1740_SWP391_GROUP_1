package com.kas.online_book_shop.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kas.online_book_shop.model.Book;
import com.kas.online_book_shop.model.User;
import com.kas.online_book_shop.model.Wishlist;

public interface WishListRepository extends JpaRepository<Wishlist, Long> {
    Wishlist findByUserAndBook (User user, Book book);    
}
