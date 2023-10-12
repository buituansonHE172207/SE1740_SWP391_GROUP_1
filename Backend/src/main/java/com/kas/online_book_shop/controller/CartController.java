package com.kas.online_book_shop.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kas.online_book_shop.dto.OrderDetailDTO;
import com.kas.online_book_shop.model.Order;
import com.kas.online_book_shop.service.CartService;

import lombok.RequiredArgsConstructor;

@RestController
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001", "http://localhost"})
@RequiredArgsConstructor
@RequestMapping("/api/v1/cart")
public class CartController {
    private final CartService cartService;

    @GetMapping("")
    public ResponseEntity<List<Order>> getAllCart() {
        return ResponseEntity.ok(cartService.getAllCart());
    }

    @GetMapping("/by-user/{id}")
    public ResponseEntity<Order> getCartByUser(@PathVariable(name = "id") Long userId) {
        return ResponseEntity.ok(cartService.getCartByUser(userId));
    }

    @PutMapping("")
    public ResponseEntity<Void> updateUserCart(@RequestBody Order order) {
        cartService.updateCart(order);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/add")
    public ResponseEntity<Void> addCart(
            @RequestBody OrderDetailDTO orderDetailDTO) {
        cartService.addToCart(orderDetailDTO);
        return ResponseEntity.noContent().build();
    }
}
