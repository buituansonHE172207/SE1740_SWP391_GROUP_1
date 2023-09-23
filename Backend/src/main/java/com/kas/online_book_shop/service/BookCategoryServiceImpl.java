package com.kas.online_book_shop.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.kas.online_book_shop.model.BookCategory;
import com.kas.online_book_shop.repository.BookCategoryRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Transactional
@RequiredArgsConstructor
@Service
public class BookCategoryServiceImpl implements BookCategoryService {
    private final BookCategoryRepository bookBookCategoryRepository;

    @Override
    public List<BookCategory> getAllBookCategories() {
        return bookBookCategoryRepository.findAll();
    }

    
}
