package com.kas.online_book_shop.service;

import java.util.List;

import com.kas.online_book_shop.model.PostCategory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface PostCategoryService {
    List<PostCategory> getAllPostCategories();

    Page<PostCategory> getAllPostCategories(Pageable pageable);

    PostCategory getPostCategoryById(Long id);

    PostCategory savePostCategory(PostCategory postCategory);

    PostCategory updatePostCategory(PostCategory postCategory);

    void deletePostCategory(Long id);
}