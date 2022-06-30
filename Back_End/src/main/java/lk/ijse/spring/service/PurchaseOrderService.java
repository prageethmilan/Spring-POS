package lk.ijse.spring.service;

import lk.ijse.spring.dto.CustomerDTO;
import lk.ijse.spring.dto.OrderDTO;

import java.util.List;

/**
 * @author : M-Prageeth
 * @created : 25/06/2022 - 9:25 AM
 **/
public interface PurchaseOrderService {
    void purchaseOrder(OrderDTO dto);

    void updateOrder(OrderDTO dto);

    void deleteCustomer(String oid);

    OrderDTO searchOrder(String oid);

    List<OrderDTO> getAllCustomers();

    String generateOrderId();
}
