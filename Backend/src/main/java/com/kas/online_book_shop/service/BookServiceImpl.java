package com.kas.online_book_shop.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.kas.online_book_shop.enums.BookState;
import com.kas.online_book_shop.enums.OrderState;
import com.kas.online_book_shop.exception.ISBNDuplicateException;
import com.kas.online_book_shop.exception.ResourceNotFoundException;
import com.kas.online_book_shop.model.Book;
import com.kas.online_book_shop.model.BookCategory;
import com.kas.online_book_shop.model.BookCollection;
import com.kas.online_book_shop.repository.BookRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Transactional
@RequiredArgsConstructor
@Service
public class BookServiceImpl implements BookService {
    private final BookRepository bookRepository;

    @Override
    public Page<Book> getAllBooks(Pageable pageable) {
        return bookRepository.findAll(pageable);
    }

    @Override
    public Book getBookById(Long id) {
        return bookRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy sách tương ứng"));
    }

    @Override
    public Book saveBook(Book book) {
        if (bookRepository.existsByISBN(book.getISBN())) {
            throw new ISBNDuplicateException("Mã ISBN không thể bị trùng.");
        }
        return bookRepository.save(book);
    }

    @Override
    public void deleteBook(Long id) {
        var existingBook = bookRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy sách để xóa"));
        existingBook.getOrderDetails().forEach((x) -> {
            if (x.getOrder().getState() == OrderState.ORDER)
                x.setBook(null);
        });
        bookRepository.deleteById(id);
    }

    @Override
    public Book updateBook(Book book) {
        bookRepository.findById(book.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy sách để câp nhật"));
        return bookRepository.save(book);
    }

    @Override
    public Page<Book> getBookByCategoriesAndPriceRange(List<BookCategory> categories, int min, int max,
            Pageable pageable) {
        return bookRepository.findByCategoryInAndStateAndPriceBetween(categories, BookState.ACTIVE,min ,max , pageable);

    }

    @Override
    public Page<Book> getBooksByCollectionAndPriceRanges(BookCollection collection, int min, int max,
            Pageable pageable) {
        return bookRepository.findByCollectionsAndStateAndPriceBetween(collection,BookState.ACTIVE, min, max, pageable);
    }

    @Override
    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    @Override
    public Page<Book> getBooksByName(String name, Pageable pageable) {
        return bookRepository.findByTitleContaining(name, pageable);
    }

    @Override
    public Page<Book> getBookByState(BookState state, Pageable pageable) {
        return bookRepository.findByState(state, pageable);
    }

    
}
