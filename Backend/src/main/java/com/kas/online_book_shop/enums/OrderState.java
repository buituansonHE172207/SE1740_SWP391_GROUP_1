package com.kas.online_book_shop.enums;

public enum OrderState {
    ORDER("Chờ thanh toán"),
    CART("Đã thanh toán"),
    CANCEL("Đã hủy đơn");

    private String displayName;

    OrderState(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }

}
