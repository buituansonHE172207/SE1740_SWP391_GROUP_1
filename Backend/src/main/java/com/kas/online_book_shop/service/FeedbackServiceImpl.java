package com.kas.online_book_shop.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.kas.online_book_shop.exception.ResourceNotFoundException;
import com.kas.online_book_shop.model.Book;
import com.kas.online_book_shop.model.Feedback;
import com.kas.online_book_shop.repository.FeedbackRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Transactional
@RequiredArgsConstructor
@Service
public class FeedbackServiceImpl implements FeedbackService{
    private final FeedbackRepository feedbackRepository;

    @Override
    public void deleteFeedback(Long id) {
        var existingFeedback = feedbackRepository.findById(id);
        if (existingFeedback == null) 
            throw new ResourceNotFoundException("Không tìm thấy Feedback để xóa");
        feedbackRepository.deleteById(id);
    }

    @Override
    public List<Feedback> getAllFeedbacks() {
        return feedbackRepository.findAll();
    }

    @Override
    public Page<Feedback> getAllFeedbacks(Pageable pageable) {
        return feedbackRepository.findAll(pageable);
    }

    @Override
    public Feedback getFeedbackById(Long id) {
        return feedbackRepository.findById(id).orElse(null);
    }

    @Override
    public Feedback saveFeedback(Feedback feedback) {
        feedback.setCreatedAt(LocalDateTime.now());
        return feedbackRepository.save(feedback);
    }

    @Override
    public Feedback updateFeedback(Feedback feedback) {
        var existingFeedback = feedbackRepository.findById(feedback.getId());
        if (existingFeedback == null) 
            throw new ResourceNotFoundException("Không tìm thấy Feedback để xóa");
        return feedbackRepository.save(feedback);
    }

    @Override
    public Page<Feedback> getFeedbacksByBook(Book book, Pageable pageable) {
        return feedbackRepository.findByBook(book, pageable);
    }

    
}
