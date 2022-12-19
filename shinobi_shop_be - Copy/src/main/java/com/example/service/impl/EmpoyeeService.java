package com.example.service.impl;

import com.example.model.Employee;
import com.example.repository.IEmployeeRepository;
import com.example.service.IEmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class EmpoyeeService implements IEmployeeService {
    @Autowired
    private IEmployeeRepository iEmployeeRepository;

    @Override
    public Optional<Employee> findEmployeeByUsername(String username) {
        return iEmployeeRepository.findEmployeeByUsername(username);
    }
}
