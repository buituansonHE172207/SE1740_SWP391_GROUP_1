package com.kas.online_book_shop.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kas.online_book_shop.model.Book;
import com.kas.online_book_shop.model.Rating;
import com.kas.online_book_shop.model.User;

public interface RatingRepository extends JpaRepository<Rating, Long> {
    Rating findByBookAndUser(Book book, User user);
    List<Rating> findByBook(Book book);
}
