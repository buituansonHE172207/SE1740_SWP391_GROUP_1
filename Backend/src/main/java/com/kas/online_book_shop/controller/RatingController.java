package com.kas.online_book_shop.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.kas.online_book_shop.model.Rating;
import com.kas.online_book_shop.service.RatingService;

import lombok.RequiredArgsConstructor;

@RestController
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001", "http://localhost"})
@RequiredArgsConstructor
@RequestMapping("/api/v1/rating")
public class RatingController {
    private final RatingService ratingService;

    @GetMapping("")
    public ResponseEntity<List<Rating>> getAllRating() {
        var ratings = ratingService.getAllRating();
        if (ratings.isEmpty())
            return ResponseEntity.noContent().build();
        return ResponseEntity.ok(ratings);
    }

    @GetMapping("/by-book-user")
    public ResponseEntity<Rating> getRatingByBookAndUser(
            @RequestParam Long book,
            @RequestParam Long user) {
        var rating = ratingService.getRatingByBookAndUser(book, user);
        return ResponseEntity.ok(rating);
    }

    @PostMapping()
    public ResponseEntity<Rating> addRating(
            @RequestParam(name = "book") Long bookId,
            @RequestParam(name = "user") Long userId,
            @RequestParam int value) {
        return ResponseEntity.status(HttpStatus.CREATED).body(ratingService.saveRating(bookId, userId, value));
    }

}
