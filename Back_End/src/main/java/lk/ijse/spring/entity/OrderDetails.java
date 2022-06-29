package lk.ijse.spring.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

/**
 * @author : M-Prageeth
 * @created : 24/06/2022 - 8:49 AM
 **/
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
@IdClass(OrderItem_PK.class)
public class OrderDetails {
    @Id
    private String orderId;
    @Id
    private String itemCode;
    @Column(columnDefinition = "TEXT")
    private String itemName;
    private int qty;
    private double unitPrice;
    private double total;

    @ManyToOne
    @JoinColumn(name = "orderId",referencedColumnName = "orderId",insertable = false,updatable = false)
    private Orders orders;

    @ManyToOne
    @JoinColumn(name = "itemCode",referencedColumnName = "code",insertable = false,updatable = false)
    private Item items;
}
