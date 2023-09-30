package com.kas.online_book_shop.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.kas.online_book_shop.exception.ResourceNotFoundException;
import com.kas.online_book_shop.model.BookCategory;
import com.kas.online_book_shop.repository.BookCategoryRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Transactional
@RequiredArgsConstructor
@Service
public class BookCategoryServiceImpl implements BookCategoryService {
    private final BookCategoryRepository bookCategoryRepository;

    @Override
    public List<BookCategory> getAllBookCategories() {
        return bookCategoryRepository.findAll();
    }

    @Override
    public void deleteBookCategory(Long id) {
        var existingBookCategory = bookCategoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy thể loại sách để xóa"));
        existingBookCategory.getBooks()
                .forEach((book) -> book.setCategory(null));
        bookCategoryRepository.deleteById(id);
    }

    @Override
    public Page<BookCategory> getAllBookCategories(Pageable pageable) {
        return bookCategoryRepository.findAll(pageable);
    }

    @Override
    public BookCategory getBookCategoryById(Long id) {
        return bookCategoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy thể loại tương ứng"));
    }

    @Override
    public BookCategory saveBookCategory(BookCategory bookCategory) {
        bookCategory.setId(null);
        return bookCategoryRepository.save(bookCategory);
    }

    @Override
    public BookCategory updateBookCategory(BookCategory bookCategory) {
        bookCategoryRepository.findById(bookCategory.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy thể loại sách để cập nhật"));
        return bookCategoryRepository.save(bookCategory);
    }

}
