package com.kas.online_book_shop.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.kas.online_book_shop.exception.PublisherNotFoundException;
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
        // TODO Auto-generated method stub

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
    public Publisher savePublisher(Publisher Publisher) {
        return publisherRepository.save(Publisher);
    }

    @Override
    public Publisher updatePublisher(Publisher Publisher) {
        var currentPublisher = publisherRepository.findById(Publisher.getId()).orElse(null);
        if (currentPublisher == null)
            throw new PublisherNotFoundException("Không tìm thấy tác giả để xoá");
        return publisherRepository.save(Publisher);
    }

}
