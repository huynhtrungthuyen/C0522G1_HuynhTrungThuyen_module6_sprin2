package com.example.service;

import com.example.dto.IShoeCartDto;

import java.util.List;
import java.util.Optional;

public interface IOrderDetailService {
    void addProductCart(Integer quantity, Integer customerId, Integer shoeSizeId);

    List<IShoeCartDto> findCartByUser(Integer id);

    void removeCart(Integer id);

    void ascQuantity(Integer id);

    void descQuantity(Integer id);

    Optional<Integer> sumQuantityCart(Integer id);
}
