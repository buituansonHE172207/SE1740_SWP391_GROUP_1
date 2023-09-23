package com.kas.online_book_shop.dto;

import java.time.LocalDate;
import java.util.List;

import com.kas.online_book_shop.model.Image;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BookDTO {
    private Long id;
    private String title;
    private String publisherName;
    private List<String> authorNames;
    private List<String> collectionNames;
    private List<String> imagesUrl;
    private String description;
    private Integer stock;
    private Integer sold;
    private LocalDate publicationDate;
    private String size;
    private Integer weight;
    private Long price;
    private String languageName;
    private Integer page;
    private String cover;
    private String ISBN;
    private Float discount;
    private String categoryName;
}
