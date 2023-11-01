package com.kas.online_book_shop.model;

import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.kas.online_book_shop.enums.BookState;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
@Table(name = "book")
@Entity
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "The title of the book is required")
    private String title;

    @ManyToOne()
    @JoinColumn(name = "publisher_id")
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private Publisher publisher;

    @ManyToMany()
    @JoinTable(name = "author_book", joinColumns = @JoinColumn(name = "book_id"), inverseJoinColumns = @JoinColumn(name = "author_id"))
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private List<Author> authors;

    @ManyToMany()
    @JoinTable(name = "book_collection", joinColumns = @JoinColumn(name = "book_id"), inverseJoinColumns = @JoinColumn(name = "collection_id"))
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private List<BookCollection> collections;

    @Lob
    private String description;

    @Min(value = 0, message = "stock must be at least 0")
    private Integer stock;

    @Min(value = 0, message = "Sold must be at least 0")
    private Integer sold;

    private LocalDate publicationDate;
    
    private String size;

    @Min(value = 1, message = "The weight must be at least 1")
    private Integer weight;

    @Min(value = 1, message = "The price must be at least 1")
    private Long price;

    @ManyToOne
    @JoinColumn(name = "language_id")
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private Language language;

    @Min(value = 1, message = "The page must be at least 1")
    private Integer page;

    private String cover;

    @Column(unique = true)
    @NotBlank(message = "The ISBN is required")
    private String ISBN;

    @Min(value = 0, message = "The discount must be at least 0")
    @Max(value = 1, message = "The discount must be equal and less than 1")
    private Float discount;

    @Enumerated(EnumType.STRING)
    private BookState state;

    @ManyToOne
    @JoinColumn(name = "category_id")
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private BookCategory category;

    @OneToMany(mappedBy = "book", cascade = CascadeType.ALL)
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    @JsonIgnore
    private List<Feedback> feedbacks; // Cascade: Remove (Deleting a Book deletes associated Feedbacks)

    @OneToMany(mappedBy = "book", cascade = CascadeType.ALL)
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    @JsonIgnore
    private List<OrderDetail> orderDetails;

    @OneToMany(mappedBy = "book", cascade = CascadeType.ALL)
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    @JsonIgnore
    private List<Wishlist> wishlists; 

    @OneToMany(mappedBy = "book", cascade = CascadeType.ALL)
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    @JsonIgnore
    private List<Rating> ratings; 

    @OneToMany(mappedBy = "book", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<Image> images;

    public Long getSalePrice() {
        if (price != null && discount != null) {
            return (long) (price - (price * discount));
        }
        return null;
    }

    public Double getRating() {
        if (ratings == null)
            return null;
        return ratings.stream()
                .mapToDouble(Rating::getValue)
                .average().orElse(0);
    }
}
