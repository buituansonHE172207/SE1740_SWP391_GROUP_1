package com.kas.online_book_shop.model;

public enum PaymentStatus {

    PENDING("Payment is pending - Đang chờ thanh toán"),
    PAID("Payment is Done - Thanh toán thành công"),
    FAILED("Payment is Failed - Thanh toán thất bại"),
    REFUNDED("Payment is Refunded - Đã hoàn trả"),;

    private String displayName;

    PaymentStatus(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }

}
