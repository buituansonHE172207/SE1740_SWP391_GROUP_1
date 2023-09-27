package com.kas.online_book_shop.controller;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.kas.online_book_shop.model.Feedback;
import com.kas.online_book_shop.service.FeedbackService;

import lombok.RequiredArgsConstructor;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
@RequestMapping("/api/v1/feedback")
public class FeedbackController {
    private final FeedbackService feedbackService;

    @GetMapping("")
    public ResponseEntity<List<Feedback>> getAllFeedbacks() {
        var feedbacks = feedbackService.getAllFeedbacks();
        if (feedbacks.isEmpty())
            return ResponseEntity.noContent().build();
        else
            return ResponseEntity.ok(feedbacks);
    }

    @GetMapping("/sorted-and-paged")
    public ResponseEntity<Page<Feedback>> getAllFeedbacksPagedAndSorted(
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(defaultValue = "asc") String sortOrder) {
        Sort.Direction direction = (sortOrder.equalsIgnoreCase("asc")) ? Direction.ASC : Direction.DESC;
        Pageable pageable = PageRequest.of(page, size, direction, sortBy);
        return ResponseEntity.ok(feedbackService.getAllFeedbacks(pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Feedback> getFeedbackById(@PathVariable Long id) {
        var Feedback = feedbackService.getFeedbackById(id);
        if (Feedback == null)
            return ResponseEntity.noContent().build();
        return ResponseEntity.ok(Feedback);
    }

    @PostMapping()
    public ResponseEntity<Feedback> saveFeedback(@RequestBody Feedback Feedback) {
        return ResponseEntity.status(HttpStatus.CREATED).body(feedbackService.saveFeedback(Feedback));
    }

    @PutMapping
    public ResponseEntity<Feedback> updateFeedback(@RequestBody Feedback updatedFeedback) {
        return ResponseEntity.ok(feedbackService.updateFeedback(updatedFeedback));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFeedback(@PathVariable Long id) {
        feedbackService.deleteFeedback(id);
        return ResponseEntity.noContent().build();
    }

}
