package com.kas.online_book_shop.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kas.online_book_shop.model.Book;
import com.kas.online_book_shop.model.Order;
import com.kas.online_book_shop.model.OrderDetail;


public interface OrderDetailRepository extends JpaRepository<OrderDetail, Long> {
    Optional<OrderDetail> findByOrderAndBook(Order oder, Book book);
}
