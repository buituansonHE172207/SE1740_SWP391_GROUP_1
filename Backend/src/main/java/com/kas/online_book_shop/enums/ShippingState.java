package com.kas.online_book_shop.enums;

public enum ShippingState {
    NOT_SHIPPED("Chưa vận chuyển"),
    SHIPPED("Đã vận chuyển"),
    DELIVERED("Đã giao hàng"),
    RETURNED("Đã trả lại");

    private String displayName;

    ShippingState(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }

}
