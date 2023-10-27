package com.kas.online_book_shop.controller;

import java.time.LocalDate;
import java.time.LocalDateTime;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.kas.online_book_shop.enums.OrderState;
import com.kas.online_book_shop.enums.PaymentState;
import com.kas.online_book_shop.enums.ShippingState;
import com.kas.online_book_shop.model.Order;
import com.kas.online_book_shop.service.OrderService;

import lombok.RequiredArgsConstructor;

@RestController
@CrossOrigin(origins = { "http://localhost:3000", "http://localhost:3001" })
@RequiredArgsConstructor
@RequestMapping("/api/v1/order")
public class OrderController {
    private final OrderService orderService;
    private final Object lock = new Object();

    @GetMapping("/user/{id}")
    public ResponseEntity<Page<Order>> getOrderByUser(
            @PathVariable(name = "id") Long userID,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(defaultValue = "asc") String sortOrder) {
        Sort.Direction direction = (sortOrder.equalsIgnoreCase("asc")) ? Direction.ASC : Direction.DESC;
        Pageable pageable = PageRequest.of(page, size, direction, sortBy);
        return ResponseEntity.ok(orderService.getOrderByUser(userID, pageable));
    }

    @PostMapping("/process")
    public ResponseEntity<Void> processOrder(@RequestBody Order order) {
        orderService.changeOrderState(order.getId(), OrderState.PROCESSING);
        synchronized (lock) {
            orderService.processOrder(order);
        }
        return ResponseEntity.noContent().build();
    }

    @GetMapping("")
    public ResponseEntity<Page<Order>> queryOrder(
            @PathVariable(name = "state", required = false) OrderState state,
            @PathVariable(name = "shipping", required = false) ShippingState shipping,
            @PathVariable(name = "payment", required = false) PaymentState payment,
            @PathVariable(name = "from", required = false) LocalDate fromDate,
            @PathVariable(name = "to", required = false) LocalDate toDate,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(defaultValue = "asc") String sortOrder) {
        Sort.Direction direction = (sortOrder.equalsIgnoreCase("asc")) ? Direction.ASC : Direction.DESC;
        Pageable pageable = PageRequest.of(page, size, direction, sortBy);
        LocalDateTime from = null;
        LocalDateTime to = null;
        if (fromDate != null) {
            from = fromDate.atTime(0, 0);
        }
        if (toDate != null) {
            to = toDate.atTime(23, 59, 59);
        }
        return ResponseEntity.ok(orderService.queryOrder(state, payment, shipping, from, to, pageable));
    }
}
