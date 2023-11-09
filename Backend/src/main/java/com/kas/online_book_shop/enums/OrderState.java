package com.kas.online_book_shop.enums;

public enum OrderState {
    ORDER("Đặt hàng"),
    CART("Giỏ hàng"),
    PROCESSING("Đang xử lý"),
    CONFIRMED("Đã xác nhận"),
    SHIPPING("Đang giao hàng"),
    CANCELED("Đã hủy"),
    RETURNED("Đã trả lại"),
    COMPLETED("Đã hoàn thành");

    private String vietnameseName;

    OrderState(String vietnameseName) {
        this.vietnameseName = vietnameseName;
    }

    public String getVietnameseName() {
        return vietnameseName;
    }
}
