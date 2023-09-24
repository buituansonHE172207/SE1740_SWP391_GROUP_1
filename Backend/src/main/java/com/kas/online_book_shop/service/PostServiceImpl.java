package com.kas.online_book_shop.service;

import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import org.springframework.stereotype.Service;

import com.kas.online_book_shop.model.Author;
import com.kas.online_book_shop.model.Book;
import com.kas.online_book_shop.model.Post;

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
        // TODO Auto-generated method stub

    }

    @Override
    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    // @Override
    // public Page<Post> getAllPosts(Pageable pageable) {
    //     return postRepository.findAll(pageable);
    // }

    @Override
    public Post getPostById(Long id) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public Post savePost(Post post) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public Post updatePost(Post post) {
        // TODO Auto-generated method stub
        return null;
    }

}
