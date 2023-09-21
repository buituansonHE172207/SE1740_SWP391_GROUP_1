package com.kas.online_book_shop.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
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
    public List<Book> findAllBooksByCollectionId(Long collectionId) {
        return bookRepository.findByCollections(collectionRepository.findById(collectionId).get());
    }

    @Override
    public List<Book> findEightBestSellingBooks() {
        Page<Book> topBooksPage = bookRepository.findAll(PageRequest.of(0, 8, Sort.by(Sort.Direction.DESC, "price")));
        return topBooksPage.getContent();
    }

    @Override
    public List<Book> findEightNewestBooks() {
        Page<Book> topBooksPage = bookRepository.findAll(PageRequest.of(0, 8, Sort.by(Sort.Direction.DESC, "publicationDate")));
        return topBooksPage.getContent();
    }
    
    
}
