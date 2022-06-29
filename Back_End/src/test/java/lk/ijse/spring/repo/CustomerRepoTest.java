package lk.ijse.spring.repo;

import lk.ijse.spring.config.JPAConfig;
import lk.ijse.spring.entity.Customer;
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
 * @created : 26/06/2022 - 1:09 PM
 **/

@WebAppConfiguration // State test configuration class
@ContextConfiguration(classes = {JPAConfig.class}) // import configurations for Test Context
@ExtendWith(SpringExtension.class)
class CustomerRepoTest {

    @Autowired
    CustomerRepo customerRepo;

    @Test
    public void testOne(){
        String customer = customerRepo.findLastCustomer();
        System.out.println(customer);
    }

}