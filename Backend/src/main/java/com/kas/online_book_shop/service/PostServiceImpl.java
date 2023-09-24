package com.kas.online_book_shop.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.kas.online_book_shop.exception.PostNotFoundException;
import com.kas.online_book_shop.model.Post;
import com.kas.online_book_shop.model.PostCategory;
import com.kas.online_book_shop.repository.PostRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Transactional
@RequiredArgsConstructor
@Service
public class PostServiceImpl implements PostService {

    private final PostRepository postRepository;

    @Override
    public void deletePost(Long id) {
        var currentPost = postRepository.findById(id).orElse(null);
        if (currentPost == null)
            throw new PostNotFoundException("khong tim thay post de xoa:");
        postRepository.deleteById(id);
    }

    @Override
    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    @Override
    public Page<Post> getAllPosts(Pageable pageable) {
        return postRepository.findAll(pageable);
    }

    @Override
    public Post getPostById(Long id) {
        return postRepository.findById(id).orElse(null);
    }

    @Override
    public Post savePost(Post post) {
        post.setCreatedAt(LocalDateTime.now());
        return postRepository.save(post);
    }

    @Override
    public Post updatePost(Post post) {
        var currentPost = postRepository.findById(post.getId()).orElse(null);
        if (currentPost == null)
            throw new PostNotFoundException("khong tim thay post de cap nhat:");
        post.setCreatedAt(currentPost.getCreatedAt());
        return postRepository.save(post);
    }

    @Override
    public Page<Post> getPostsByCategory(PostCategory postCategory, Pageable pageable) {
        return postRepository.findByCategory(postCategory, pageable);
    }

    
}
