package lk.ijse.spring.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;

/**
 * @author : M-Prageeth
 * @created : 24/06/2022 - 8:48 AM
 **/
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
public class Orders {
    @Id
    private String orderId;
    private LocalDate orderDate;

    @ManyToOne(cascade = {CascadeType.REFRESH, CascadeType.DETACH})
    @JoinColumn(name = "customerId", referencedColumnName = "id", nullable = false)
    private Customer customer;

    private double cost;

    @OneToMany(mappedBy = "orders", cascade = CascadeType.ALL)
    private List<OrderDetails> orderDetails;
}
