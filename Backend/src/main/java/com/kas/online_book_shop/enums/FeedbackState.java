package com.kas.online_book_shop.enums;

public enum FeedbackState {
    ACTIVE("Hiển thị"),
    ANSWERED("Đã trả lời"),
    DELETED("Đã bị ẩn");

    private String displayName;

    FeedbackState(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}