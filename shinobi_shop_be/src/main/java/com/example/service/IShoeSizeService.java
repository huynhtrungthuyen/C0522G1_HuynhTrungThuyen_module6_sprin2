package com.example.service;

import com.example.dto.IShoeSizeDto;

import java.util.List;

public interface IShoeSizeService {
    List<IShoeSizeDto> findAllSizeByShoe(Integer id);
}
