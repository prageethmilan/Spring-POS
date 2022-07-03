package lk.ijse.spring.repo;

import lk.ijse.spring.entity.OrderDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * @author : M-Prageeth
 * @created : 25/06/2022 - 9:19 AM
 **/
public interface OrderDetailsRepo extends JpaRepository<OrderDetails, String> {
    @Query(value = "select * from OrderDetails where orderId=:orderId",nativeQuery = true)
    List<OrderDetails> findOrderDetails(@Param("orderId") String orderId);
}
