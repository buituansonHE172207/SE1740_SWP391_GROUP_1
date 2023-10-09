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

import com.kas.online_book_shop.model.Publisher;
import com.kas.online_book_shop.service.PublisherService;

import lombok.RequiredArgsConstructor;

@RestController
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001", "http://localhost"})
@RequiredArgsConstructor
@RequestMapping("/api/v1/publisher")
public class PublisherController {
    private final PublisherService publisherService;

    @GetMapping("")
    public ResponseEntity<List<Publisher>> getPublishers() {
        var publishers = publisherService.getAllPublishers();
        if (publishers == null)
            return ResponseEntity.noContent().build();
        else
            return ResponseEntity.ok(publishers);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Publisher> getPublisherById(@PathVariable Long id) {
        var Publisher = publisherService.getPublisherById(id);
        if (Publisher == null)
            return ResponseEntity.noContent().build();
        else
            return ResponseEntity.ok(Publisher);
    }

    @PutMapping
    public ResponseEntity<Publisher> updatePublisher(@RequestBody Publisher updatedPublisher) {
        var Publisher = publisherService.updatePublisher(updatedPublisher);
        return ResponseEntity.ok(Publisher);
    }

    @PostMapping()
    public ResponseEntity<Publisher> savePublisher(@RequestBody Publisher publisher) {
        return ResponseEntity.status(HttpStatus.CREATED).body(publisherService.savePublisher(publisher));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePublisher(@PathVariable Long id) {
        publisherService.deletePublisher(id);
        return ResponseEntity.noContent().build();
    }
}
