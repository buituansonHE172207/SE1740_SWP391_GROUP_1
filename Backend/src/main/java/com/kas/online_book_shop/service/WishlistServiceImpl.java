package com.kas.online_book_shop.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.kas.online_book_shop.exception.ResourceNotFoundException;
import com.kas.online_book_shop.model.Book;
import com.kas.online_book_shop.model.User;
import com.kas.online_book_shop.model.Wishlist;
import com.kas.online_book_shop.repository.BookRepository;
import com.kas.online_book_shop.repository.UserRepository;
import com.kas.online_book_shop.repository.WishListRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Transactional
@RequiredArgsConstructor
@Service
public class WishlistServiceImpl implements WishlistService {
    private final WishListRepository wishListRepository;
    private final UserRepository userRepository;
    private final BookRepository bookRepository;

    @Override
    public Wishlist addToWishlist(Long userId, Long bookId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy người dùng để thêm vào wishlist"));

        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy sách để thêm vào wishlist"));

        var existingWishList = wishListRepository.findByUserAndBook(user, book);

        if (existingWishList != null) {
            return existingWishList;
        }

        new Wishlist();
        Wishlist wishlist = Wishlist.builder().book(book).user(user).build();
        return wishListRepository.save(wishlist);
    }

    @Override
    public void deleteFromWishlist(Long userId, Long bookId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy người dùng để xóa wishlist"));

        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy sách để xóa khỏi wishlist"));

        var existingWishlist = wishListRepository.findByUserAndBook(user, book);

        if (existingWishlist != null) 
            wishListRepository.delete(existingWishlist);        
        
    }

    @Override
    public List<Wishlist> getAllWishlist() {
        return wishListRepository.findAll();
    }

    @Override
    public List<Wishlist> getWishlistByUser(Long userId) {
        User user = userRepository.findById(userId).orElse(null);
        if (user == null) {
            throw new ResourceNotFoundException("Không tìm thấy người dùng ");
        }
        return user.getWishlists();
    }

}
