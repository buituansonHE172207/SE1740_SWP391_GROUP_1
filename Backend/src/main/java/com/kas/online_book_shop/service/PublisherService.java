package com.kas.online_book_shop.service;

import java.util.List;

import com.kas.online_book_shop.model.Publisher;

public interface PublisherService {
    List<Publisher> getAllPublishers();

    Publisher savePublisher(Publisher Publisher);

    Publisher updatePublisher(Publisher Publisher);

    void deletePublisher(Long id);

    Publisher getPublisherById(Long id);
}
