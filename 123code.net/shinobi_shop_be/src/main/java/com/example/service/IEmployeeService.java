package com.example.service;

import com.example.model.Employee;

public interface IEmployeeService {
    Employee findEmployeeByUsername(String username);
}
