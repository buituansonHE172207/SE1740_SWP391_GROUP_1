package com.kas.online_book_shop.controller;


import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kas.online_book_shop.model.Slider;
import com.kas.online_book_shop.service.SliderService;

import lombok.RequiredArgsConstructor;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
@RequestMapping("/api/v1/slider")
public class SliderController {
    private final SliderService sliderService;

    @GetMapping("")
    public ResponseEntity<List<Slider>> getSliders() {
        var sliders = sliderService.getAllSliders();
        if (sliders.isEmpty())
            return ResponseEntity.noContent().build();
        return ResponseEntity.ok(sliders);
    }

}
