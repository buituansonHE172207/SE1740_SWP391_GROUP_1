package com.kas.online_book_shop;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;

import com.kas.online_book_shop.model.User;
import com.kas.online_book_shop.repository.UserRepository;

@SpringBootTest
public class UserRepositoryTest {

    @Autowired
    private UserRepository userRepository;

    @Test
    @Transactional
    public void testFindUserByFullNameAndState() {
        Pageable pageable = PageRequest.of(0, 10);
        Page<User> resultPage = userRepository.findByFullNameContainingAndRoleAndState(null, null, null, pageable);
        assertThat(resultPage.getTotalElements()).isGreaterThan(0);
    }
}
