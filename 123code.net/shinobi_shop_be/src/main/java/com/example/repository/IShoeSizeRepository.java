package com.example.repository;

import com.example.dto.IShoeSizeDto;
import com.example.model.ShoeSize;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface IShoeSizeRepository extends JpaRepository<ShoeSize, Integer> {
    @Query(value = "select shoe_size.id as id, shoe_size.quantity as quantity, size.name as size " +
            "from shoe_size " +
            "join shoe on shoe.id = shoe_size.shoe_id " +
            "join size on size.id = shoe_size.size_id " +
            "where shoe.id = :id and shoe.is_delete = 0 and shoe_size.quantity > 0",
            nativeQuery = true)
    List<IShoeSizeDto> findAllSizeByShoe(@Param("id") Integer id);
}
