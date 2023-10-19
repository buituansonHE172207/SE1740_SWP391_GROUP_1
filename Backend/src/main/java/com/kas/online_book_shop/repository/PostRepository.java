package com.kas.online_book_shop.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.util.StringUtils;

import com.kas.online_book_shop.enums.PostState;
import com.kas.online_book_shop.model.Post;
import com.kas.online_book_shop.model.PostCategory;

import jakarta.persistence.criteria.Predicate;

public interface PostRepository extends JpaRepository<Post, Long> {
    Page<Post> findAll(Specification<Post> spec, Pageable pageable);

    default Page<Post> findPostsByCriteria(String title, PostCategory category, PostState state, Pageable pageable) {
        return findAll((root, query, criteriaBuilder) -> {
            Predicate predicate = criteriaBuilder.conjunction();

            if (!title.isEmpty()) {
                predicate = criteriaBuilder.and(predicate, criteriaBuilder.like(root.get("title"), "%" + title + "%"));
            }

            if (category != null) {
                predicate = criteriaBuilder.and(predicate, criteriaBuilder.equal(root.get("category"), category));
            }

            if (state != null) {
                predicate = criteriaBuilder.and(predicate, criteriaBuilder.equal(root.get("state"), state));
            }

            return predicate;
        }, pageable);
    }
    Page<Post> findByState(PostState state, Pageable pageable);
}
