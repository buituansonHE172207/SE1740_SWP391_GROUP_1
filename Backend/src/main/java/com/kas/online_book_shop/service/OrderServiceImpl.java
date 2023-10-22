package com.kas.online_book_shop.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import com.kas.online_book_shop.enums.BookState;
import com.kas.online_book_shop.enums.OrderState;
import com.kas.online_book_shop.exception.ResourceNotFoundException;
import com.kas.online_book_shop.model.Order;
import com.kas.online_book_shop.model.OrderDetail;
import com.kas.online_book_shop.repository.BookRepository;
import com.kas.online_book_shop.repository.OrderRepository;
import com.kas.online_book_shop.repository.UserRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Transactional
@RequiredArgsConstructor
@Service
public class OrderServiceImpl implements OrderService {
    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final BookRepository bookRepository;

    @Override
    public Page<Order> getOrderByUser(Long userID, Pageable pageable) {
        var existingUser = userRepository.findById(userID)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return orderRepository.findByUserAndStateNot(existingUser, OrderState.CART, pageable);
    }

    @Override
    @Async
    public void processOrder(Order order) {
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
    }

    @Override
    public void changeOrderState(Long OrderId, OrderState orderState) {
        var existingOrder = orderRepository.findById(OrderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order_not_found"));
        if  (existingOrder.getState() != orderState)
        {
            existingOrder.setState(orderState);
        }
    }
}
