package com.example.repository;

import com.example.dto.IShoeCartDto;
import com.example.model.OrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Transactional
public interface IOrderDetailRepository extends JpaRepository<OrderDetail, Integer> {
    @Query(value = "select * from order_detail " +
            "where is_pay = 0 and customer_id = :customerId and shoe_size_id = :shoeSizeId",
            nativeQuery = true)
    Optional<OrderDetail> getOrderDetailCart(@Param("customerId") Integer customerId, @Param("shoeSizeId") Integer shoeSizeId);

    @Modifying
    @Query(value = "update order_detail set quantity = :quantity " +
            "where is_pay = 0 and customer_id = :customerId and shoe_size_id = :shoeSizeId",
            nativeQuery = true)
    void setQuantityOrderDetailCart(@Param("quantity") Integer quantity,
                                    @Param("customerId") Integer customerId,
                                    @Param("shoeSizeId") Integer shoeSizeId);

    @Modifying
    @Query(value = "insert into order_detail (date_payment, quantity, customer_id, shoe_size_id) " +
            "values (now(), :quantity, :customerId, :shoeSizeId)",
            nativeQuery = true)
    void addOrderDetailCart(@Param("quantity") Integer quantity,
                            @Param("customerId") Integer customerId,
                            @Param("shoeSizeId") Integer shoeSizeId);

    @Query(value = "select order_detail.id as id, shoe.name as name, size.name as size, shoe.price as price, " +
            "shoe.discount as discount, order_detail.quantity as quantity, shoe.image as image " +
            "from order_detail " +
            "join shoe_size on shoe_size.id = order_detail.shoe_size_id " +
            "join shoe on shoe.id = shoe_size.shoe_id " +
            "join size on size.id = shoe_size.size_id " +
            "where order_detail.is_pay = 0 and order_detail.is_delete = 0 and order_detail.quantity > 0 " +
            "and order_detail.customer_id = :id",
            nativeQuery = true)
    List<IShoeCartDto> findCartByUser(@Param("id") Integer id);

    @Modifying
    @Query(value = "DELETE FROM order_detail WHERE id = :id", nativeQuery = true)
    void removeCart(@Param("id") Integer id);

    @Modifying
    @Query(value = "update order_detail set quantity = (quantity + 1) where is_pay = 0 and id = :id",
            nativeQuery = true)
    void ascQuantity(@Param("id") Integer id);

    @Modifying
    @Query(value = "update order_detail set quantity = (quantity - 1) where is_pay = 0 and id = :id",
            nativeQuery = true)
    void descQuantity(@Param("id") Integer id);

    @Query(value = "select sum(quantity) as sumQuantityCart from order_detail where is_pay = 0 and customer_id = :id",
            nativeQuery = true)
    Optional<Integer> sumQuantityCart(@Param("id") Integer id);
}
