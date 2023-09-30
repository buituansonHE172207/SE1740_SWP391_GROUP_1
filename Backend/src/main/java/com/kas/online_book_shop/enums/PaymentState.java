package com.kas.online_book_shop.enums;

public enum PaymentState {

    PENDING("Payment is pending - Đang chờ thanh toán"),
    PAID("Payment is Done - Thanh toán thành công"),
    FAILED("Payment is Failed - Thanh toán thất bại"),
    REFUNDED("Payment is Refunded - Đã hoàn trả");

    private String displayName;

    PaymentState(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }

}
