package com.kas.online_book_shop.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.kas.online_book_shop.model.BookCollection;
import com.kas.online_book_shop.repository.BookCollectionRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Transactional
@RequiredArgsConstructor
@Service
public class BookCollectionServiceImpl implements BookCollectionService {
    private final BookCollectionRepository BookCollectionRepository;

    @Override
    public void deleteBookCollection(Long id) {
        
    }

    @Override
    public List<BookCollection> getAllBookCollections() {
        return BookCollectionRepository.findAll();
    }

    @Override
    public BookCollection saveBookCollection(BookCollection bookCollection) {
        return BookCollectionRepository.save(bookCollection);
    }

    @Override
    public BookCollection updateBookCollection(BookCollection bookCollection) {
        var currentBookCollection = BookCollectionRepository.findById(bookCollection.getId()).orElse(null);
        //if (currentBookCollection == null) 
            //throw new BookCollectionNotFoundException("Không tìm thấy tác giả để cập nhật");
        return BookCollectionRepository.save(bookCollection);
    }

    @Override
    public BookCollection getBookCollectionById(Long id) {
        return BookCollectionRepository.findById(id).orElse(null);
    }
    
    
}