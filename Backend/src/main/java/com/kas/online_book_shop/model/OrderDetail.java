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
import jakarta.validation.constraints.Min;
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

    @Min(value = 1, message = "The number of units must be greater than 0")
    private Integer amount;

    @Min(value = 0, message = "The original price must be greater than 0")
    private Long originalPrice;

    @Min(value = 0, message = "The sale price must be greater than 0")
    private Long salePrice;

    public OrderDetailState getOrderDetailState() {
        if (amount > book.getStock())
            return OrderDetailState.NOT_AVAILABLE;
        return OrderDetailState.AVAILABLE;
    }
}

