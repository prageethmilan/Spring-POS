package lk.ijse.spring.controller;

import lk.ijse.spring.dto.OrderDTO;
import lk.ijse.spring.service.PurchaseOrderService;
import lk.ijse.spring.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

/**
 * @author : M-Prageeth
 * @created : 25/06/2022 - 9:22 AM
 **/
@RestController
@RequestMapping("api/v1/order")
@CrossOrigin
public class PurchaseOrderController {

    @Autowired
    PurchaseOrderService poservice;

    @GetMapping(path = "/generateOrderId")
    public ResponseUtil generateOrderId(){
        return new ResponseUtil(200,"OK",poservice.generateOrderId());
    }

    @GetMapping(path = "/customer/{custId}",produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil searchCustomer(@PathVariable String custId){
        return new ResponseUtil(200,"OK",poservice.searchCustomer(custId));
    }

    @GetMapping(path = "/item/{itemCode}",produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil searchItem(@PathVariable String itemCode){
        return new ResponseUtil(200,"OK",poservice.searchItem(itemCode));
    }

    @ResponseStatus(HttpStatus.CREATED) //201
    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil purchaseOrder(@RequestBody OrderDTO orderDTO) {
        System.out.println(orderDTO.toString());
        poservice.purchaseOrder(orderDTO);
        return new ResponseUtil(200, "Save", true);
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil getAllOrders(){
        return new ResponseUtil(200,"OK",poservice.getAllOrders());
    }

    @GetMapping(path = "/loadOrderDetails",produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil getAllOrderDetails(){
        return new ResponseUtil(200,"OK",poservice.getAllOrderDetails());
    }

    @GetMapping(path = "/orderTable/{orderId}",produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil searchOrderByOrderTable(@PathVariable String orderId){
        return new ResponseUtil(200,"OK",poservice.searchOrder(orderId));
    }

    @GetMapping(path = "/orderDetailTable/{orderId}",produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil searchOrderByOrderDetailTable(@PathVariable String orderId){
        System.out.println(orderId);
        return new ResponseUtil(200,"OK",poservice.searchOrderDetails(orderId));
    }
}
