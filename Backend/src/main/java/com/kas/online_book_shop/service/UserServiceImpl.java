package com.kas.online_book_shop.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.kas.online_book_shop.dto.RegisterRequest;
import com.kas.online_book_shop.enums.AccountState;
import com.kas.online_book_shop.enums.Role;
import com.kas.online_book_shop.exception.ResourceNotFoundException;
import com.kas.online_book_shop.exception.UserAlreadyExistsException;
import com.kas.online_book_shop.model.User;
import com.kas.online_book_shop.repository.UserRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Transactional
@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService {
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;

    @Override
    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Người dùng tương ứng không tồn tại"));
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
        existingUser.setAddress(user.getAddress());
        existingUser.setFullName(user.getFullName());
        existingUser.setProvince(user.getProvince());
        existingUser.setDistrict(user.getDistrict());
        existingUser.setWard(user.getWard());
        existingUser.setPhone(user.getPhone());
        existingUser.setAddress(user.getAddress());
        return existingUser;
    }

    @Override
    public User registerStaff(RegisterRequest request) {
        userRepository.findByEmail(request.email())
                .ifPresent(existingUser -> {
                    throw new UserAlreadyExistsException("Người dùng đã tồn tại.");
                });
        var user = User.builder()
                .fullName(request.fullName())
                .email(request.email())
                .password(passwordEncoder.encode(request.password()))
                .role(request.role())
                .state(AccountState.ACTIVE)
                .province(request.province())
                .district(request.district())
                .ward(request.ward())
                .phone(request.phone())
                .address(request.address())
                .build();
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

    @Override
    public Page<User> getCustomerByFullNameContainingAndState(
            String fullName,
            AccountState state,
            Pageable pageable) {
        return userRepository.findByFullNameContainingAndRoleAndState(fullName, Role.USER, state, pageable);
    }

    @Override
    public Page<User> getStaffByFullNameContainingAndRoleAndState(
            String fullName,
            Role role,
            AccountState state,
            Pageable page) {
        if (role == null)
            return userRepository.findByFullNameContainingAndRoleNotAndState(fullName, Role.USER, state, page);
        return userRepository.findByFullNameContainingAndRoleAndState(fullName, role, state, page);
    }

    @Override
    public List<User> getAll() {
        return userRepository.findAll();
    }
}
