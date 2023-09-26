package com.kas.online_book_shop.service;

import java.util.List;

import com.kas.online_book_shop.model.Wishlist;

public interface WishlistService {
    List<Wishlist> getWishlistByUser(Long userId);

    Wishlist addToWishlist(Long userId, Long bookId);

    void deleteFromWishlist(Long wishListId);

    List<Wishlist> getAllWishlist();

}
