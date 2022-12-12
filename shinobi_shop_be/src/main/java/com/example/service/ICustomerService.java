package com.example.service;

import com.example.model.Customer;

public interface ICustomerService {
    Customer findCustomerByUsername(String username);
}
