package com.kas.online_book_shop.service;

import java.util.List;

import com.kas.online_book_shop.model.Author;

public interface AuthorService {
    List<Author> getAllAuthors();

    Author saveAuthor(Author author);

    Author updateAuthor(Author author);

    void deleteAuthor(Long id);

    Author getAuthorById(Long id);
    
}
