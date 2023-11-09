package com.kas.online_book_shop.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import com.kas.online_book_shop.enums.BookState;
import com.kas.online_book_shop.enums.OrderState;
import com.kas.online_book_shop.enums.PaymentState;
import com.kas.online_book_shop.enums.ShippingState;
import com.kas.online_book_shop.exception.ResourceNotFoundException;
import com.kas.online_book_shop.model.Order;
import com.kas.online_book_shop.model.OrderDetail;
import com.kas.online_book_shop.repository.BookRepository;
import com.kas.online_book_shop.repository.OrderRepository;
import com.kas.online_book_shop.repository.UserRepository;
import com.kas.online_book_shop.service.email.EmailService;

import jakarta.mail.MessagingException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Transactional
@RequiredArgsConstructor
@Service
public class OrderServiceImpl implements OrderService {
    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final BookRepository bookRepository;
    private final EmailService emailService;

    @Override
    public List<Order> getOrderByUser(Long userID) {
        var existingUser = userRepository.findById(userID)
                .orElseThrow(() -> new ResourceNotFoundException("User_not_found"));
        return orderRepository.findByUserAndStateNot(existingUser, OrderState.CART);
    }

    @Override
    @Async
    public void processOrder(Order order) {
        var existingOrder = orderRepository.findById(order.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Order_not_found"));
        if (existingOrder.getState() != OrderState.PROCESSING)
            return;
        order.setCreated(existingOrder.getCreated());
        var existingUser = userRepository.findById(order.getUser().getId()).orElse(null);
        if (existingUser == null) {
            return;
        }

        for (OrderDetail orderDetail : order.getOrderDetails()) {
            var existingBook = bookRepository.findById(orderDetail.getBook().getId()).orElse(null);
            if (existingBook == null || existingBook.getState() != BookState.ACTIVE
                    || existingBook.getStock() < orderDetail.getAmount()) {
                order.setState(OrderState.CANCELED);
                order.setShopNote("Đơn hàng đã bị hủy do một số sản phẩm hiện không khả dụng");
                orderRepository.save(order);
                return;
            }
        }

        order.setState(OrderState.CONFIRMED);
        if (order.getState() == OrderState.CONFIRMED) {
            for (OrderDetail orderDetail : order.getOrderDetails()) {
                var existingBook = bookRepository.findById(orderDetail.getBook().getId()).orElse(null);
                existingBook.setStock(existingBook.getStock() - orderDetail.getAmount());
            }
        }
        orderRepository.save(order);
        try {
            emailService.sendOrderConfirmationEmail(existingOrder.getEmail(), existingOrder.getFullName());
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void changeOrderState(Long OrderId, OrderState orderState) {
        var existingOrder = orderRepository.findById(OrderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order_not_found"));
        if (existingOrder.getState() != orderState) {
            if (orderState == OrderState.PROCESSING)
                existingOrder.setCreated(LocalDateTime.now());
            existingOrder.setState(orderState);
            try {
                emailService.sendOrderStateEmail(existingOrder.getEmail(), existingOrder.getFullName(), orderState.getVietnameseName(),
                        null);
            } catch (MessagingException e) {
                e.printStackTrace();
            }
        }
    }

    @Override
    public Page<Order> queryOrder(OrderState state, PaymentState paymentState, ShippingState shippingState,
            LocalDateTime from, LocalDateTime to, Pageable pageable) {
        return orderRepository.findByStateAndPaymentStateAndShippingStateAndCreatedBetween(state, shippingState,
                paymentState, from, to, pageable);
    }

    @Override
    public void changeOrderPaymentState(Long OrderId, PaymentState paymentState) {
        var existingOrder = getOrderById(OrderId);
        existingOrder.setPaymentState(paymentState);
    }

    @Override
    public void changeOrderShippingState(Long OrderId, ShippingState shippingState) {
        var existingOrder = getOrderById(OrderId);
        existingOrder.setShippingState(shippingState);
    }

    @Override
    public List<Order> getAll() {
        return orderRepository.findByStateNot(OrderState.CART);
    }

    @Override
    public Order getOrderById(Long Id) {
        return orderRepository.findById(Id)
                .orElseThrow(() -> new ResourceNotFoundException("Order_not_Found"));
    }

    @Override
    public void cancel(Long OrderId) {
        var existingOrder = getOrderById(OrderId);
        existingOrder.setState(OrderState.CANCELED);
        if (existingOrder.getState() != OrderState.CANCELED) {
            for (OrderDetail orderDetail : existingOrder.getOrderDetails()) {
                var existingBook = orderDetail.getBook();
                existingBook.setStock(existingBook.getStock() + orderDetail.getAmount());
            }
            try {
                emailService.sendOrderStateEmail(existingOrder.getEmail(), existingOrder.getFullName(), OrderState.CANCELED.getVietnameseName(),
                        null);
            } catch (MessagingException e) {
                e.printStackTrace();
            }
        }
    }

}
