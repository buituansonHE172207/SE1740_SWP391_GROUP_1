package com.kas.online_book_shop.controller;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.kas.online_book_shop.enums.PostState;
import com.kas.online_book_shop.model.Post;
import com.kas.online_book_shop.model.PostCategory;
import com.kas.online_book_shop.service.PostService;

import lombok.RequiredArgsConstructor;

@RestController
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
@RequiredArgsConstructor
@RequestMapping("/api/v1/post")
public class PostController {
    private final PostService postService;

    @GetMapping("/{id}")
    public ResponseEntity<Post> getPostById(@PathVariable Long id) {
        return ResponseEntity.ok(postService.getPostById(id));
    }

    @PostMapping
    public ResponseEntity<Post> addPost(@RequestBody Post post) {
        Post savedPost = postService.savePost(post);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedPost);
    }

    @PutMapping()
    public ResponseEntity<Post> updatePost(@RequestBody Post post) {
        return ResponseEntity.ok(postService.updatePost(post));
    }

    @GetMapping("")
    public ResponseEntity<Page<Post>> getAllPosts(
            @RequestParam(required = false) PostCategory category,
            @RequestParam(required = false) PostState state,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(defaultValue = "asc") String sortOrder) {
        Sort.Direction direction = (sortOrder.equalsIgnoreCase("asc")) ? Direction.ASC : Direction.DESC;
        Pageable pageable = PageRequest.of(page, size, direction, sortBy);
        return ResponseEntity.ok(postService.getAllPostsWithSorterAndFilter(category, state, pageable));
    }

    @GetMapping("/search")
    public ResponseEntity<Page<Post>> searchPost(
            @RequestParam(required = false) String title,
            @RequestParam(required = false) PostCategory category,
            @RequestParam(required = false) PostState state,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(defaultValue = "asc") String sortOrder) {
        Sort.Direction direction = (sortOrder.equalsIgnoreCase("asc")) ? Direction.ASC : Direction.DESC;
        Pageable pageable = PageRequest.of(page, size, direction, sortBy);
        return ResponseEntity.ok(postService.searchPostByTitleWithSorterAndFilter(title, category, state, pageable));
    }
}
