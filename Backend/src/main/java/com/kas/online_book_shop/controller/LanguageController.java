package com.kas.online_book_shop.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kas.online_book_shop.model.Language;
import com.kas.online_book_shop.service.LanguageService;

import lombok.RequiredArgsConstructor;

@RestController
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001", "http://localhost"})
@RequiredArgsConstructor
@RequestMapping("/api/v1/language")
public class LanguageController {
    private final LanguageService languageService;

    @GetMapping("")
    public ResponseEntity<List<Language>> getLanguages() {
        var Languages = languageService.getAllLanguages();
        if (Languages.isEmpty())
            return ResponseEntity.noContent().build();
        else
            return ResponseEntity.ok(Languages);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Language> getLanguageById(@PathVariable Long id) {
        var Language = languageService.getLanguageById(id);
        if (Language == null)
            return ResponseEntity.noContent().build();
        else
            return ResponseEntity.ok(Language);
    }

    @PutMapping
    public ResponseEntity<Language> updateLanguage(@RequestBody Language updatedLanguage) {
        return ResponseEntity.ok(languageService.updateLanguage(updatedLanguage));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLanguage(@PathVariable Long id) {
        languageService.deleteLanguage(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping()
    public ResponseEntity<Language> saveLanguage(@RequestBody Language language) {
        return ResponseEntity.status(HttpStatus.CREATED).body(languageService.saveLanguage(language));
    }
}
