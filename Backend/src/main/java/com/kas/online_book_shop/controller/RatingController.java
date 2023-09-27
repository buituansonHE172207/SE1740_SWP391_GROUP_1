package com.kas.online_book_shop.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kas.online_book_shop.model.Rating;
import com.kas.online_book_shop.service.RatingService;

import lombok.RequiredArgsConstructor;

@RestController
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
@RequiredArgsConstructor
@RequestMapping("/api/v1/rating")
public class RatingController {
    private final RatingService ratingService;

    @GetMapping("")
    public ResponseEntity<List<Rating>> getAllRating() {
        var ratings = ratingService.getAllRating();
        if (ratings.isEmpty())
            return ResponseEntity.noContent().build();
        else
            return ResponseEntity.ok(ratings);
    }   
}
