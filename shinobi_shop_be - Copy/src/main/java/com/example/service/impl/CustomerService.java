package com.example.service.impl;

import com.example.model.Customer;
import com.example.repository.ICustomerRepository;
import com.example.service.ICustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CustomerService implements ICustomerService {
    @Autowired
    private ICustomerRepository iCustomerRepository;

    @Override
    public Optional<Customer> findCustomerByUsername(String username) {
        return iCustomerRepository.findCustomerByUsername(username);
    }
}
