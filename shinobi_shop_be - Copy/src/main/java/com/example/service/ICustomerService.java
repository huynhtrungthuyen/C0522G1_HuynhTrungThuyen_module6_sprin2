package com.example.service;

import com.example.model.Customer;

import java.util.Optional;

public interface ICustomerService {
    Optional<Customer> findCustomerByUsername(String username);
}
