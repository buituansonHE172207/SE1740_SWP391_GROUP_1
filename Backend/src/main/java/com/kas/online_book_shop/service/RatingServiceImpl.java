package com.kas.online_book_shop.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.kas.online_book_shop.exception.InvalidValueException;
import com.kas.online_book_shop.model.Book;
import com.kas.online_book_shop.model.Rating;
import com.kas.online_book_shop.model.User;
import com.kas.online_book_shop.repository.RatingRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Transactional
@RequiredArgsConstructor
@Service
public class RatingServiceImpl implements RatingService {
    private final RatingRepository ratingRepository;

    @Override
    public List<Rating> getAllRating() {
        return ratingRepository.findAll();
    }

    @Override
    public List<Rating> getRatingByBook(Book book) {
        return ratingRepository.findByBook(book);
    }

    @Override
    public Rating saveRating(Rating rating) {
        var existingRating = ratingRepository.findByBookAndUser(rating.getBook(), rating.getUser());
        if (existingRating != null) 
            rating.setId(existingRating.getId());
        
        if (rating.getValue() < 0 || rating.getValue() > 5) {
            throw new InvalidValueException("Giá trị phải nằm trong từ 0 đến 5");
        }
        return ratingRepository.save(rating); 
    }

    @Override
    public Rating updateRating(Rating rating) {
        if (rating.getValue() < 0 || rating.getValue() > 5) {
            throw new InvalidValueException("Giá trị phải nằm trong từ 0 đến 5");
        }
        return ratingRepository.save(rating); 
    }

    @Override
    public Rating getRatingByBookAndUser(Book book, User user) {
        return ratingRepository.findByBookAndUser(book, user);
    }
    

}
