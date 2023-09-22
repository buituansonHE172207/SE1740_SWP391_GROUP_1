package com.kas.online_book_shop.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kas.online_book_shop.model.Language;

public interface LanguageRepository extends JpaRepository<Language, Long> {
    
}
