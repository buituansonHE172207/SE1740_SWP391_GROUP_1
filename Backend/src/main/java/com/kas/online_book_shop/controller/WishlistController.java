package com.kas.online_book_shop.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.kas.online_book_shop.model.Wishlist;
import com.kas.online_book_shop.service.WishlistService;

import lombok.RequiredArgsConstructor;

@RestController
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001", "http://localhost"})
@RequiredArgsConstructor
@RequestMapping("/api/v1/wishlist")
public class WishlistController {
    private final WishlistService wishlistService;

    @GetMapping()
    public ResponseEntity<List<Wishlist>> getWishlist() {
        var wishlists = wishlistService.getAllWishlist();
        if (wishlists.isEmpty())
            return ResponseEntity.noContent().build();
        return ResponseEntity.ok(wishlists);
    }

    @GetMapping(value = "/by-user/{id}")
    public ResponseEntity<List<Wishlist>> getWishlistByUser(
            @PathVariable Long id) {
        var wishlists = wishlistService.getWishlistByUser(id);
        if (wishlists.isEmpty())
            return ResponseEntity.noContent().build();
        return ResponseEntity.ok(wishlists);
    }

    @PostMapping()
    public ResponseEntity<Wishlist> addToWishList(
            @RequestParam(name = "user") Long userId,
            @RequestParam(name = "book") Long bookId) {
        return ResponseEntity.ok(wishlistService.addToWishlist(userId, bookId));
    }

    @DeleteMapping("")
    public ResponseEntity<Wishlist> removeFromWishlist(
            @RequestParam(name = "user") Long userId,
            @RequestParam(name = "book") Long bookId) {
        wishlistService.deleteFromWishlist(userId, bookId);
        return ResponseEntity.noContent().build();
    }

}
