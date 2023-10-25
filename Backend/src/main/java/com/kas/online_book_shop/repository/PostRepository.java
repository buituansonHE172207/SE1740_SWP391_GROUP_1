package com.kas.online_book_shop.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.kas.online_book_shop.enums.PostState;
import com.kas.online_book_shop.model.Post;
import com.kas.online_book_shop.model.PostCategory;

public interface PostRepository extends JpaRepository<Post, Long> {
        @Query("SELECT p FROM Post p " +
                        "WHERE (:title IS NULL OR p.title LIKE %:title%) " +
                        "AND (:category IS NULL OR p.category = :category) " +
                        "AND (:state IS NULL OR p.state = :state)")
        Page<Post> findByTitleContainingAndCategoryAndState(
                        @Param("title") String title,
                        @Param("category") PostCategory category,
                        @Param("state") PostState state,
                        Pageable pageable);
}
