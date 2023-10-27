package com.kas.online_book_shop.service;

import java.time.LocalDateTime;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.kas.online_book_shop.enums.OrderState;
import com.kas.online_book_shop.enums.PaymentState;
import com.kas.online_book_shop.enums.ShippingState;
import com.kas.online_book_shop.model.Order;

public interface OrderService {
    Page<Order> getOrderByUser(Long userID, Pageable pageable);

    void processOrder(Order order);

    void changeOrderState(Long OrderId, OrderState orderState);

    Page<Order> queryOrder(OrderState state, PaymentState paymentState, ShippingState shippingState, LocalDateTime from, LocalDateTime to, Pageable pageable);

    void changeOrderPaymentState(Long OrderId, PaymentState paymentState);

    void changeOrderShippingState(Long OrderId, ShippingState shippingState);
}
