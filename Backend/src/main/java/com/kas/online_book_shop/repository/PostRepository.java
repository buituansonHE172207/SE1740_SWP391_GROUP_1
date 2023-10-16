package com.kas.online_book_shop.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.kas.online_book_shop.enums.PostState;
import com.kas.online_book_shop.model.Post;
import com.kas.online_book_shop.model.PostCategory;

public interface PostRepository extends JpaRepository<Post, Long> {
    Page<Post> findByTitleContainingAndCategoryAndState(String title, PostCategory category, PostState state, Pageable pageable);
}
