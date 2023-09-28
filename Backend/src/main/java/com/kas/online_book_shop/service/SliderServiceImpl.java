
package com.kas.online_book_shop.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.kas.online_book_shop.exception.ResourceNotFoundException;
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
    public List<Slider> getAllSliders() {
        return sliderRepository.findAll();
    }

    @Override
    public Slider getSliderById(Long id) {
        return sliderRepository.findById(id).orElse(null);
    }

    @Override
    public void deleteSlider(Long id) {
        sliderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy slider để xóa."));
        sliderRepository.deleteById(id);
    }

    @Override
    public Slider saveSlider(Slider slider) {
        return sliderRepository.save(slider);
    }

    @Override
    public Slider updateSlider(Slider slider) {
        sliderRepository.findById(slider.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy slider để cập nhật"));
        return sliderRepository.save(slider);
    }

}