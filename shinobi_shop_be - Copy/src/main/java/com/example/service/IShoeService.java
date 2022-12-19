package com.example.service;

import com.example.dto.IShoeDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface IShoeService {
    Page<IShoeDto> showListShoe(String nameS, String manufacturerS, String typeS, Integer priceStart, Integer priceEnd,
                                Pageable pageable);

    List<String> findAllManufacturer();

    IShoeDto findById(Integer id);

    Optional<Integer> getQuantitySellById(Integer id);
}
