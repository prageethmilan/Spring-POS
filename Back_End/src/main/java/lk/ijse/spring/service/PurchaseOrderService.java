package lk.ijse.spring.service;

import lk.ijse.spring.dto.CustomerDTO;
import lk.ijse.spring.dto.ItemDTO;
import lk.ijse.spring.dto.OrderDTO;
import lk.ijse.spring.dto.OrderDetailsDTO;

import java.util.List;

/**
 * @author : M-Prageeth
 * @created : 25/06/2022 - 9:25 AM
 **/
public interface PurchaseOrderService {
    void purchaseOrder(OrderDTO dto);

    void updateOrder(OrderDTO dto);

    void deleteOrder(String oid);

    OrderDTO searchOrder(String oid);

    List<OrderDetailsDTO> searchOrderDetails(String oid);

    List<OrderDTO> getAllOrders();

    List<OrderDetailsDTO> getAllOrderDetails();

    CustomerDTO searchCustomer(String id);

    ItemDTO searchItem(String code);

    String generateOrderId();
}
