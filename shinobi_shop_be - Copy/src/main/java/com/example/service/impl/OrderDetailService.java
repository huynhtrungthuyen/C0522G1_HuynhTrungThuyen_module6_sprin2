package com.example.service.impl;

import com.example.dto.IShoeCartDto;
import com.example.model.OrderDetail;
import com.example.repository.IOrderDetailRepository;
import com.example.service.IOrderDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderDetailService implements IOrderDetailService {
    @Autowired
    private IOrderDetailRepository iOrderDetailRepository;

    @Override
    public void addProductCart(Integer quantity, Integer customerId, Integer shoeSizeId) {
        Optional<OrderDetail> productCart = iOrderDetailRepository.getOrderDetailCart(customerId, shoeSizeId);

        if (productCart.isPresent()) {
            iOrderDetailRepository.setQuantityOrderDetailCart(productCart.get().getQuantity() + quantity,
                    customerId, shoeSizeId);
        } else {
            iOrderDetailRepository.addOrderDetailCart(quantity, customerId, shoeSizeId);
        }
    }

    @Override
    public List<IShoeCartDto> findCartByUser(Integer id) {
        return iOrderDetailRepository.findCartByUser(id);
    }

    @Override
    public void removeCart(Integer id) {
        iOrderDetailRepository.removeCart(id);
    }

    @Override
    public void ascQuantity(Integer id) {
        iOrderDetailRepository.ascQuantity(id);
    }

    @Override
    public void descQuantity(Integer id) {
        iOrderDetailRepository.descQuantity(id);
    }

    @Override
    public Optional<Integer> sumQuantityCart(Integer id) {
        return iOrderDetailRepository.sumQuantityCart(id);
    }

    @Override
    public void paymentShoe(Integer id) {
        iOrderDetailRepository.paymentShoe(id);
    }
}
