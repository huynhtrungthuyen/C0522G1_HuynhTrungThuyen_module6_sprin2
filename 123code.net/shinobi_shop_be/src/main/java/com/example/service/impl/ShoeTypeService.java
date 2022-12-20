package com.example.service.impl;

import com.example.model.ShoeType;
import com.example.repository.IShoeTypeRepository;
import com.example.service.IShoeTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ShoeTypeService implements IShoeTypeService {
    @Autowired
    private IShoeTypeRepository iShoeTypeRepository;

    @Override
    public List<ShoeType> findAll() {
        return iShoeTypeRepository.findAll();
    }
}
