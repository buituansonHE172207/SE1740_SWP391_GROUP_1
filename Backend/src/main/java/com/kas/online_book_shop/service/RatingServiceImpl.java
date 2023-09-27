package com.kas.online_book_shop.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.kas.online_book_shop.model.Rating;
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
    

}
