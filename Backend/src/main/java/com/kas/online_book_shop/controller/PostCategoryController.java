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

import com.kas.online_book_shop.model.PostCategory;
import com.kas.online_book_shop.service.PostCategoryService;

import lombok.RequiredArgsConstructor;

@RestController
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001", "http://localhost"})
@RequiredArgsConstructor
@RequestMapping("/api/v1/post-category")
public class PostCategoryController {

    private final PostCategoryService postCategoryService;

    @GetMapping("")
    public ResponseEntity<List<PostCategory>> getPostCategories() {
        var postCategories = postCategoryService.getAllPostCategories();
        if (postCategories.isEmpty())
            return ResponseEntity.noContent().build();
        return ResponseEntity.ok(postCategories);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PostCategory> getPostCategoryId(
        @PathVariable Long id) {
        var postCategory = postCategoryService.getPostCategoryById(id);
        if (postCategory == null)
            return ResponseEntity.noContent().build();
        return ResponseEntity.ok(postCategory);
    }

    @PostMapping()
    public ResponseEntity<PostCategory> savePostCategory(
        @RequestBody PostCategory postCategory) {
        return ResponseEntity.status(HttpStatus.CREATED).body(postCategoryService.savePostCategory(postCategory));
    }

    @PutMapping()
    public ResponseEntity<PostCategory> updatePostCategory(
        @RequestBody PostCategory category) {
        return ResponseEntity.ok(postCategoryService.updatePostCategory(category));        
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePostCategory(@PathVariable Long id) {
        postCategoryService.deletePostCategory(id);
        return ResponseEntity.noContent().build();
    }
}
