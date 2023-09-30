package com.kas.online_book_shop.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.kas.online_book_shop.exception.ResourceNotFoundException;
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
        var bookCollection = bookCollectionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm bộ sưu tập để xóa"));
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
        bookCollectionRepository.findById(bookCollection.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm bộ sưu tập để cập nhật"));
        return bookCollectionRepository.save(bookCollection);
    }

    @Override
    public BookCollection getBookCollectionById(Long id) {
        return bookCollectionRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy bộ sưu tập tương ứng"));
    }

    @Override
    public Page<BookCollection> getAllBookCollections(Pageable pageable) {
        return bookCollectionRepository.findAll(pageable);
    }

}