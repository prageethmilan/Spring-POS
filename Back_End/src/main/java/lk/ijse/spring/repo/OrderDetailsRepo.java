package lk.ijse.spring.repo;

import lk.ijse.spring.entity.OrderDetails;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author : M-Prageeth
 * @created : 25/06/2022 - 9:19 AM
 **/
public interface OrderDetailsRepo extends JpaRepository<OrderDetails, String> {
}
