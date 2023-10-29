package com.kas.online_book_shop.repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.kas.online_book_shop.enums.OrderState;
import com.kas.online_book_shop.enums.PaymentState;
import com.kas.online_book_shop.enums.ShippingState;
import com.kas.online_book_shop.model.Order;
import com.kas.online_book_shop.model.User;

public interface OrderRepository extends JpaRepository<Order, Long> {

        List<Order> findByUserAndStateNot(User user, OrderState state);

        Optional<Order> findByUserAndState(User user, OrderState state);

        @Query("SELECT o FROM Order o " +
                        "WHERE (:state IS NULL OR o.state = :state AND o.state <> 'CART') " +
                        "AND (:shippingState IS NULL OR o.shippingState = :shippingState) " +
                        "AND (:paymentState IS NULL OR o.paymentState = :paymentState) " +
                        "AND ((:from IS NULL AND :to IS NULL) OR " +
                        "(:from IS NOT NULL AND :to IS NULL AND o.created >= :from) OR " +
                        "(:from IS NULL AND :to IS NOT NULL AND o.created <= :to) OR " +
                        "(:from IS NOT NULL AND :to IS NOT NULL AND o.created BETWEEN :from AND :to))")
        Page<Order> findByStateAndPaymentStateAndShippingStateAndCreatedBetween(
                        @Param("state") OrderState state,
                        @Param("shippingState") ShippingState shippingState,
                        @Param("paymentState") PaymentState paymentState,
                        @Param("from") LocalDateTime from,
                        @Param("to") LocalDateTime to,
                        Pageable pageable);

        List<Order> findByStateNot(OrderState state);
}
