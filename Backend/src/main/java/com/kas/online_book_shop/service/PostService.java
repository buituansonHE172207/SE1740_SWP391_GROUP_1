package com.kas.online_book_shop.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.kas.online_book_shop.enums.PostState;
import com.kas.online_book_shop.model.Post;
import com.kas.online_book_shop.model.PostCategory;

public interface PostService {

    Page<Post> getAllPostsWithSorterAndFilter(PostCategory category, PostState state, Pageable pageable);

    Page<Post> searchPostByTitleWithSorterAndFilter(String title, PostCategory category, PostState state, Pageable pageable);

    Post savePost(Post post);

    Post updatePost(Post post);

    void deletePost(Long id);

    Post getPostById(Long id);
}
