package com.kas.online_book_shop.model;

import java.time.LocalDateTime;

import com.kas.online_book_shop.enums.PostState;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "post")
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "The title of the post is required")
    private String title;
    
    @ManyToOne
    @JoinColumn(name = "category_id")
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private PostCategory category;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private User user;
    
    @NotBlank(message = "The thumbnail of the post is required")
    private String thumbnail;
    
    @Lob
    @NotBlank(message = "The content of the post is required")
    private String content;
    
    @Lob
    @NotBlank(message = "The brief of the post is required")
    private String brief;

    private LocalDateTime createdAt;

    @Enumerated(EnumType.STRING)
    private PostState state;
}
