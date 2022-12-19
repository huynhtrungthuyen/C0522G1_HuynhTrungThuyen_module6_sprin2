package com.example.repository;

import com.example.model.Size;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ISizeRepository extends JpaRepository<Size, Integer> {
}
