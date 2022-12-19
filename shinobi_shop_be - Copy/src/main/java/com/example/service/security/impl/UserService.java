package com.example.service.security.impl;


import com.example.model.User;
import com.example.repository.IUserRepository;
import com.example.service.security.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class UserService implements IUserService {

    @Autowired
    private IUserRepository userRepository;

    @Override
    public String existsByUserName(String username) {
        return userRepository.existsByUserName(username);
    }

    @Override
    public List<User> findAll() {
        return userRepository.findAll();
    }

    @Override
    public User findByUsername(String name) {
        return userRepository.findByUsername(name);
    }

    @Override
    public void saveCreateGmail(User user) {
        userRepository.save(user);
    }

    @Override
    public Optional<User> showUsername(String username) {
        return userRepository.showUsername(username);
    }

    @Override
    public Optional<User> findUserByUsername(String username) {
        return userRepository.findUserByUsername(username);
    }
}