package com.kas.online_book_shop.model;

import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.kas.online_book_shop.enums.OrderState;
import com.kas.online_book_shop.enums.PaymentState;
import com.kas.online_book_shop.enums.ShippingState;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "[order]")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne()
    @JoinColumn(name = "user_id")
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private User user;

    @NotBlank(message = "The full name is required")
    private String fullName;

    @NotBlank(message = "The province is required")
    private String province;

    @NotBlank(message = "The district is required")
    private String district;

    @NotBlank(message = "The ward is required")
    private String ward;

    @NotBlank(message = "The address is required")
    private String address;

    private Long shippingPrice;

    @NotBlank(message = "The phone is required")
    @Pattern(regexp = "^0\\d{9}$", message = "The phone is invalid")
    private String phone;

    @Lob
    private String customerNote;

    @Lob
    private String shopNote;

    @Enumerated(EnumType.STRING)
    private OrderState state;

    @Enumerated(EnumType.STRING)
    private PaymentState paymentState;

    @Enumerated(EnumType.STRING)
    private ShippingState shippingState;

    private LocalDateTime created;

    @NotBlank(message = "The email is required")
    private String email;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    @JsonManagedReference
    private List<OrderDetail> orderDetails;

    public Long getTotalPrice() {
        if (orderDetails != null && !orderDetails.isEmpty()) {
            long total = 0;
            for (OrderDetail detail : orderDetails) {
                total += detail.getSalePrice() * detail.getAmount();
            }
            return total + shippingPrice;
        } else {
            return 0L;
        }
    }
}
