package com.kas.online_book_shop;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import com.kas.online_book_shop.model.Author;
import com.kas.online_book_shop.repository.AuthorRepository;

import jakarta.transaction.Transactional;
import jakarta.validation.ConstraintViolationException;

@SpringBootTest
@ActiveProfiles("test")
public class AuthorRepositoryTest {
    @Autowired
    private AuthorRepository authorRepository;

    @Test
    @Transactional
    void addValidAuthor() {
        long currentNumberAuthor = authorRepository.count();
        Author author = Author.builder().name("tac gia").company("compay").build();
        authorRepository.save(author);
        assertThat(authorRepository.count()).isEqualTo(currentNumberAuthor + 1);
        var newAuthor = authorRepository.findAll().get((int)currentNumberAuthor);
        assertThat(newAuthor.getName()).isEqualTo("tac gia");
        assertThat(newAuthor.getCompany()).isEqualTo("compay");  
    }

    @Test
    @Transactional
    void addInvalidAuthorWithEmptyName() {
        long currentNumberAuthor = authorRepository.count();
        ConstraintViolationException exception = assertThrows(ConstraintViolationException.class, () -> {
            Author author = Author.builder().name("").company("company").build();
            authorRepository.save(author);
            assertThat(authorRepository.count()).isEqualTo(currentNumberAuthor);
        });
        assertThat(exception.getMessage()).contains("The author name is required"); 
    }

    @Test
    @Transactional
    void addInvalidAuthorWithNullName() {
        long currentNumberAuthor = authorRepository.count();
        ConstraintViolationException exception = assertThrows(ConstraintViolationException.class, () -> {
            Author author = Author.builder().name(null).company("company").build();
            authorRepository.save(author);
            assertThat(authorRepository.count()).isEqualTo(currentNumberAuthor);
        });
        assertThat(exception.getMessage()).contains("The author name is required"); 
    }

}
