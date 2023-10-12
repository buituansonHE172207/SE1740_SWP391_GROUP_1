package com.kas.online_book_shop.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.kas.online_book_shop.enums.OrderState;
import com.kas.online_book_shop.enums.PaymentState;
import com.kas.online_book_shop.model.Order;
import com.kas.online_book_shop.model.User;

public interface OrderRepository extends JpaRepository<Order, Long> {
    Page<Order> findByState(OrderState state, Pageable pageable);
    Page<Order> findByStateAndPaymentState(OrderState orderState, PaymentState paymentState, Pageable pageable);
    Page<Order> findByUserAndStateIn(User user, List<OrderState> state, Pageable pageable);
    Optional<Order> findByUserAndState(User user, OrderState state);
}
