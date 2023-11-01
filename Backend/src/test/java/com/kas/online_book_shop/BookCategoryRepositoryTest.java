package com.kas.online_book_shop;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import com.kas.online_book_shop.model.BookCategory;
import com.kas.online_book_shop.repository.BookCategoryRepository;

import jakarta.transaction.Transactional;
import jakarta.validation.ConstraintViolationException;

@SpringBootTest
@ActiveProfiles("test")
public class BookCategoryRepositoryTest {
    @Autowired
    private BookCategoryRepository bookCategoryRepository;

    @Test
    @Transactional
    void addValidBookCategory() {
        long currentNumberBookCategory = bookCategoryRepository.count();
        var bookCategory = BookCategory.builder().name("Category").build();
        bookCategoryRepository.save(bookCategory);
        assertThat(bookCategoryRepository.count()).isEqualTo(currentNumberBookCategory + 1);
        var newBookCategory = bookCategoryRepository.findAll().get((int)currentNumberBookCategory);
        assertThat(newBookCategory.getName()).isEqualTo("Category");
    }

    @Test
    @Transactional
    void addInvalidBookCategoryWithEmptyName() {
        long currentNumberBookCategory = bookCategoryRepository.count();
        ConstraintViolationException exception = assertThrows(ConstraintViolationException.class, () -> {
            var bookCategory = BookCategory.builder().name("").build();
            bookCategoryRepository.save(bookCategory);
            assertThat(bookCategoryRepository.count()).isEqualTo(currentNumberBookCategory);
        });
        assertThat(exception.getMessage()).contains("The category name is required"); 
    }

    @Test
    @Transactional
    void addInvalidBookCategoryWithNullName() {
        long currentNumberBookCategory = bookCategoryRepository.count();
        ConstraintViolationException exception = assertThrows(ConstraintViolationException.class, () -> {
            var bookCategory = BookCategory.builder().name(null).build();
            bookCategoryRepository.save(bookCategory);
            assertThat(bookCategoryRepository.count()).isEqualTo(currentNumberBookCategory);
        });
        assertThat(exception.getMessage()).contains("The category name is required"); 
    }

}
