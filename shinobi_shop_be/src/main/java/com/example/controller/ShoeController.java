package com.example.controller;

import com.example.dto.IShoeCartDto;
import com.example.dto.IShoeDto;
import com.example.dto.IShoeSizeDto;
import com.example.model.Customer;
import com.example.model.Employee;
import com.example.model.OrderDetail;
import com.example.model.ShoeType;
import com.example.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/shoe")
@CrossOrigin("*")
public class ShoeController {
    @Autowired
    private IShoeService iShoeService;

    @Autowired
    private IShoeTypeService iShoeTypeService;

    @Autowired
    private IShoeSizeService iShoeSizeService;

    @Autowired
    private ICustomerService iCustomerService;

    @Autowired
    private IEmployeeService iEmployeeService;

    @Autowired
    private IOrderDetailService iOrderDetailService;

    @GetMapping("/list-newest/{nameS}&{manufacturerS}&{typeS}&{priceStart}&{priceEnd}")
    public ResponseEntity<Page<IShoeDto>> showListShoeNewest(@PageableDefault(value = 6,
            sort = "id", direction = Sort.Direction.DESC) Pageable pageable,
                                                             @PathVariable("nameS") String nameS,
                                                             @PathVariable("manufacturerS") String manufacturerS,
                                                             @PathVariable("typeS") String typeS,
                                                             @PathVariable("priceStart") Integer priceStart,
                                                             @PathVariable("priceEnd") Integer priceEnd) {
        Page<IShoeDto> shoeList = iShoeService.showListShoe(nameS, manufacturerS, typeS, priceStart, priceEnd, pageable);
        return new ResponseEntity<>(shoeList, HttpStatus.OK);
    }

    @GetMapping("/list-price-desc/{nameS}&{manufacturerS}&{typeS}&{priceStart}&{priceEnd}")
    public ResponseEntity<Page<IShoeDto>> showListShoePriceDesc(@PageableDefault(value = 6,
            sort = "price", direction = Sort.Direction.DESC) Pageable pageable,
                                                                @PathVariable("nameS") String nameS,
                                                                @PathVariable("manufacturerS") String manufacturerS,
                                                                @PathVariable("typeS") String typeS,
                                                                @PathVariable("priceStart") Integer priceStart,
                                                                @PathVariable("priceEnd") Integer priceEnd) {
        Page<IShoeDto> shoeList = iShoeService.showListShoe(nameS, manufacturerS, typeS, priceStart, priceEnd, pageable);
        return new ResponseEntity<>(shoeList, HttpStatus.OK);
    }

    @GetMapping("/list-price-asc/{nameS}&{manufacturerS}&{typeS}&{priceStart}&{priceEnd}")
    public ResponseEntity<Page<IShoeDto>> showListShoePriceAsc(@PageableDefault(value = 6,
            sort = "price", direction = Sort.Direction.ASC) Pageable pageable,
                                                               @PathVariable("nameS") String nameS,
                                                               @PathVariable("manufacturerS") String manufacturerS,
                                                               @PathVariable("typeS") String typeS,
                                                               @PathVariable("priceStart") Integer priceStart,
                                                               @PathVariable("priceEnd") Integer priceEnd) {
        Page<IShoeDto> shoeList = iShoeService.showListShoe(nameS, manufacturerS, typeS, priceStart, priceEnd, pageable);
        return new ResponseEntity<>(shoeList, HttpStatus.OK);
    }

    @GetMapping("/list-sale/{nameS}&{manufacturerS}&{typeS}&{priceStart}&{priceEnd}")
    public ResponseEntity<Page<IShoeDto>> showListShoeSale(@PageableDefault(value = 6,
            sort = "discount", direction = Sort.Direction.DESC) Pageable pageable,
                                                           @PathVariable("nameS") String nameS,
                                                           @PathVariable("manufacturerS") String manufacturerS,
                                                           @PathVariable("typeS") String typeS,
                                                           @PathVariable("priceStart") Integer priceStart,
                                                           @PathVariable("priceEnd") Integer priceEnd) {
        Page<IShoeDto> shoeList = iShoeService.showListShoe(nameS, manufacturerS, typeS, priceStart, priceEnd, pageable);
        return new ResponseEntity<>(shoeList, HttpStatus.OK);
    }

