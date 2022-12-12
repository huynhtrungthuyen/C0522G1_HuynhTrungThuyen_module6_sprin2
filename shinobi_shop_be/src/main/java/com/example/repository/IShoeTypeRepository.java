package com.example.repository;

import com.example.model.ShoeType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IShoeTypeRepository extends JpaRepository<ShoeType, Integer> {
}
