package com.kas.online_book_shop.model;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
@Embeddable
public class BookRatingKey implements Serializable{

    @Column(name = "book_id")
    Long bookId;

    @Column(name = "user_id")
    Long userId;

    @Override
    public boolean equals(Object obj) {
        return super.equals(obj);
    }

    @Override
    public int hashCode() {
        return super.hashCode();
    }
    
}
