package com.kas.online_book_shop.service;

import java.util.List;

import com.kas.online_book_shop.model.Post;

public interface PostService {
    List<Post> getAllPosts();
    Post savePost(Post post);
    Post updatePost(Post post);
    void deletePost(Long id);
    Post getPostById(Long id);       
}
