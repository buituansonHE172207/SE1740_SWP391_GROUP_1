package com.kas.online_book_shop.controller;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.kas.online_book_shop.dto.BookDTO;
import com.kas.online_book_shop.dto.BookMapper;
import com.kas.online_book_shop.model.Book;
import com.kas.online_book_shop.service.BookService;

import lombok.RequiredArgsConstructor;

@RestController
//@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
@RequestMapping("/api/v1/book")
public class BookController {
    private final BookService bookService;

    @GetMapping("")
    public List<BookDTO> getAllBooks() {
        return bookService.findAllBooks();
    }

    @GetMapping("/sorted-and-paged")
    public Page<BookDTO> getAllBooksSortedAndPaged(
            @RequestParam String sortBy,
            @RequestParam int page,
            @RequestParam int size,
            @RequestParam(defaultValue = "asc") String sortOrder) {
        Sort.Direction direction = (sortOrder.equalsIgnoreCase("asc")) ? Direction.ASC : Direction.DESC;
        Pageable pageable = PageRequest.of(page, size, direction, sortBy);
        return bookService.findAllBooks(pageable);
    }

    @GetMapping("/{id}")
    public ResponseEntity<BookDTO> getBook(@PathVariable Long id) {
        Book book = bookService.getBookById(id);
        if (book != null) {
            BookDTO bookDTO = BookMapper.bookToBookDTO(book);
            return ResponseEntity.ok(bookDTO);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
