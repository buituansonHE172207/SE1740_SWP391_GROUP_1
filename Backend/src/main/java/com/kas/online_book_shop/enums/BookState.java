package com.kas.online_book_shop.enums;

public enum BookState {
    ACTIVE("Đang bán"),
    HIDDEN("Đã bị ẩn");
    private String displayName;

    BookState(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}
