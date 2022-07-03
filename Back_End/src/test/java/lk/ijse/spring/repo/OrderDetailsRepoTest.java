package lk.ijse.spring.repo;

import lk.ijse.spring.config.JPAConfig;
import lk.ijse.spring.entity.OrderDetails;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.context.web.WebAppConfiguration;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

/**
 * @author : M-Prageeth
 * @created : 03/07/2022 - 11:35 AM
 **/
@WebAppConfiguration // State test configuration class
@ContextConfiguration(classes = {JPAConfig.class}) // import configurations for Test Context
@ExtendWith(SpringExtension.class)
class OrderDetailsRepoTest {

    @Autowired
    OrderDetailsRepo repo;

    @Test
    public void testTwo(){
        List<OrderDetails> orderDetailsByOrderId = repo.findOrderDetails("O-0001");
        for (OrderDetails orderDetails : orderDetailsByOrderId) {
            System.out.println(orderDetails.getOrderId()+" "+orderDetails.getItemCode());
        }
    }

}