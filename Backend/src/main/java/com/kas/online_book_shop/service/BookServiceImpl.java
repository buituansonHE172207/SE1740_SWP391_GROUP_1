package com.kas.online_book_shop.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.kas.online_book_shop.enums.BookState;
import com.kas.online_book_shop.exception.BookDuplicateException;
import com.kas.online_book_shop.exception.ISBNDuplicateException;
import com.kas.online_book_shop.exception.ResourceNotFoundException;
import com.kas.online_book_shop.model.Book;
import com.kas.online_book_shop.model.BookCategory;
import com.kas.online_book_shop.model.BookCollection;
import com.kas.online_book_shop.model.Image;
import com.kas.online_book_shop.repository.BookCollectionRepository;
import com.kas.online_book_shop.repository.BookRepository;
import com.kas.online_book_shop.repository.ImageRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Transactional
@RequiredArgsConstructor
@Service
public class BookServiceImpl implements BookService {
    private final BookRepository bookRepository;
    private final BookCollectionRepository collectionRepository;
    private final ImageRepository imageRepository;

    @Override
    public Page<Book> getAllBooks(Pageable pageable) {
        return bookRepository.findByState(BookState.ACTIVE, pageable);
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
        book.setState(BookState.ACTIVE);
        return bookRepository.save(book);
    }

    @Override
    public void deleteBook(Long id) {
        var existingBook = bookRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy sách để xóa"));
        existingBook.setState(BookState.HIDDEN);
    }

    @Override
    @Transactional
    public Book updateBook(Book book) {
        var existingBook = bookRepository.findById(book.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy sách để câp nhật"));
        existingBook.setAuthors(book.getAuthors());
        existingBook.setCategory(book.getCategory());
        existingBook.setTitle(book.getTitle());
        existingBook.setDescription(book.getDescription());
        existingBook.setISBN(book.getISBN());
        existingBook.setPage(book.getPage());
        existingBook.setCover(book.getCover());
        imageRepository.deleteAll(existingBook.getImages());
        existingBook.getImages().clear();
        for (Image image : book.getImages()) {
            image.setId(null);
            imageRepository.save(image);
        }
        existingBook.setImages(book.getImages());
        existingBook.setPrice(book.getPrice());
        existingBook.setDiscount(book.getDiscount());
        existingBook.setLanguage(book.getLanguage());
        existingBook.setPublisher(book.getPublisher());
        existingBook.setStock(book.getStock());
        existingBook.setWeight(book.getWeight());
        existingBook.setState(book.getState());
        existingBook.setCollections(book.getCollections());
        return existingBook;
    }

    @Override
    public Page<Book> getBookByCategoriesAndPriceRange(List<BookCategory> categories, int min, int max,
            Pageable pageable) {
        return bookRepository.findByCategoryInAndStateAndPriceBetween(categories, BookState.ACTIVE, min, max, pageable);

    }

    @Override
    public Page<Book> getBooksByCollectionAndPriceRanges(BookCollection collection, int min, int max,
            Pageable pageable) {
        if (collection != null)
            return bookRepository.findByCollectionsAndStateAndPriceBetween(collection, BookState.ACTIVE, min, max,
                    pageable);
        else
            return bookRepository.findByStateAndPriceBetween(BookState.ACTIVE, min, max, pageable);
    }

    @Override
    public Page<Book> getBooksByName(String name, Pageable pageable) {
        return bookRepository.findByTitleContainingAndState(name, BookState.ACTIVE, pageable);
    }

    @Override
    public void addBookToCollection(Long bookId, Long collectionId) {
        var existingBook = bookRepository.findById(bookId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy sách tương ứng"));
        var existingCollection = collectionRepository.findById(collectionId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy bộ sưu tập tương ứng"));
        if (existingBook.getCollections().contains(existingCollection)) {
            throw new BookDuplicateException("Sách này đã được thêm vào bộ sưu tập.");
        } else {
            existingBook.getCollections().add(existingCollection);
        }

    }

    @Override
    public Page<Book> queryBook(String title, BookState state, BookCollection collection, Pageable pageable) {
        return bookRepository.findByTitleContainingAndCategoryAndCollectionsAndState(title, state, null, collection, pageable);
    }

    @Override
    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    @Override
    public void changeBookState(Long id) {
        var existingBook = bookRepository.findById(id)
            .orElseThrow( () -> new ResourceNotFoundException("Không tìm thấy sách tương ứng"));
        if (existingBook.getState() == BookState.ACTIVE)
            existingBook.setState(BookState.HIDDEN);
        existingBook.setState(BookState.ACTIVE);
    }

    
    
}
