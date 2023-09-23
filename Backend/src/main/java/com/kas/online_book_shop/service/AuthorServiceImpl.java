package com.kas.online_book_shop.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.kas.online_book_shop.exception.AuthorNotFoundException;
import com.kas.online_book_shop.model.Author;
import com.kas.online_book_shop.repository.AuthorRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Transactional
@RequiredArgsConstructor
@Service
public class AuthorServiceImpl implements AuthorService {
    private final AuthorRepository authorRepository;

    @Override
    public void deleteAuthor(Long id) {
        var author = authorRepository.findById(id).orElse(null);
        if (author == null)
            throw new AuthorNotFoundException("Không tìm thấy tác giả để xóa");
        authorRepository.delete(author);
    }

    @Override
    public List<Author> getAllAuthors() {
        return authorRepository.findAll();
    }

    @Override
    public Author saveAuthor(Author author) {
        return authorRepository.save(author);
    }

    @Override
    public Author updateAuthor(Author author) {
        var currentAuthor = authorRepository.findById(author.getId());
        if (currentAuthor == null) 
            throw new AuthorNotFoundException("Không tìm thấy tác giả để cập nhật");
        return authorRepository.save(author);
    }

    @Override
    public Author getAuthorById(Long id) {
        return authorRepository.findById(id).orElse(null);
    }
    
    
}
