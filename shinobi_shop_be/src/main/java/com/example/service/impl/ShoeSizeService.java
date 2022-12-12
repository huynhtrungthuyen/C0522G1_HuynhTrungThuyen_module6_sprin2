package com.example.service.impl;

import com.example.dto.IShoeSizeDto;
import com.example.repository.IShoeSizeRepository;
import com.example.service.IShoeSizeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ShoeSizeService implements IShoeSizeService {
    @Autowired
    private IShoeSizeRepository iShoeSizeRepository;


    @Override
    public List<IShoeSizeDto> findAllSizeByShoe(Integer id) {
        return iShoeSizeRepository.findAllSizeByShoe(id);
    }
}
