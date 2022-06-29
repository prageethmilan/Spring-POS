package lk.ijse.spring.service;

import lk.ijse.spring.dto.CustomerDTO;

import java.util.List;

/**
 * @author : M-Prageeth
 * @created : 25/06/2022 - 9:25 AM
 **/
public interface CustomerService {
    void saveCustomer(CustomerDTO dto);

    void updateCustomer(CustomerDTO dto);

    void deleteCustomer(String id);

    CustomerDTO searchCustomer(String id);

    List<CustomerDTO> getAllCustomers();

    String generateCustomerId();
}
