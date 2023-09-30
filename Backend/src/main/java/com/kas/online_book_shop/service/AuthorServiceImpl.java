package com.kas.online_book_shop.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.kas.online_book_shop.exception.ResourceNotFoundException;
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
        var author = authorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy tác giả để xóa"));

        author.getBooks().forEach(x -> x.getAuthors().remove(author));
        authorRepository.deleteById(id);
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
        authorRepository.findById(author.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy tác giả để cập nhật"));
        return authorRepository.save(author);
    }

    @Override
    public Author getAuthorById(Long id) {
        return authorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy tác giả tương ứng"));
    }

    @Override
    public Page<Author> getAllAuthor(Pageable pageable) {
        return authorRepository.findAll(pageable);
    }

}
