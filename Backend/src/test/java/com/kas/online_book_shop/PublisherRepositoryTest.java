package com.kas.online_book_shop;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import com.kas.online_book_shop.model.Publisher;
import com.kas.online_book_shop.repository.PublisherRepository;

import jakarta.transaction.Transactional;
import jakarta.validation.ConstraintViolationException;

@SpringBootTest
@ActiveProfiles("test")
public class PublisherRepositoryTest {
    @Autowired
    private PublisherRepository publisherRepository;

    @Transactional
    @Test
    void addValidPublisher() {
        long currentNumberPublisher = publisherRepository.count();
        var publisher = Publisher.builder().name("publisher").website("http://website.com").build();
        publisherRepository.save(publisher);
        assertThat(publisherRepository.count()).isEqualTo(currentNumberPublisher + 1);
        var newPublisher = publisherRepository.findAll().get((int)currentNumberPublisher);
        assertThat(newPublisher.getName()).isEqualTo("publisher");
        assertThat(newPublisher.getWebsite()).isEqualTo("http://website.com");  
    }

    @Test
    @Transactional
    void addInvalidAuthorWithInvalidWebsite() {
        long currentNumberPublisher = publisherRepository.count();
        ConstraintViolationException exception = assertThrows(ConstraintViolationException.class, () -> {
            Publisher publisher = Publisher.builder().name("publisher").website("company").build();
            publisherRepository.save(publisher);
            assertThat(publisherRepository.count()).isEqualTo(currentNumberPublisher);
        });
        assertThat(exception.getMessage()).contains("Invalid url"); 
    }

    @Test
    @Transactional
    void addInvalidAuthorWithEmptyName() {
        long currentNumberPublisher = publisherRepository.count();
        ConstraintViolationException exception = assertThrows(ConstraintViolationException.class, () -> {
            Publisher publisher = Publisher.builder().name("").website("http://website.com").build();
            publisherRepository.save(publisher);
            assertThat(publisherRepository.count()).isEqualTo(currentNumberPublisher);
        });
        assertThat(exception.getMessage()).contains("The publisher name is required"); 
    }
}
