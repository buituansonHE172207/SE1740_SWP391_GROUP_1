package com.kas.online_book_shop.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kas.online_book_shop.model.Author;

public interface AuthorRepository extends JpaRepository<Author, Long> {

}
