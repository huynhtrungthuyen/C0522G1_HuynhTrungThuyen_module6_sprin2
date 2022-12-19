package com.example.repository;

import com.example.dto.IManufacturerDto;
import com.example.dto.IShoeDto;
import com.example.model.Shoe;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface IShoeRepository extends JpaRepository<Shoe, Integer> {
    @Query(value = "select shoe.id as id, shoe.name as name, shoe.price as price, shoe.discount as discount, " +
            "shoe.image as image, shoe.manufacturer as manufacturer, shoe.describes as describes, " +
            "shoe_type.name as type " +
            "from shoe " +
            "join shoe_size on shoe.id = shoe_size.shoe_id " +
            "join shoe_type on shoe.shoe_type_id = shoe_type.id " +
            "where shoe.is_delete = 0 and shoe.name like %:nameS% and shoe.manufacturer like %:manufacturerS% " +
            "and shoe_type.name like %:typeS% and (shoe.price between :priceStart and :priceEnd) " +
            "group by shoe.id having sum(shoe_size.quantity) > 0",
            countQuery = "select count(*) " +
                    "from shoe " +
                    "join shoe_size on shoe.id = shoe_size.shoe_id " +
                    "join shoe_type on shoe.shoe_type_id = shoe_type.id " +
                    "where shoe.is_delete = 0 and shoe.name like %:nameS% and shoe.manufacturer like %:manufacturerS% " +
                    "and shoe_type.name like %:typeS% and (shoe.price between :priceStart and :priceEnd) " +
                    "group by shoe.id having sum(shoe_size.quantity) > 0",
            nativeQuery = true)
    Page<IShoeDto> showListShoe(@Param("nameS") String nameS,
                                @Param("manufacturerS") String manufacturerS,
                                @Param("typeS") String typeS,
                                @Param("priceStart") Integer priceStart,
                                @Param("priceEnd") Integer priceEnd,
                                Pageable pageable);

    @Query(value = "select manufacturer from shoe group by manufacturer", nativeQuery = true)
    List<String> findAllManufacturer();

    @Query(value = "select shoe.id as id, shoe.name as name, shoe.price as price, shoe.discount as discount, " +
            "shoe.image as image, shoe.manufacturer as manufacturer, shoe.describes as describes, " +
            "shoe_type.name as type, sum(shoe_size.quantity) as sumQuantity " +
            "from shoe " +
            "join shoe_size on shoe.id = shoe_size.shoe_id " +
            "join shoe_type on shoe.shoe_type_id = shoe_type.id " +
            "where shoe.is_delete = 0 and shoe.id = :id " +
            "group by shoe.id having sum(shoe_size.quantity) > 0",
            nativeQuery = true)
    IShoeDto findShoeById(@Param("id") Integer id);

    @Query(value = "select sum(order_detail.quantity) " +
            "from order_detail " +
            "join shoe_size on shoe_size.id = order_detail.shoe_size_id " +
            "join shoe on shoe.id = shoe_size.shoe_id " +
            "where order_detail.is_pay = 1 and shoe.id = :id",
            nativeQuery = true)
    Optional<Integer> getQuantitySellById(@Param("id") Integer id);
}
