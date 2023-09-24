package com.kas.online_book_shop.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.kas.online_book_shop.exception.BookCategoryNotFoundException;
import com.kas.online_book_shop.model.BookCollection;
import com.kas.online_book_shop.repository.BookCollectionRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Transactional
@RequiredArgsConstructor
@Service
public class BookCollectionServiceImpl implements BookCollectionService {
    private final BookCollectionRepository bookCollectionRepository;

    @Override
    public void deleteBookCollection(Long id) {
        var bookCollection = bookCollectionRepository.findById(id).orElse(null);
        if (bookCollection == null) 
            throw new BookCategoryNotFoundException("Không tìm bộ sưu tập để xóa");
        bookCollection.getBooks().forEach((book) -> book.getCollections().remove(bookCollection));
        bookCollectionRepository.deleteById(id);
    }

    @Override
    public List<BookCollection> getAllBookCollections() {
        return bookCollectionRepository.findAll();
    }

    @Override
    public BookCollection saveBookCollection(BookCollection bookCollection) {
        return bookCollectionRepository.save(bookCollection);
    }

    @Override
    public BookCollection updateBookCollection(BookCollection bookCollection) {
        var currentBookCollection = bookCollectionRepository.findById(bookCollection.getId()).orElse(null);
        if (currentBookCollection == null) 
            throw new BookCategoryNotFoundException("Không tìm bộ sưu tập để cập nhật");
        return bookCollectionRepository.save(bookCollection);
    }

    @Override
    public BookCollection getBookCollectionById(Long id) {
        return bookCollectionRepository.findById(id).orElse(null);
    }
    
    
}