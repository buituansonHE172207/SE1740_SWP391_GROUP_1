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
}
