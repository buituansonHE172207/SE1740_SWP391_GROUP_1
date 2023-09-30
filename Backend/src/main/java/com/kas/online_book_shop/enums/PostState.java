package com.kas.online_book_shop.enums;

public enum PostState {
    DRAFT("Nháp"),
    PUBLISHED("Đã xuất bản"),
    HIDDEN("Đã ẩn");

    private String displayName;

    PostState(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}
