package com.kas.online_book_shop.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.kas.online_book_shop.model.PostCategory;
import com.kas.online_book_shop.repository.PostCategoryRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Transactional
@RequiredArgsConstructor
@Service
public class PostCategoryServiceImpl implements PostCategoryService {
    private final PostCategoryRepository bookPostCategoryRepository;

    @Override
    public List<PostCategory> getAllPostCategories() {
        return bookPostCategoryRepository.findAll();
    }

    
}
