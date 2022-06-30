package lk.ijse.spring.controller;

import lk.ijse.spring.service.PurchaseOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author : M-Prageeth
 * @created : 25/06/2022 - 9:22 AM
 **/
@RestController
@RequestMapping("api/v1/order")
@CrossOrigin
public class PurchaseOrderController {

    @Autowired
    PurchaseOrderService service;
}
