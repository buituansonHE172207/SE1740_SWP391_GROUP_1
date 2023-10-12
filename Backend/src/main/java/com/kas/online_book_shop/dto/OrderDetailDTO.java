package com.kas.online_book_shop.dto;

public record OrderDetailDTO(
    Long userId,                                                   
    Long bookId,
    int amount      
) {
    
}
