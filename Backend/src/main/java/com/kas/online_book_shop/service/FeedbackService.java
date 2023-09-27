package com.kas.online_book_shop.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.kas.online_book_shop.model.Feedback;

public interface FeedbackService {
    List<Feedback> getAllFeedbacks();

    Feedback getFeedbackById(Long id);

    Page<Feedback> getAllFeedbacks(Pageable pageable);

    Feedback saveFeedback(Feedback feedback);

    Feedback updateFeedback(Feedback feedback);

    void deleteFeedback(Long id);
}
