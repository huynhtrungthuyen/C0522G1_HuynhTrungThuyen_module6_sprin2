package com.example.service;

import com.example.model.Employee;

import java.util.Optional;

public interface IEmployeeService {
    Optional<Employee> findEmployeeByUsername(String username);
}
