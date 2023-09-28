package com.kas.online_book_shop.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.kas.online_book_shop.exception.ResourceNotFoundException;
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
        var language = languageRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy tác giả để xóa"));
        language.getBooks().forEach(x -> x.setLanguage(null));
        languageRepository.deleteById(id);
    }

    @Override
    public List<Language> getAllLanguages() {
        return languageRepository.findAll();
    }

    @Override
    public Language saveLanguage(Language language) {
        return languageRepository.save(language);
    }

    @Override
    public Language updateLanguage(Language language) {
        languageRepository.findById(language.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy tác giả để xóa"));
        return languageRepository.save(language);
    }

    @Override
    public Language getLanguageById(Long id) {
        return languageRepository.findById(id).orElse(null);
    }

}
