package com.kas.online_book_shop;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;

import com.kas.online_book_shop.enums.PostState;
import com.kas.online_book_shop.model.Post;
import com.kas.online_book_shop.repository.PostRepository;

@SpringBootTest
public class PostRepositoryTest {

    @Autowired
    private PostRepository postRepository;

    @Test
    @Transactional
    public void queryPost() {
        Pageable pageable = PageRequest.of(0, 10);
        Page<Post> resultPage = postRepository.findByTitleContainingAndCategoryAndState("", null, null, pageable);
        assertThat(resultPage.getTotalElements()).isGreaterThan(0);
        resultPage = postRepository.findByTitleContainingAndCategoryAndState("p", null, PostState.DRAFT, pageable);
        assertThat(resultPage.getTotalElements()).isGreaterThan(0);
        resultPage = postRepository.findByTitleContainingAndCategoryAndState("", null, null, pageable);
        assertThat(resultPage.getTotalElements()).isGreaterThan(0);
    }
}
