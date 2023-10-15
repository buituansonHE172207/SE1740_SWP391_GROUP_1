package com.kas.online_book_shop.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.kas.online_book_shop.enums.AccountState;
import com.kas.online_book_shop.enums.Role;
import com.kas.online_book_shop.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    Optional<User> findByState(AccountState state);

    Page<User> findByRole(Role role, Pageable pageable);

    Page<User> findByRoleNot(Role role, Pageable pageable);

    Page<User> findByRoleAndState(Role role, AccountState state, Pageable pageable);

    Page<User> findByRoleNotAndState(Role role, AccountState state, Pageable pageable);

    Page<User> findByFullNameContainingAndRole(String fullName, Role Role, AccountState state,
            Pageable pageable);

    Page<User> findByFullNameContainingAndRoleNot(String fullName, Role Role, AccountState state,
            Pageable pageable);

}
