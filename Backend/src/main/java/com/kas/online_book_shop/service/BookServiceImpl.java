package com.kas.online_book_shop.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.kas.online_book_shop.exception.BookNotFoundException;
import com.kas.online_book_shop.exception.ISBNDuplicateException;
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
    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    @Override
    public Page<Book> getAllBooks(Pageable pageable) {
        return bookRepository.findAll(pageable);
    }

    @Override
    public Book getBookById(Long id) {
        return bookRepository.findById(id).orElse(null);
    }

    @Override
    public Book saveBook(Book book) {
        if (bookRepository.existsByISBN(book.getISBN())) {
            throw new ISBNDuplicateException("Mã ISBN không thể bị trùng.");
        }
        return bookRepository.save(book);
    }

    @Override
    public void DeleteBook(Long id) {
        var deletedBook = bookRepository.findById(id).orElse(null);
        if (deletedBook == null)
            throw new BookNotFoundException("Không tìm thấy sách để xóa");
        else 
            bookRepository.delete(deletedBook);
    }

    @Override
    public Book UpdateBook(Book book) {
        var updatedBook = bookRepository.findById(book.getId()).orElse(null);
        if (updatedBook == null)    
            throw new BookNotFoundException("Không tìm thấy sách để câp nhật");
        else 
            return bookRepository.save(book);
    }

}
