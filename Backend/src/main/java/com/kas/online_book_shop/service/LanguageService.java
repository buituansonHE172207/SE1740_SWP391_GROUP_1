package com.kas.online_book_shop.service;

import java.util.List;

import com.kas.online_book_shop.model.Language;

public interface LanguageService {
    List<Language> getAllLanguages();

    Language saveLanguage(Language language);

    Language updateLanguage(Language language);

    void deleteLanguage(Long id);

    Language getLanguageById(Long id);
}
