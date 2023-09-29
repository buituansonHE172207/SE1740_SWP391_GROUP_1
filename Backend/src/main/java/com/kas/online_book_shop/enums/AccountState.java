package com.kas.online_book_shop.enums;

public enum AccountState {
    ACTIVE("Hoạt động"),
    INACTIVE("Không hoạt động"),
    SUSPENDED("Tạm ngưng"),
    CLOSED("Đóng");

    private String displayName;

    AccountState(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }


}
