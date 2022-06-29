package lk.ijse.spring.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

/**
 * @author : M-Prageeth
 * @created : 24/06/2022 - 9:17 AM
 **/
@AllArgsConstructor
@NoArgsConstructor
@Data
public class OrderItem_PK  implements Serializable {
    private String orderId;
    private String itemCode;
}
