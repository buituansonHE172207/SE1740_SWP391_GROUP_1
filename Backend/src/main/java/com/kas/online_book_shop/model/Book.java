package com.kas.online_book_shop.model;

import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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

    private String title;

    @ManyToOne()
    @JoinColumn(name = "publisher_id")
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private Publisher publisher;

    @ManyToMany()
    @JoinTable(name = "author_book", joinColumns = @JoinColumn(name = "book_id"), inverseJoinColumns = @JoinColumn(name = "author_id", nullable = true))
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

    private Integer stock;

    private Integer sold;

    private LocalDate publicationDate;

    private String size;

    private Integer weight;

    private Long price;

    @ManyToOne
    @JoinColumn(name = "language_id")
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private Language language;

    private Integer page;

    private String cover;

    @Column(unique = true)
    private String ISBN;

    private Float discount;

    @ManyToOne
    @JoinColumn(name = "category_id")
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private BookCategory category;

    @OneToMany(mappedBy = "book", cascade = CascadeType.REMOVE)
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    @JsonIgnore
    private List<Feedback> feedbacks; // Cascade: Remove (Deleting a Book deletes associated Feedbacks)

    @OneToMany(mappedBy = "book")
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    @JsonIgnore
    private List<OrderDetail> orderDetails;

    @OneToMany(mappedBy = "book", cascade = CascadeType.REMOVE)
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    @JsonIgnore
    private List<Wishlist> wishlistDetails; // Cascade: Remove (Deleting a Book deletes associated WishlistDetails)

    @OneToMany(mappedBy = "book", cascade = CascadeType.REMOVE)
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    @JsonIgnore
    private List<Rating> ratings; // Cascade: Remove (Deleting a Book deletes associated Ratings)

    @OneToMany(mappedBy = "book", cascade = CascadeType.REMOVE)
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private List<Image> images;

    public long getSalePrice() {
        if (price != null && discount != null) {
            return (long) (price - (price * discount));
        }
        return 0;
    }

    public double getRating() {
        return ratings.stream()
                .mapToDouble(Rating::getRating)
                .average().orElse(0.0);
    }
}
