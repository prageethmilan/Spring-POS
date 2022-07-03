package lk.ijse.spring.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

/**
 * @author : M-Prageeth
 * @created : 25/06/2022 - 8:26 AM
 **/
@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
public class OrderDetailsDTO {
    private String orderId;
    private String itemCode;
    private String itemName;
    private int qty;
    private double unitPrice;
    private double total;
}
