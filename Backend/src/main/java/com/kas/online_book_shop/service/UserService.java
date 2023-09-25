package com.kas.online_book_shop.service;

import java.util.*;

import com.kas.online_book_shop.model.Role;
import com.kas.online_book_shop.model.User;

public interface UserService {
    List<User> getAllUsers();

    User getUserById(Long id);

    List<User> getUserByRoleId(Long roleId);

    // User getUserByEmail(String email);
}
