package com.kas.online_book_shop.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kas.online_book_shop.model.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {
    
}
