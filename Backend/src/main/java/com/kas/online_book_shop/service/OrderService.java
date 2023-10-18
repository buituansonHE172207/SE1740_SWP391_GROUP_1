package com.kas.online_book_shop.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.kas.online_book_shop.model.Order;

public interface OrderService {
    Page<Order> getOrderByUser(Long userID, Pageable pageable);
    void processOrder(Order order);
}
