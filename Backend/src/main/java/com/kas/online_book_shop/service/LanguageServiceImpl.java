package com.kas.online_book_shop.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.kas.online_book_shop.exception.LanguageNotFoundException;
import com.kas.online_book_shop.model.Language;
import com.kas.online_book_shop.repository.LanguageRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Transactional
@RequiredArgsConstructor
@Service
public class LanguageServiceImpl implements LanguageService {
    private final LanguageRepository languageRepository;

    @Override
    public void deleteLanguage(Long id) {
        var language = languageRepository.findById(id).orElse(null);
        if (language == null)
            throw new LanguageNotFoundException("Không tìm thấy tác giả để xóa");
        language.getBooks().forEach(x -> x.setLanguage(null));
        languageRepository.deleteById(id);
    }

    @Override
    public List<Language> getAllLanguages() {
        return languageRepository.findAll();
    }

    @Override
    public Language saveLanguage(Language Language) {
        return languageRepository.save(Language);
    }

    @Override
    public Language updateLanguage(Language Language) {
        var currentLanguage = languageRepository.findById(Language.getId()).orElse(null);
        if (currentLanguage == null)
            throw new LanguageNotFoundException("Không tìm thấy tác giả để cập nhật");
        return languageRepository.save(Language);
    }

    @Override
    public Language getLanguageById(Long id) {
        return languageRepository.findById(id).orElse(null);
    }

}
