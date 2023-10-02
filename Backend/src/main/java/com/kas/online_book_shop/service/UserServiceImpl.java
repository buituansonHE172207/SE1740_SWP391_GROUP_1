package com.kas.online_book_shop.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.kas.online_book_shop.enums.AccountState;
import com.kas.online_book_shop.enums.Role;
import com.kas.online_book_shop.exception.ResourceNotFoundException;
import com.kas.online_book_shop.model.User;
import com.kas.online_book_shop.repository.UserRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Transactional
@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User getUserById(Long id) {

        return userRepository.findById(id).orElse(null);
    }

    @Override
    public List<User> getUserByRole(Role role) {
        return userRepository.findByRole(role);
    }

    @Override
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy tai khoan."));
    }

    @Override
    public User updateUser(User user) {
        var existingUser = userRepository.findById(user.getId())
            .orElseThrow(() -> new ResourceNotFoundException("Khong tim thay user tuong ung"));
        user.setRole(existingUser.getRole());
        user.setEmail(existingUser.getEmail());
        return userRepository.save(user);
    }

    @Override
    public void setAccountState(Long userId, String state) {
        var existingUser = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy tai khoan."));
        existingUser.setState(AccountState.valueOf(state));
    }

    @Override
    public void setRole(Long userId, String role) {
        var existingUser = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy tai khoan."));
        existingUser.setRole(Role.valueOf(role));
    }

    
}