    @GetMapping("/type-list")
    public ResponseEntity<List<ShoeType>> getAllShoeType() {
        List<ShoeType> shoeTypeList = iShoeTypeService.findAll();
        if (shoeTypeList.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(shoeTypeList, HttpStatus.OK);
    }

    @GetMapping("/manufacturer-list")
    public ResponseEntity<List<String>> getAllManufacturer() {
        List<String> manufacturerList = iShoeService.findAllManufacturer();
        if (manufacturerList.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(manufacturerList, HttpStatus.OK);
    }

    @GetMapping("/detail/{id}")
    public ResponseEntity<IShoeDto> getShoeDetail(@PathVariable("id") Integer id) {
        IShoeDto shoe = iShoeService.findById(id);
        return new ResponseEntity<>(shoe, HttpStatus.OK);
    }

    @GetMapping("/shoes-size/{id}")
    public ResponseEntity<List<IShoeSizeDto>> showListShoeSize(@PathVariable("id") Integer id) {
        List<IShoeSizeDto> shoeSizeList = iShoeSizeService.findAllSizeByShoe(id);
        return new ResponseEntity<>(shoeSizeList, HttpStatus.OK);
    }

    @GetMapping("/get-customer")
    public ResponseEntity<Customer> getCustomerByUsername(HttpServletRequest request) {
//        String headerAuth = request.getHeader("Authorization");
//        String username = jwtTokenUtil.getUsernameFromJwtToken(headerAuth.substring(7));

        Customer customer = iCustomerService.findCustomerByUsername("adelucef");
        return new ResponseEntity<>(customer, HttpStatus.OK);
    }

    @GetMapping("/get-employee")
    public ResponseEntity<Employee> getEmployeeByUsername(HttpServletRequest request) {
//        String headerAuth = request.getHeader("Authorization");
//        String username = jwtTokenUtil.getUsernameFromJwtToken(headerAuth.substring(7));

        Employee employee = iEmployeeService.findEmployeeByUsername("adelucef");
        return new ResponseEntity<>(employee, HttpStatus.OK);
    }

    @GetMapping("/add-cart/{quantity}&{customerId}&{shoeSizeId}")
    public ResponseEntity<OrderDetail> addToCart(@PathVariable("quantity") Integer quantity,
                                                 @PathVariable("customerId") Integer customerId,
                                                 @PathVariable("shoeSizeId") Integer shoeSizeId) {
        iOrderDetailService.addProductCart(quantity, customerId, shoeSizeId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/quantity-sell/{id}")
    public ResponseEntity<Integer> getQuantitySellByShoe(@PathVariable("id") Integer id) {
        Optional<Integer> quantitySell = iShoeService.getQuantitySellById(id);

        return quantitySell.map(integer -> new ResponseEntity<>(integer, HttpStatus.OK)).orElseGet(()
                -> new ResponseEntity<>(0, HttpStatus.OK));
    }

    @GetMapping("/cart/{id}")
    public ResponseEntity<List<IShoeCartDto>> showCartByUser(@PathVariable("id") Integer id) {
        List<IShoeCartDto> cart = iOrderDetailService.findCartByUser(id);
        return new ResponseEntity<>(cart, HttpStatus.OK);
    }

    @GetMapping("/remove-cart/{id}")
    public ResponseEntity<OrderDetail> removeCart(@PathVariable("id") Integer id) {
        iOrderDetailService.removeCart(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/asc-quantity/{id}")
    public ResponseEntity<OrderDetail> ascQuantity(@PathVariable("id") Integer id) {
        iOrderDetailService.ascQuantity(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/desc-quantity/{id}")
    public ResponseEntity<OrderDetail> descQuantity(@PathVariable("id") Integer id) {
        iOrderDetailService.descQuantity(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/quantity-cart/{id}")
    public ResponseEntity<Integer> sumQuantityCart(@PathVariable("id") Integer id) {
        Optional<Integer> quantityCart = iOrderDetailService.sumQuantityCart(id);

        return quantityCart.map(integer -> new ResponseEntity<>(integer, HttpStatus.OK)).orElseGet(()
                -> new ResponseEntity<>(0, HttpStatus.OK));
    }
}
