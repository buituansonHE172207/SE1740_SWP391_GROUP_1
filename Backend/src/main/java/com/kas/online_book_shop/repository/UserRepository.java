package com.kas.online_book_shop.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.kas.online_book_shop.enums.AccountState;
import com.kas.online_book_shop.enums.Role;
import com.kas.online_book_shop.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
        Optional<User> findByEmail(String email);

        @Query("SELECT u FROM User u " +
                        "WHERE (:fullName IS NULL OR u.fullName LIKE %:fullName%) " +
                        "AND (:role IS NULL OR u.role = :role) " +
                        "AND (:state IS NULL OR u.state = :state)")
        Page<User> findByFullNameContainingAndRoleAndState(
                        @Param("fullName") String fullName,
                        @Param("role") Role role,
                        @Param("state") AccountState state,
                        Pageable pageable);

        Page<User> findByFullNameContainingAndRoleNotAndState(
                        String fullName,
                        Role Role,
                        AccountState state,
                        Pageable pageable);
}
