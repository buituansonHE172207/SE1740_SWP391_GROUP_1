package com.kas.online_book_shop.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.kas.online_book_shop.model.Book;
import com.kas.online_book_shop.repository.BookCategoryRepository;
import com.kas.online_book_shop.repository.BookCollectionRepository;
import com.kas.online_book_shop.repository.BookRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Transactional
@RequiredArgsConstructor
@Service
public class BookServiceImpl implements BookService {
    private final BookRepository bookRepository;
    private final BookCollectionRepository collectionRepository;
    private final BookCategoryRepository categoryRepository;

    @Override
    public List<Book> findAllBooks() {
        return bookRepository.findAll();
    }

    @Override
    public List<Book> findAllBooksByCategoryId(Long categoryId) {
        return bookRepository.findByCategory(categoryRepository.findById(categoryId).get());
    }

    @Override
    public Page<Book> findAllBooks(Pageable pageable) {
        return bookRepository.findAll(pageable);
    }

    
}
