package com.kas.online_book_shop.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kas.online_book_shop.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    //public List<User> findByRolesContains(Role role);
    List<User> findByRolesId(Long roleId);
}
