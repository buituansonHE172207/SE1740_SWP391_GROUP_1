package com.kas.online_book_shop.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.kas.online_book_shop.enums.OrderState;
import com.kas.online_book_shop.model.Order;

public interface OrderService {
    Page<Order> getOrderByUser(Long userID, Pageable pageable);
    void processOrder(Order order);
    public void changeOrderState(Long OrderId, OrderState orderState);
}
