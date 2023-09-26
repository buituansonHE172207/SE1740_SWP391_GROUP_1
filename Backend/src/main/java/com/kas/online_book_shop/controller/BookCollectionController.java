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

import com.kas.online_book_shop.model.BookCollection;
import com.kas.online_book_shop.service.BookCollectionService;

import lombok.RequiredArgsConstructor;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
@RequestMapping("/api/v1/book-collection")
public class BookCollectionController {
    private final BookCollectionService bookCollectionService;

    @GetMapping("")
    public ResponseEntity<List<BookCollection>> getBookCollections() {
        var bookCollections = bookCollectionService.getAllBookCollections();
        if (bookCollections.isEmpty())
            return ResponseEntity.noContent().build();
        else
            return ResponseEntity.ok(bookCollections);
    }

    @GetMapping("/{id}")
    public ResponseEntity<BookCollection> getBookCollectionById(@PathVariable Long id) {
        var bookCollection = bookCollectionService.getBookCollectionById(id);
        if (bookCollection == null)
            return ResponseEntity.noContent().build();
        else
            return ResponseEntity.ok(bookCollection);
    }

    @PostMapping()
    public ResponseEntity<BookCollection> saveBookCollection(@RequestBody BookCollection BookCollection) {
        return ResponseEntity.status(HttpStatus.CREATED).body(bookCollectionService.saveBookCollection(BookCollection));
    }

    @PutMapping
    public ResponseEntity<BookCollection> updateBookCollection(@RequestBody BookCollection updatedBookCollection) {
        return ResponseEntity.ok(bookCollectionService.updateBookCollection(updatedBookCollection));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBookCollection(@PathVariable Long id) {
        bookCollectionService.deleteBookCollection(id);
        return ResponseEntity.noContent().build();
    }

}
