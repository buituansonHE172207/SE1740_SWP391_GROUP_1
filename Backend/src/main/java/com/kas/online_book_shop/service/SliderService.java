package com.kas.online_book_shop.service;

import java.util.List;

import com.kas.online_book_shop.model.Slider;

public interface SliderService {
    List<Slider> getAllSliders();
    Slider findSliderById(Long id);
    Slider saveSlider(Slider slider);
    Slider updateSlider(Slider slider);
    void deleteSlider(Long id);
}
