package lk.ijse.spring.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lk.ijse.spring.entity.Customer;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDate;
import java.util.List;

/**
 * @author : M-Prageeth
 * @created : 25/06/2022 - 8:26 AM
 **/
@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
public class OrderDTO {
    private String orderId;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate orderDate;
    private Customer customer;
    private double cost;
    private List<OrderDetailsDTO> orderDetails;
}
