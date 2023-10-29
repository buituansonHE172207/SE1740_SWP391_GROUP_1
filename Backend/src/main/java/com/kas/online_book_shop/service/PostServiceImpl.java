package com.kas.online_book_shop.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.kas.online_book_shop.enums.PostState;
import com.kas.online_book_shop.exception.ResourceNotFoundException;
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
        var existingPost = postRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy post để xóa"));
        existingPost.setState(PostState.DELETED);
    }

    @Override
    public Post getPostById(Long id) {
        return postRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy post tương ứng"));
    }

    @Override
    public Post savePost(Post post) {
        post.setCreatedAt(LocalDateTime.now());
        return postRepository.save(post);
    }

    @Override
    public Post updatePost(Post post) {
        var currentPost = postRepository.findById(post.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy post để cập nhật"));
        post.setCreatedAt(currentPost.getCreatedAt());
        return postRepository.save(post);
    }

    @Override
    public Page<Post> getPostByTileContainingAndCategoryAndState(
            String title,
            PostCategory category,
            PostState state,
            Pageable pageable) {
        return postRepository.findByTitleContainingAndCategoryAndState(title, category, state, pageable);
    }

    @Override
    public List<Post> getAll() {
        return postRepository.findAll();
    }

    

}
