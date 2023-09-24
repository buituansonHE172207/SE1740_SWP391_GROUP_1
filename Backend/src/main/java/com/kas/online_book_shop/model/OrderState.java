package com.kas.online_book_shop.model;

public enum OrderState {
    ORDER("Chờ thanh toán"),
    CART("Đã thanh toán");

    private String displayName;

    OrderState(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }

}
