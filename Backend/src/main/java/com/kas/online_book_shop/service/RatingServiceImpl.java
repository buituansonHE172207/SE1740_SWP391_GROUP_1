package com.kas.online_book_shop.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.kas.online_book_shop.exception.InvalidValueException;
import com.kas.online_book_shop.exception.ResourceNotFoundException;
import com.kas.online_book_shop.model.Book;
import com.kas.online_book_shop.model.Rating;
import com.kas.online_book_shop.model.User;
import com.kas.online_book_shop.repository.BookRepository;
import com.kas.online_book_shop.repository.RatingRepository;
import com.kas.online_book_shop.repository.UserRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Transactional
@RequiredArgsConstructor
@Service
public class RatingServiceImpl implements RatingService {
    private final RatingRepository ratingRepository;
    private final UserRepository userRepository;
    private final BookRepository bookRepository;

    @Override
    public List<Rating> getAllRating() {
        return ratingRepository.findAll();
    }

    @Override
    public List<Rating> getRatingByBook(Book book) {
        return ratingRepository.findByBook(book);
    }

    @Override
    public Rating saveRating(Long bookId, Long userId, int value) {
        if (value < 0 || value > 5) {
            throw new InvalidValueException("Giá trị phải nằm trong từ 0 đến 5");
        }
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy người dùng để xóa wishlist"));
        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy sách để xóa khỏi wishlist"));
        var existingRating = ratingRepository.findByBookAndUser(book, user).orElse(new Rating(null, user, book, value));
        existingRating.setValue(value);
        return ratingRepository.save(existingRating);
    }

    @Override
    public Rating getRatingByBookAndUser(Long bookId, Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy người dùng để xóa wishlist"));
        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy sách để xóa khỏi wishlist"));
        return ratingRepository.findByBookAndUser(book, user)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy rating của bạn"));
    }

}
