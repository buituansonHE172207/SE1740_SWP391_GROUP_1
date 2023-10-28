package com.kas.online_book_shop.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.kas.online_book_shop.enums.PostState;
import com.kas.online_book_shop.model.Post;
import com.kas.online_book_shop.model.PostCategory;

public interface PostService {

    Page<Post> getPostByTileContainingAndCategoryAndState(String title, PostCategory category, PostState state, Pageable pageable);

    Post savePost(Post post);

    Post updatePost(Post post);

    void deletePost(Long id);

    Post getPostById(Long id);

    List<Post> getAll();
}
