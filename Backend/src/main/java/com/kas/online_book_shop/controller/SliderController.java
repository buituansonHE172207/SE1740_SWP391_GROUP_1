package com.kas.online_book_shop.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kas.online_book_shop.model.Slider;
import com.kas.online_book_shop.service.SliderService;

import lombok.RequiredArgsConstructor;

@RestController
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001", "http://localhost"})
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

    @GetMapping("/{id}")
    public ResponseEntity<Slider> getSliderById(@PathVariable Long id) {
        var slider = sliderService.getSliderById(id);
        if (slider == null)
            return ResponseEntity.noContent().build();
        return ResponseEntity.ok(slider);
    }

    @PostMapping()
    public ResponseEntity<Slider> saveSlider(@RequestBody Slider slider) {
        return ResponseEntity.status(HttpStatus.CREATED).body(sliderService.saveSlider(slider));
    }
    
    @PutMapping()
    public ResponseEntity<Slider> updateSlider(@RequestBody Slider slider) {
        return ResponseEntity.ok(sliderService.updateSlider(slider));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSlider(@PathVariable Long id) {
        sliderService.deleteSlider(id);
        return ResponseEntity.noContent().build();
    }

}
