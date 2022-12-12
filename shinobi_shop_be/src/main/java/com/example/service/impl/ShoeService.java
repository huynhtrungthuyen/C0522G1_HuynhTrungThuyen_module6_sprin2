package com.example.service.impl;

import com.example.dto.IShoeDto;
import com.example.repository.IShoeRepository;
import com.example.service.IShoeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ShoeService implements IShoeService {
    @Autowired
    private IShoeRepository iShoeRepository;

    @Override
    public Page<IShoeDto> showListShoe(String nameS, String manufacturerS, String typeS, Integer priceStart,
                                       Integer priceEnd, Pageable pageable) {
        return iShoeRepository.showListShoe(nameS, manufacturerS, typeS, priceStart, priceEnd, pageable);
    }

    @Override
    public List<String> findAllManufacturer() {
        return iShoeRepository.findAllManufacturer();
    }

    @Override
    public IShoeDto findById(Integer id) {
        return iShoeRepository.findShoeById(id);
    }

    @Override
    public Optional<Integer> getQuantitySellById(Integer id) {
        return iShoeRepository.getQuantitySellById(id);
    }
}
