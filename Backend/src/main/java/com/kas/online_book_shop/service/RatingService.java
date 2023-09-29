package com.kas.online_book_shop.service;

import java.util.List;

import com.kas.online_book_shop.model.Book;
import com.kas.online_book_shop.model.Rating;

public interface RatingService {

    List<Rating> getAllRating();

    Rating saveRating(Long bookId, Long userId, int value);

    List<Rating> getRatingByBook(Book book);

    Rating getRatingByBookAndUser(Long bookId, Long userId);
}
