package com.kas.online_book_shop.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.kas.online_book_shop.enums.OrderDetailState;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
@Table(name = "order_detail", uniqueConstraints = @UniqueConstraint(columnNames = { "book_id", "order_id" }))
@Entity
public class OrderDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    
    @ManyToOne
    @JoinColumn(name = "order_id")
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    @JsonBackReference
    private Order order;

    @ManyToOne
    @JoinColumn(name = "book_id")
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private Book book;

    private int amount;

    private Long originalPrice;

    private Long salePrice;

    public OrderDetailState getOrderDetailState() {
        if (amount > book.getStock())
            return OrderDetailState.NOT_AVAILABLE;
        return OrderDetailState.AVAILABLE;
    }
}

