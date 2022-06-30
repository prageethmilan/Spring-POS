package lk.ijse.spring.service.impl;

import lk.ijse.spring.dto.OrderDTO;
import lk.ijse.spring.service.PurchaseOrderService;

import java.util.List;

/**
 * @author : M-Prageeth
 * @created : 25/06/2022 - 9:27 AM
 **/
public class PurchaseOrderServiceImpl implements PurchaseOrderService {



    @Override
    public void purchaseOrder(OrderDTO dto) {

    }

    @Override
    public void updateOrder(OrderDTO dto) {

    }

    @Override
    public void deleteCustomer(String oid) {

    }

    @Override
    public OrderDTO searchOrder(String oid) {
        return null;
    }

    @Override
    public List<OrderDTO> getAllCustomers() {
        return null;
    }

    @Override
    public String generateOrderId() {
        return null;
    }
}
