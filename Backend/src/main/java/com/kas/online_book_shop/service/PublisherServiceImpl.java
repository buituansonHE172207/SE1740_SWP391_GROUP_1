package com.kas.online_book_shop.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.kas.online_book_shop.exception.ResourceNotFoundException;
import com.kas.online_book_shop.model.Book;
import com.kas.online_book_shop.model.Publisher;
import com.kas.online_book_shop.repository.PublisherRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Transactional
@RequiredArgsConstructor
@Service
public class PublisherServiceImpl implements PublisherService {
    private final PublisherRepository publisherRepository;

    @Override
    public void deletePublisher(Long id) {
        var existingPublisher = publisherRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy nhà xuất bản để xóa."));
        for (Book book : existingPublisher.getBooks()) {
            book.setPublisher(null);
        }
        publisherRepository.deleteById(id);
    }

    @Override
    public List<Publisher> getAllPublishers() {
        return publisherRepository.findAll();
    }

    @Override
    public Publisher getPublisherById(Long id) {
        return publisherRepository.findById(id).orElse(null);
    }

    @Override
    public Publisher savePublisher(Publisher publisher) {
        return publisherRepository.save(publisher);
    }

    @Override
    public Publisher updatePublisher(Publisher publisher) {
        publisherRepository.findById(publisher.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy nhà xuất bản để cập nhật."));
        return publisherRepository.save(publisher);
    }

}
