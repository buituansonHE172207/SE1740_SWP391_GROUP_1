package com.kas.online_book_shop.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.kas.online_book_shop.model.Role;
import com.kas.online_book_shop.repository.RoleRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Transactional
@RequiredArgsConstructor
@Service
public class RoleServiceImpl implements RoleService{
    private final RoleRepository roleRepository;

    @Override
    public List<Role> getAllRoles() {
        return roleRepository.findAll();
    }
    
}
