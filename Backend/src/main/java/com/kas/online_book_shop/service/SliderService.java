package com.kas.online_book_shop.service;

import java.util.List;

import com.kas.online_book_shop.model.Slider;

public interface SliderService {
    List<Slider> findAllSliders();
    Slider findSliderById(Long id);
}
