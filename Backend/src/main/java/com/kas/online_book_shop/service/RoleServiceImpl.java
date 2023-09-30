package com.kas.online_book_shop.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.kas.online_book_shop.enums.Role;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Transactional
@RequiredArgsConstructor
@Service
public class RoleServiceImpl implements RoleService{
    @Override
    public List<Role> getAllRoles() {
        return List.of(Role.values());
    }
    
}
