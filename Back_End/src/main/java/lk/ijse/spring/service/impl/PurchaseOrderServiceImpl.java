package lk.ijse.spring.service.impl;

import lk.ijse.spring.dto.CustomerDTO;
import lk.ijse.spring.dto.ItemDTO;
import lk.ijse.spring.dto.OrderDTO;
import lk.ijse.spring.dto.OrderDetailsDTO;
import lk.ijse.spring.entity.Item;
import lk.ijse.spring.entity.OrderDetails;
import lk.ijse.spring.entity.Orders;
import lk.ijse.spring.repo.CustomerRepo;
import lk.ijse.spring.repo.ItemRepo;
import lk.ijse.spring.repo.OrderDetailsRepo;
import lk.ijse.spring.repo.OrderRepo;
import lk.ijse.spring.service.PurchaseOrderService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

/**
 * @author : M-Prageeth
 * @created : 25/06/2022 - 9:27 AM
 **/
@Service
@Transactional
public class PurchaseOrderServiceImpl implements PurchaseOrderService {

    @Autowired
    private OrderRepo orderRepo;

    @Autowired
    private OrderDetailsRepo orderDetailsRepo;

    @Autowired
    private ItemRepo itemRepo;

    @Autowired
    private CustomerRepo customerRepo;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public void purchaseOrder(OrderDTO dto) {
        Orders orders = modelMapper.map(dto, Orders.class);
        if (!orderRepo.existsById(dto.getOrderId())) {
            orderRepo.save(orders);

            if (dto.getOrderDetails().size() < 1) throw new RuntimeException("No items added for the order..!");

            //update the item
            for (OrderDetails orderDetail : orders.getOrderDetails()) {
                Item item = itemRepo.findById(orderDetail.getItemCode()).get();
                item.setQtyOnHand(item.getQtyOnHand() - orderDetail.getQty());
                itemRepo.save(item);
            }

        } else {
            throw new RuntimeException("Purchase Order Failed..!, Order ID " + dto.getOrderId() + " Already Exist.!");
        }
    }

    @Override
    public void updateOrder(OrderDTO dto) {

    }

    @Override
    public void deleteOrder(String oid) {

    }

    @Override
    public OrderDTO searchOrder(String oid) {
        if (orderRepo.existsById(oid)) {
            return modelMapper.map(orderRepo.findById(oid).get(), OrderDTO.class);
        } else {
            throw new RuntimeException("No Such Order Found...");
        }
    }

    @Override
    public List<OrderDetailsDTO> searchOrderDetails(String oid) {
        return modelMapper.map(orderDetailsRepo.findOrderDetails(oid), new TypeToken<List<OrderDetailsDTO>>() {
        }.getType());
    }

    @Override
    public List<OrderDTO> getAllOrders() {
        return modelMapper.map(orderRepo.findAll(), new TypeToken<List<OrderDTO>>() {
        }.getType());
    }

    @Override
    public List<OrderDetailsDTO> getAllOrderDetails() {
        return modelMapper.map(orderDetailsRepo.findAll(), new TypeToken<List<OrderDetailsDTO>>() {
        }.getType());
    }

    @Override
    public CustomerDTO searchCustomer(String id) {
        if (customerRepo.existsById(id)) {
            return modelMapper.map(customerRepo.findById(id).get(), CustomerDTO.class);
        } else {
            throw new RuntimeException("No Such Customer Found...");
        }
    }

    @Override
    public ItemDTO searchItem(String code) {
        if (itemRepo.existsById(code)) {
            return modelMapper.map(itemRepo.findById(code).get(), ItemDTO.class);
        } else {
            throw new RuntimeException("No Such Item Found...");
        }
    }

    @Override
    public String generateOrderId() {
        String lastOID = orderRepo.findLastOrder();
        String oId = "";

        if (lastOID != null) {
            int tempOID = Integer.parseInt(lastOID.split("-")[1]);
            tempOID = tempOID + 1;
            if (tempOID <= 9) {
                oId = "O-000" + tempOID;
            } else if (tempOID <= 99) {
                oId = "O-00" + tempOID;
            } else if (tempOID <= 999) {
                oId = "O-0" + tempOID;
            } else if (tempOID <= 9999) {
                oId = "O-" + tempOID;
            }
        } else {
            oId = "O-0001";
        }
        return oId;
    }
}
