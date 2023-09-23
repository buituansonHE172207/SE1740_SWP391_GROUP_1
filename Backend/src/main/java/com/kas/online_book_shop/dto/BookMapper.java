package com.kas.online_book_shop.dto;

import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.kas.online_book_shop.model.Author;
import com.kas.online_book_shop.model.Book;
import com.kas.online_book_shop.model.BookCollection;
import com.kas.online_book_shop.model.Image;

@Component
public class BookMapper {

    public static BookDTO bookToBookDTO(Book book) {
        if (book == null) {
            return null;
        }

        BookDTO bookDTO = new BookDTO();
        bookDTO.setId(book.getId());
        bookDTO.setTitle(book.getTitle());
        bookDTO.setPublisherName(book.getPublisher() != null ? book.getPublisher().getName() : null);
        bookDTO.setAuthorNames(book.getAuthors() != null ? book.getAuthors().stream()
                .map(Author::getName)
                .collect(Collectors.toList()) : null);
        bookDTO.setCollectionNames(book.getCollections() != null ? book.getCollections().stream()
                .map(BookCollection::getName)
                .collect(Collectors.toList()) : null);
        bookDTO.setImagesUrl(book.getCollections() != null ? book.getImages().stream()
                .map(Image::getLink)
                .collect(Collectors.toList()) : null);
        bookDTO.setDescription(book.getDescription());
        bookDTO.setStock(book.getStock());
        bookDTO.setSold(book.getSold());
        bookDTO.setPublicationDate(book.getPublicationDate());
        bookDTO.setSize(book.getSize());
        bookDTO.setWeight(book.getWeight());
        bookDTO.setPrice(book.getPrice());
        bookDTO.setLanguageName(book.getLanguage() != null ? book.getLanguage().getName() : null);
        bookDTO.setPage(book.getPage());
        bookDTO.setCover(book.getCover());
        bookDTO.setISBN(book.getISBN());
        bookDTO.setDiscount(book.getDiscount());
        bookDTO.setCategoryName(book.getCategory() != null ? book.getCategory().getName() : null);

        return bookDTO;
    }

    public static Book bookDTOToBook(BookDTO bookDTO) {
        if (bookDTO == null) {
            return null;
        }

        Book book = new Book();
        book.setId(bookDTO.getId());
        book.setTitle(bookDTO.getTitle());

        // Chuyển đổi các trường khác theo cùng cách

        return book;
    }
}
