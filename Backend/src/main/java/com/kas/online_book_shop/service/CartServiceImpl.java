package com.kas.online_book_shop.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.kas.online_book_shop.dto.OrderDetailDTO;
import com.kas.online_book_shop.enums.OrderDetailState;
import com.kas.online_book_shop.enums.OrderState;
import com.kas.online_book_shop.enums.PaymentState;
import com.kas.online_book_shop.enums.ShippingState;
import com.kas.online_book_shop.exception.InsufficientStockException;
import com.kas.online_book_shop.exception.ResourceNotFoundException;
import com.kas.online_book_shop.model.Book;
import com.kas.online_book_shop.model.Order;
import com.kas.online_book_shop.model.OrderDetail;
import com.kas.online_book_shop.model.User;
import com.kas.online_book_shop.repository.BookRepository;
import com.kas.online_book_shop.repository.OrderDetailRepository;
import com.kas.online_book_shop.repository.OrderRepository;
import com.kas.online_book_shop.repository.UserRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Transactional
@RequiredArgsConstructor
@Service
public class CartServiceImpl implements CartService {
    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final BookRepository bookRepository;
    private final OrderDetailRepository orderDetailRepository;

    private User getExistingUser(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy user tuơng ứng"));
    }

    private Book getExistingBook(Long bookId) {
        return bookRepository.findById(bookId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy sách tương ứng"));
    }

    @Override
    public void addToCart(OrderDetailDTO orderDetailDTO) {
        var existingCart = getCartByUser(orderDetailDTO.userId());
        var existingBook = getExistingBook(orderDetailDTO.bookId());
        var bookInCart = orderDetailRepository.findByOrderAndBook(existingCart, existingBook).orElse(null);
        if (bookInCart == null) {
            new OrderDetail();
            bookInCart = orderDetailRepository.save(
                    OrderDetail.builder()
                            .amount(orderDetailDTO.amount())
                            .book(existingBook)
                            .order(existingCart)
                            .originalPrice(existingBook.getPrice())
                            .salePrice(existingBook.getSalePrice())
                            .build());
        } else {
            bookInCart.setAmount(bookInCart.getAmount() + orderDetailDTO.amount());
        }
        if (bookInCart.getAmount() > existingBook.getStock()) {
            bookInCart.setAmount(existingBook.getStock());
            throw new InsufficientStockException("Số lượng của sản phẩm trong giỏ hàng vượt quá mức cho phép");
        } 

    }

    @Override
    public List<Order> getAllCart() {
        return orderRepository.findAll();
    }

    @Override
    public Order getCartByUser(Long userId) {
        var existingUser = getExistingUser(userId);
        var existingCart = orderRepository.findByUserAndState(existingUser, OrderState.CART).orElse(null);
        if (existingCart == null) {
            existingCart = orderRepository.save(Order.builder()
                    .user(existingUser)
                    .fullName(existingUser.getFullName())
                    .address(existingUser.getAddress())
                    .province(existingUser.getProvince())
                    .district(existingUser.getDistrict())
                    .ward(existingUser.getWard())
                    .email(existingUser.getEmail())
                    .phone(existingUser.getPhone())
                    .shippingPrice(30000L)
                    .shippingState(ShippingState.NOTSHIPPING)
                    .state(OrderState.CART)
                    .paymentState(PaymentState.PENDING)
                    .orderDetails(new ArrayList<OrderDetail>())
                    .build());
        }
        return existingCart;
    }

    @Override
    public void updateCart(Order order) {
        order.getOrderDetails().forEach(orderDetail -> {
            if (orderDetail.getOrderDetailState().equals(OrderDetailState.NOT_AVAILABLE))
                throw new InsufficientStockException("Một số sản phẩm hiện không khả dụng do vượt quá số lượng mua");
        });
        orderRepository.findById(order.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Đã có lỗi xảy ra vui lòng tải lại trang"));
        orderRepository.save(order);
    }

}
