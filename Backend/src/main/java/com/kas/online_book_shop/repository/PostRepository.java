package com.kas.online_book_shop.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.kas.online_book_shop.enums.PostState;
import com.kas.online_book_shop.model.Post;
import com.kas.online_book_shop.model.PostCategory;

public interface PostRepository extends JpaRepository<Post, Long> {
    Page<Post> findByState(PostState state, Pageable pageable);
    Page<Post> findByCategory(PostCategory category, Pageable pageable);
    Page<Post> findByCategoryAndState(PostCategory category, PostState state, Pageable pageable);
    Page<Post> findByTitleContaining(String title, Pageable pageable);
    Page<Post> findByTitleContainingAndState(String title, PostState state, Pageable pageable);
    Page<Post> findByTitleContainingAndCategory(String title, PostCategory category, Pageable pageable);
    Page<Post> findByTitleContainingAndCategoryAndState(String title, PostCategory category, PostState state, Pageable pageable);
}
