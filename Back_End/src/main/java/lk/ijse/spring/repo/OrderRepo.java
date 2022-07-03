package lk.ijse.spring.repo;

import lk.ijse.spring.entity.Orders;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

/**
 * @author : M-Prageeth
 * @created : 25/06/2022 - 9:19 AM
 **/
public interface OrderRepo extends JpaRepository<Orders, String> {
    @Query(value = "SELECT orderId FROM Orders ORDER BY orderId DESC LIMIT 1", nativeQuery = true)
    String findLastOrder();
}
