package com.kas.online_book_shop.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.kas.online_book_shop.service.BookService;
import com.kas.online_book_shop.service.SliderService;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class WebController {
    private final SliderService sliderService;
    private final BookService bookService;

    @GetMapping(value = "")
    public String getHome(Model model) {
        model.addAttribute("sliders", sliderService.findAllSliders());
        model.addAttribute("bestSellers", bookService.findEightBestSellingBooks());
        model.addAttribute("latestBooks", bookService.findEightNewestBooks());
        return "public/home";
    }
}
