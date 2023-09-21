package com.kas.online_book_shop.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.kas.online_book_shop.model.Slider;
import com.kas.online_book_shop.repository.SliderRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class SliderServiceImpl implements SliderService {
    private final SliderRepository sliderRepository;

    @Override
    public List<Slider> findAllSliders() {
        return sliderRepository.findAll();
    }

    @Override
    public Slider findSliderById(Long id) {
        return sliderRepository.findById(id).orElse(null);
    }

    
}
