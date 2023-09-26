package com.kas.online_book_shop.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import com.kas.online_book_shop.exception.PostNotFoundException;
import com.kas.online_book_shop.model.PostCategory;
import com.kas.online_book_shop.repository.PostCategoryRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Transactional
@RequiredArgsConstructor
@Service
public class PostCategoryServiceImpl implements PostCategoryService {
    private final PostCategoryRepository postCategoryRepository;

    @Override
    public List<PostCategory> getAllPostCategories() {
        return postCategoryRepository.findAll();
    }

    @Override
    public Page<PostCategory> getAllPostCategories(Pageable pageable) {
        return postCategoryRepository.findAll(pageable);
    }

    @Override
    public PostCategory getPostCategoryById(Long id) {
        return postCategoryRepository.findById(id).orElse(null);
    }

    @Override
    public PostCategory savePostCategory(PostCategory postCategory) {
        postCategory.setId(null);
        return postCategoryRepository.save(postCategory);
    }

    @Override
    public PostCategory updatePostCategory(PostCategory postCategory) {
        var currentPostCategory = postCategoryRepository.findById(postCategory.getId()).orElse(null);
        if (currentPostCategory == null) {
            throw new PostNotFoundException("Không tìm thấy thể loại bài viết để cập nhật");
        }
        return postCategoryRepository.save(postCategory);
    }

    @Override
    public void deletePostCategory(Long id) {
        var currentPostCategory = postCategoryRepository.findById(id).orElse(null);
        if (currentPostCategory == null)
            throw new PostNotFoundException("Không tìm thấy thể loại bài viết để xóa");
        postCategoryRepository.deleteById(id);
    }
}