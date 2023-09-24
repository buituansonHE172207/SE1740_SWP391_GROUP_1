package com.kas.online_book_shop.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kas.online_book_shop.model.PostCategory;
import com.kas.online_book_shop.service.PostCategoryService;

import lombok.RequiredArgsConstructor;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
@RequestMapping("/api/v1/post-category")
public class PostCategoryController {
    private final PostCategoryService postCategoryService;
    @GetMapping()
    public ResponseEntity<List<PostCategory>> getBookCategories() {
        var postCategories = postCategoryService.getAllPostCategories();
        if (postCategories == null) {
            return ResponseEntity.noContent().build();
        } else 
            return ResponseEntity.ok(postCategories);
    } 
}
